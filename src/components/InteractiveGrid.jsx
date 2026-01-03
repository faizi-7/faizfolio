import { useEffect, useRef, useCallback, useState } from 'react';
import styles from './InteractiveGrid.module.css';

const InteractiveGrid = () => {
    const gridRef = useRef(null);
    const spotlightRef = useRef(null);
    const rafRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const [squares, setSquares] = useState([]);

    useEffect(() => {
        const generateSquares = () => {
            const newSquares = [];
            const isMobile = window.innerWidth <= 768;
            const gridSize = isMobile ? 40 : 60;
            const cols = Math.ceil(window.innerWidth / gridSize);
            const rows = Math.ceil(window.innerHeight / gridSize);

            // Favor one side randomly
            const biasSide = Math.random() > 0.5 ? 'left' : 'right';

            // Fewer seeds, but with clusters
            const numClusters = 8;
            let squareId = 0;

            for (let i = 0; i < numClusters; i++) {
                // Determine starting column based on bias
                let startCol;
                if (biasSide === 'left') {
                    // 70% chance to be in the left 30% of screen
                    if (Math.random() < 0.7) {
                        startCol = Math.floor(Math.random() * (cols * 0.3));
                    } else {
                        startCol = Math.floor(Math.random() * cols);
                    }
                } else {
                    // 70% chance to be in the right 30% of screen
                    if (Math.random() < 0.7) {
                        startCol = Math.floor(cols * 0.7 + Math.random() * (cols * 0.3));
                    } else {
                        startCol = Math.floor(Math.random() * cols);
                    }
                }

                const startRow = Math.floor(Math.random() * rows);

                // Add seed square
                newSquares.push({
                    id: squareId++,
                    col: startCol,
                    row: startRow,
                    delay: Math.random() * 5 + 's'
                });

                // Form a cluster? (High probability)
                // Try to add 1-2 neighbors
                const clusterSize = Math.floor(Math.random() * 3) + 1; // 1 to 3 additional squares

                for (let j = 0; j < clusterSize; j++) {
                    if (Math.random() > 0.2) { // 80% chance to extend cluster
                        const direction = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
                        let dCol = 0, dRow = 0;
                        if (direction === 0) dRow = -1;
                        else if (direction === 1) dCol = 1;
                        else if (direction === 2) dRow = 1;
                        else if (direction === 3) dCol = -1;

                        const nCol = startCol + dCol;
                        const nRow = startRow + dRow;

                        // Bounds check
                        if (nCol >= 0 && nCol < cols && nRow >= 0 && nRow < rows) {
                            newSquares.push({
                                id: squareId++,
                                col: nCol,
                                row: nRow,
                                delay: Math.random() * 5 + 's'
                            });
                        }
                    }
                }
            }
            setSquares(newSquares);
        };

        generateSquares();

        const handleResize = () => {
            generateSquares();
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseMove = useCallback((e) => {
        mousePos.current = { x: e.clientX, y: e.clientY };

        if (rafRef.current) return;

        rafRef.current = requestAnimationFrame(() => {
            if (spotlightRef.current) {
                spotlightRef.current.style.setProperty('--mouse-x', `${mousePos.current.x}px`);
                spotlightRef.current.style.setProperty('--mouse-y', `${mousePos.current.y}px`);
            }
            rafRef.current = null;
        });
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [handleMouseMove]);

    return (
        <div className={styles.gridContainer} ref={gridRef}>
            {/* Base grid pattern */}
            <div className={styles.gridPattern} />

            {/* Filled squares */}
            <div className={styles.gridPattern} style={{ backgroundImage: 'none', maskImage: 'none', WebkitMaskImage: 'none', opacity: 1 }}>
                {squares.map((square) => (
                    <div
                        key={square.id}
                        className={styles.filledSquare}
                        style={{
                            left: `${square.col * (window.innerWidth <= 768 ? 40 : 60)}px`,
                            top: `${square.row * (window.innerWidth <= 768 ? 40 : 60)}px`,
                            animationDelay: square.delay
                        }}
                    />
                ))}
            </div>

            {/* Interactive spotlight that follows cursor */}
            <div className={styles.spotlight} ref={spotlightRef} />

            {/* Gradient overlay for smooth fade */}
            <div className={styles.gradientOverlay} />
        </div>
    );
};

export default InteractiveGrid;
