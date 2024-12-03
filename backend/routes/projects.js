const express = require('express');
const router = express.Router();

const projects = [
    { id: 1, title: 'Project One', description: 'Description for Project One' },
    { id: 2, title: 'Project Two', description: 'Description for Project Two' },
    { id: 3, title: 'Project Three', description: 'Description for Project Three' },
];

// GET all projects
router.get('/', (req, res) => {
    res.json(projects);
});

// POST a new project
router.post('/', (req, res) => {
    const newProject = {
        id: projects.length + 1, // Assign a new ID
        ...req.body,            // Add title and description from request body
    };
    projects.push(newProject);  // Add the new project to the array
    res.status(201).json(newProject); // Return the newly created project
});

router.delete('/:id', (req, res) => {
      const { id } = req.params;
      const projectIndex = projects.findIndex((project) => project.id === parseInt(id));
  
      if (projectIndex !== -1) {
          projects.splice(projectIndex, 1); // Remove the project from the array
          res.status(200).json({ message: "Project deleted successfully" });
      } else {
          res.status(404).json({ error: "Project not found" });
      }
  });

  router.put('/:id', (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;
  
      const project = projects.find((project) => project.id === parseInt(id));
  
      if (project) {
          project.title = title;
          project.description = description;
          res.status(200).json(project);
      } else {
          res.status(404).json({ error: "Project not found" });
      }
  });
  
  

module.exports = router;
