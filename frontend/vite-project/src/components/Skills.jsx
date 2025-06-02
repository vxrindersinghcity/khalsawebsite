import React from "react";

const skills = ["Network Security", "Penetration Testing", "Ethical Hacking", "Cryptography", "Incident Response"];

const Skills = () => {
  return (
    <section id="skills" className="p-10 bg-gray-100">
      <h2 className="text-2xl font-bold">Skills</h2>
      <ul className="mt-4 space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="p-2 bg-gray-200 rounded">{skill}</li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;