import React from "react";
import EducationIcon from "./icons/EducationIcon";

const Education = () => {
  return (
    <div className="p-7 block-section">
      <h2 className="block-title">Education</h2>

      <div className="mb-5 item-section">
        <div className="company-block-logo">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-xl bg-cover"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/img/uob.jpg)`,
            }}
          />
        </div>

        <div className="w-full space-y-5">
          <div className="block-header items-end">
            <div className="space-y-1.5">
              <div className="font-medium">BSc Digital Media Development</div>
              <div className="flex space-x-5">
                <div className="block-header-info">
                  <EducationIcon />
                  <span>University of Brighton</span>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="font-medium">2:1 Honours</div>
              <div className="block-header-info justify-start sm:justify-end">
                <span>2013 – 2017</span>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200"></div>
        </div>
      </div>

      <div className="item-section">
        <div className="company-block-logo">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-xl bg-cover"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/img/hc.jpg)`,
            }}
          />
        </div>

        <div className="w-full space-y-5">
          <div className="block-header items-end">
            <div className="space-y-1.5">
              <div className="font-medium">
                BTEC Level 3 Extended Diploma for IT
              </div>
              <div className="flex space-x-5">
                <div className="block-header-info">
                  <EducationIcon />
                  <span>The Henley College</span>
                </div>
              </div>
            </div>
            <div className="space-y-1.5 sm:text-right">
              <div className="font-medium">D* D* D</div>
              <div className="block-header-info">
                <span>2011 – 2013</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
