import "./App.css";
import "boxicons/css/boxicons.min.css";

import React, { useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard";
import QuickInfo from "./components/QuickInfo";
import Skills from "./components/Skills";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Footer from "./components/Footer";

const App = () => {
  const isSimpleView = window.location.pathname.endsWith("/simple");

  const defaultTheme = isSimpleView
    ? "light"
    : localStorage.getItem("theme") || "dark";
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", "G-6CP53TYL00");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      className={`bg-gray-100 antialiased ${
        theme === "dark" ? "dark-background" : ""
      }`}
    >
      <main
        className={`${
          isSimpleView ? "p-4 max-w-screen-2xl mx-auto" : "main-container"
        }`}
      >
        {!isSimpleView && (
          <button
            className={`theme-toggler fixed top-4 right-4 z-50 w-10 h-10 p-2 rounded-full focus:outline-none transition flex items-center justify-center ${
              theme === "dark" ? "bg-white text-black" : "bg-black text-white"
            }`}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <i className="bx bx-moon" style={{ fontSize: "2em" }}></i>
            ) : (
              <i className="bx bx-sun" style={{ fontSize: "2em" }}></i>
            )}
          </button>
        )}

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="space-y-5">
            <ProfileCard isSimpleView={isSimpleView} />
            <div className="hidden lg:block">
              <div className="space-y-5">
                <QuickInfo />
                <Skills />
              </div>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-2">
            <AboutMe isSimpleView={isSimpleView} />
            <Education />
            <Experience />
            <div className="lg:hidden">
              <div className="space-y-5">
                <Skills />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default App;
