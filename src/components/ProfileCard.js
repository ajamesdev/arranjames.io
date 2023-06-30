import React, { useState } from "react";
import GitHubActivity from "./GitHubActivity";
import DownloadIcon from "./icons/DownloadIcon";

const handleCVDownloadClick = () => {
  window.gtag("event", "download_cv", {
    event_category: "engagement",
    event_label: "CV Download Button",
  });

  const fileUrl =
    process.env.PUBLIC_URL + "Arran_James_FullStackWebDeveloper_CV.pdf";
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = "Arran_James_FullStackWebDeveloper_CV.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const ProfileCard = ({ isSimpleView }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="shadow rounded-xl overflow-hidden">
      <div className="bg-cover">
        {isLoading && (
          <div style={{ textAlign: "center" }}>
            <i
              className="bx p-6 bx-loader-circle"
              style={{ fontSize: "30px", animation: "spin 2s linear infinite" }}
            ></i>
          </div>
        )}
        <GitHubActivity
          labelsVisible={false}
          onDataLoad={() => setIsLoading(false)}
        />
      </div>

      <div className="pt-14 p-7 block-section-profile relative">
        <img
          src={process.env.PUBLIC_URL + "/img/avatar.jpg"}
          alt="Avatar"
          className="me-photo"
        />

        <div className="text-lg font-semibold mb-1.2">Arran James</div>
        <div className="text-md font-semibold mb-1.5">B.Sc. (Hons)</div>
        <div className="text-sm text-gray-400">Full Stack Web Developer</div>
        {!isSimpleView && (
          <div onClick={handleCVDownloadClick} className="flex mt-7 group">
            <button className="download-cv-btn">Download CV</button>
            <button className="download-cv-btn-icon">
              <DownloadIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
