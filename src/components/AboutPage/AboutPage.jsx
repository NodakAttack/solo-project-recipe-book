import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="container">
      <h2>Technologies Used</h2>
      <ul className="tech-list">
        <p>Node.js</p>
        <p>React w/ Hooks, Redux, Sagas</p>
        <p>Passport w/ Local Authentication</p>
        <p>PostgreSQL</p>
        <p>Postico</p>
        <p>Material UI</p>
        <p>Heroku</p>
      </ul>
      <div className="tech-icons">
        <img src="node-js.svg" alt="Node.js" width="80" height="80" />
        <img src="react-logo.svg" alt="React" width="80" height="80" />
        <img src="passport-icon.png" alt="Passport" width="80" height="80" />
        <img src="postgre.png" alt="PostgreSQL" width="80" height="80" />
        <img src="postico.png" alt="PostgreSQL" width="80" height="80" />
        <img src="materialUI.png" alt="Material UI" width="80" height="80" />
        <img src="heroku-icon.png" alt="Heroku" width="80" height="80" />
      </div>
    </div>
  );
}

export default AboutPage;
