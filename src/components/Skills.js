import React from "react";

const Skills = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
      <div className="p-7 block-section flow-root">
        <h2 className="block-title">Client Technologies</h2>
        <div className="-m-2 flex flex-wrap">
          <span className="skill-tag">JavaScript</span>
          <span className="skill-tag">TypeScript</span>
          <span className="skill-tag">React</span>
          <span className="skill-tag">React Native</span>
          <span className="skill-tag">Redux</span>
          <span className="skill-tag">Webpack</span>
          <span className="skill-tag">Expo</span>
          <span className="skill-tag">HTML5</span>
          <span className="skill-tag">CSS3</span>
          <span className="skill-tag">Bootstrap</span>
          <span className="skill-tag">Tailwind</span>
        </div>
      </div>
      <div className="p-7 block-section flow-root">
        <h2 className="block-title">Server Technologies</h2>
        <div className="-m-2 flex flex-wrap">
          <span className="skill-tag">PHP</span>
          <span className="skill-tag">Laravel</span>
          <span className="skill-tag">Node.js</span>
          <span className="skill-tag">SQL</span>
          <span className="skill-tag">Express</span>
          <span className="skill-tag">Remix</span>
          <span className="skill-tag">MongoDB</span>
        </div>
      </div>
      <div className="p-7 block-section flow-root">
        <h2 className="block-title">Amazon Web Services</h2>
        <div className="-m-2 flex flex-wrap">
          <span className="skill-tag">EC2</span>
          <span className="skill-tag">Elastic Beanstalk</span>
          <span className="skill-tag">RDS</span>
          <span className="skill-tag">OpenSearch</span>
          <span className="skill-tag">Location</span>
          <span className="skill-tag">S3</span>
          <span className="skill-tag">Database Migration Manager</span>
          <span className="skill-tag">Lambda</span>
          <span className="skill-tag">Redshift</span>
          <span className="skill-tag">CloudFront</span>
          <span className="skill-tag">CodePipeline</span>
          <span className="skill-tag">CloudWatch</span>
        </div>
      </div>
      <div className="p-7 block-section flow-root">
        <h2 className="block-title">Tools & Administration</h2>
        <div className="-m-2 flex flex-wrap">
          <span className="skill-tag">Git</span>
          <span className="skill-tag">Docker</span>
          <span className="skill-tag">Wordpress</span>
          <span className="skill-tag">Red Hat</span>
          <span className="skill-tag">Debian</span>
          <span className="skill-tag">Photoshop</span>
        </div>
      </div>
    </div>
  );
};

export default Skills;
