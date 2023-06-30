import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto pt-5">
      <div className="container mx-auto text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          &copy; {new Date().getFullYear()} Arran James. Developed using
          React & Tailwind.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
