const projects = [
      { id: 1, title: 'Project One', description: 'Description for Project One' },
      { id: 2, title: 'Project Two', description: 'Description for Project Two' },
      { id: 3, title: 'Project Three', description: 'Description for Project Three' },
  ];
  
  exports.getProjects = (req, res) => {
      res.json(projects);
  };
  