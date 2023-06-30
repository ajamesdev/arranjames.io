import React from "react";

const AboutMe = ({ isSimpleView }) => {
  return (
    <div className="p-7 block-section">
      <h2 className="block-title">About me</h2>
      <p className="text-gray-600 mb-2">
        Based in Reading, I am a Full Stack Web Developer with six years of
        experience since earning a 2:1 honours degree from the University of
        Brighton. My expertise encompasses both server-side and client-side
        development, with a particular focus on PHP for server-side logic.
      </p>
      <p className="text-gray-600 mb-5">
        I am enthusiastic about contributing to an innovative environment, and
        my diverse skill set renders me an ideal fit for roles that necessitate
        a fine balance of technical expertise.
      </p>

      <div className="flex flex-col space-y-1">
        <a
          href="mailto:hello@arranjames.io"
          className="link-out social-link-out-hover"
        >
          <i className="bx bx-at text-xl"></i>
          <span>hello@arranjames.io</span>
        </a>
        <a
          href="https://www.arranjames.io"
          target="_blank"
          className="link-out mt-0 social-link-out-hover"
        >
          <i className="bx bx-planet text-xl"></i>
          <span>arranjames.io</span>
        </a>
      </div>
      {!isSimpleView && (
        <div className="mt-4">
          <ul className="flex space-x-5">
            <li>
              <a
                href="https://www.linkedin.com/in/arran-h-3768b6280"
                target="_blank"
                className="social-link-out-hover"
              >
                <i className="bx bxl-linkedin text-2xl"></i>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/ajamesdev"
                target="_blank"
                className="social-link-out-hover"
              >
                <i className="bx bxl-github text-2xl"></i>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AboutMe;
