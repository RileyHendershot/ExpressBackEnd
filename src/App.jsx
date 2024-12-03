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
  const [currentProject, setCurrentProject] = useState(null); // Track the project being edited

  const handleEditProject = (project) => {
    setCurrentProject(project);
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
          element={
            <ProjectList
              onEdit={handleEditProject} // Handle setting the current project for editing
            />
          }
        />
        <Route
          path="/projects/form"
          element={
            <ProjectFormPage
              onSubmit={(project) => {
                return fetch("http://localhost:5000/api/projects", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(project),
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                  })
                  .then(() => {
                    // Redirect to project list after successful addition
                    window.location.href = "/projects";
                  })
                  .catch((error) => console.error("Error adding project:", error));
              }}
            />
          }
        />
        <Route
          path="/projects/form/:id"
          element={
            <ProjectFormPage
              existingProject={currentProject}
              onSubmit={(updatedProject) => {
                return fetch(`http://localhost:5000/api/projects/${currentProject.id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updatedProject),
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                  })
                  .then(() => {
                    // Redirect to project list after successful update
                    window.location.href = "/projects";
                  })
                  .catch((error) => console.error("Error updating project:", error));
              }}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
