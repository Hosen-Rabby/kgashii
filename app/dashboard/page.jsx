"use client";
import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Sidebar from "../components/sidebar";
import MainContent from "../components/MainContent";

const Page = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState("overview");

  let content;
  if (loading) {
    content = <>Loading...</>;
  } else if (user?.email) {
    content = <>{user?.email}</>;
  } else {
    window.location.href = "/sign-in";
  }

  return (
    <div className="container mx-auto ">
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          {user ? (
            <>
              <div className=" w-full h-[60px] text-right bg-gray-200 flex items-center justify-end px-4">
                <p className="font-semibold ">
                  {user?.email}{" "}
                  <button
                    onClick={() => {
                      logOut();
                    }}
                    className="bg-red-700 ml-4 text-white rounder p-2"
                  >
                    Logout
                  </button>
                </p>
              </div>
              <div className="container flex  dash_content">
                <Sidebar
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
                <MainContent activeSection={activeSection} />
              </div>
            </>
          ) : (
            <>No content!</>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
