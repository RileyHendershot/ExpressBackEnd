// src/components/ProjectList.jsx

import React from "react";
import { Link } from "react-router-dom";

const ProjectList = ({ projects, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Your Projects</h2>
      <Link to="/projects/form">
        <button>Add Project</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>
                <Link to={`/projects/form/${project.id}`}>
                  <button onClick={() => onEdit(project)}>Edit</button>
                </Link>
                <button onClick={() => onDelete(project.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
