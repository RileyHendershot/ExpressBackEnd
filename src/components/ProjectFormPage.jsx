// src/components/ProjectFormPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectFormPage = ({ existingProject, onSubmit }) => {
  const navigate = useNavigate(); // Hook for navigation
  const [project, setProject] = useState({ title: "", description: "" });

  useEffect(() => {
    if (existingProject) {
      setProject(existingProject);
    }
  }, [existingProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(project); // Call the onSubmit prop to handle submission
    navigate("/projects"); // Navigate back to the projects list after submission
  };

  const handleCancel = () => {
    navigate("/projects"); // Navigate back to the projects list when canceling
  };

  return (
    <div>
      <h2>{existingProject ? "Edit Project" : "Add Project"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProjectFormPage;
