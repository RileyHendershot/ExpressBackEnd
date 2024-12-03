import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectFormPage = ({ existingProject, onSubmit }) => {
  const [title, setTitle] = useState(existingProject?.title || "");
  const [description, setDescription] = useState(existingProject?.description || "");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const projectData = { title, description };

    try {
      await onSubmit(projectData); // Submit the project data
      navigate("/projects"); // Redirect to the project list after successful submission
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  return (
    <div>
      <h2>{existingProject ? "Edit Project" : "Add Project"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">{existingProject ? "Update Project" : "Add Project"}</button>
      </form>
    </div>
  );
};

export default ProjectFormPage;
