import React from "react";

const currentYear = new Date().getFullYear();
const startYear = 2015;
const yearsExperience = currentYear - startYear - 2;

const QuickInfo = () => {
  return (
    <div className="p-7 block-section">
      <h2 className="block-title">Information</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="text-gray-400">Location</div>
          <div className="font-medium text-right text-gray-600">
            Reading, Berkshire, UK
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-400">Experience</div>
          <div className="font-medium text-right text-gray-600">
            {yearsExperience}+ years
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickInfo;
