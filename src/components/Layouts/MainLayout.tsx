/* eslint-disable react-hooks/exhaustive-deps */
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "./Nav";

export default function MainLayout() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      console.log("Scrolling...");
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  const closeSidebar = () => {
    if (sidebarIsOpen) setSidebarIsOpen(false);
  };

  const opaqueBg =
    "max-[768px]:bg-gray-100 max-[768px]:opacity-50 transition-opacity duration-300 ease-in delay-300";

  return (
    <div className="w-12/12 overflow-hidden">
      <section className="flex justify-between m-auto h-screen">
        <>
          <SideBar handleClick={toggleSidebar} isOpen={sidebarIsOpen} />
        </>

        <div
          id="NavWithContent"
          onClick={closeSidebar}
          className={`w-[100%] overflow-y-auto ${sidebarIsOpen ? opaqueBg : ""}`}
        >
          {/* navBar - w-[90%] min-[2000px]:w-[1440px] m-auto `*/}
          <div id="navwithcontent" className="h-full">
            <div className="bg-[#fff]  py-5 shadow-sm">
              <div
                className="responsive-layout"
                id={`navBar ${isScrolled ? "bg-blue-500" : "bg-transparent"}`}
              >
                <Nav isOpen={sidebarIsOpen} handleClick={toggleSidebar} />
              </div>
            </div>
            {/* main content -  max-h-[90vh] - overflow-y-scroll - */}
            <div
              className=" bg-[#F6f6f6] min-h-[100vh] lg:pb-6 pb-20 scrollBarSettings"
              id="content"
            >
              <div className="responsive-layout">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
