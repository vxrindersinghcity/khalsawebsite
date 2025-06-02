import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="p-10 bg-gray-100">
      <h2 className="text-2xl font-bold">Contact Me</h2>
      <p className="mt-4">Feel free to reach out via LinkedIn, GitHub, or Email.</p>
      <div className="mt-4 space-y-2">
        <a href="https://www.linkedin.com/in/varinder-singh-uk13/" className="text-blue-500">LinkedIn</a><br />
        <a href="https://github.com/vxrindersinghcity" className="text-blue-500">GitHub</a><br />
        <a href="mailto:vxrindersingh@gmail.com" className="text-blue-500">Email</a>
      </div>
    </section>
  );
};

export default Contact;