// src/App.jsx

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Footer from "./components/Footer";
import ProjectFormPage from "./components/ProjectFormPage";
import ProjectList from "./components/ProjectList";

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>A rudimentary projects page...</p>
  </div>
);

const About = () => (
  <div>
    <h2>About Page</h2>
    <p>Nothing to see here folks.</p>
  </div>
);

const App = () => {
  // Initializing the projects state with two sample projects
  const [projects, setProjects] = useState([
    { id: 1, title: "Project 1", description: "This is the description for the first project" },
    { id: 2, title: "Project 2", description: "This is the description for the second project" },
  ]);
  
  const [currentProject, setCurrentProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddProject = (project) => {
    const newProject = {
      id: projects.length + 1,
      ...project,
    };
    setProjects([...projects, newProject]);
  };

  const handleEditProject = (project) => {
    setCurrentProject(project);
    setIsEditing(true);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects((prev) =>
      prev.map((proj) =>
        proj.id === currentProject.id ? { ...proj, ...updatedProject } : proj
      )
    );
    resetForm();
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const resetForm = () => {
    setCurrentProject(null);
    setIsEditing(false);
  };

  return (
    <Router>
      <h1>My Projects</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/projects">Your Projects</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route 
          path="/projects" 
          element={<ProjectList projects={projects} onEdit={handleEditProject} onDelete={handleDeleteProject} />} 
        />
        <Route 
          path="/projects/form" 
          element={<ProjectFormPage onSubmit={handleAddProject} />} 
        />
        <Route 
          path="/projects/form/:id" 
          element={<ProjectFormPage existingProject={currentProject} onSubmit={handleUpdateProject} />} 
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
