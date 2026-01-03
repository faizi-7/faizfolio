export const getSectionStatus = (sectionName, data = []) => {
  const isEmpty = !data || data.length === 0;
  
  const sectionConfigs = {
    writings: {
      title: "Writings Coming Soon",
      message: "I'm currently working on some exciting articles about design, development, and creative processes. Check back soon!",
      iconType: "writing"
    },
    videos: {
      title: "Videos Coming Soon", 
      message: "I'm working on creating video content covering development tutorials, design processes, and creative explorations. Stay tuned!",
      iconType: "video"
    },
    art: {
      title: "Art Gallery Coming Soon",
      message: "I'm curating a collection of visual works including digital art, photography, and design explorations. The gallery will open soon!",
      iconType: "art"
    },
    books: {
      title: "Book Collection Coming Soon",
      message: "I'm building a curated collection of books that inspire my work in design, development, and creativity. Check back for recommendations and reviews!",
      iconType: "book"
    },
    projects: {
      title: "Projects Coming Soon",
      message: "I'm preparing to showcase some exciting projects I've been working on. From web applications to creative experiments, there's more to come!",
      iconType: "project"
    },
    experience: {
      title: "Experience Details Coming Soon",
      message: "I'm updating this section with detailed information about my professional journey and career highlights.",
      iconType: "experience"
    }
  };

  return {
    isEmpty,
    config: sectionConfigs[sectionName] || {
      title: "Coming Soon",
      message: "This section is under construction. Check back soon for exciting updates!",
      iconType: "construction"
    }
  };
};

export const withComingSoon = (Component) => {
  return function WrappedComponent(props) {
    const { sectionName, data, ...otherProps } = props;
    const { isEmpty, config } = getSectionStatus(sectionName, data);
    
    if (isEmpty) {
      return <ComingSoon {...config} />;
    }
    
    return <Component {...otherProps} data={data} />;
  };
};
