import React from "react";

const projects = [
  { title: "Penetration Testing Toolkit", description: "A collection of scripts for network penetration testing." },
  { title: "Secure Web App", description: "A web application designed with best cybersecurity practices." },
  { title: "Cryptography Analyzer", description: "An encryption and decryption tool using modern algorithms." }
];

const Projects = () => {
  return (
    <section id="projects" className="p-10">
      <h2 className="text-2xl font-bold">Projects</h2>
      <div className="mt-4 space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="p-4 bg-gray-200 rounded">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="mt-2">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;