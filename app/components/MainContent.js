import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const MainContent = ({ activeSection }) => {
  const { user, loading, createUser } = useContext(AuthContext);

  const nextUpdate = "Wait for next version";

  const [projects, setProjects] = useState([]);
  const [created, setCreated] = useState(false);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      setProjectsLoading(true);
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        setProjects(data.projects);
        setProjectsLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (user?.email) {
      const userProjects = projects.filter(
        (project) => project?.email === user?.email
      );
      setFilteredProjects(userProjects);
    }
  }, [projects, user]);

  const overviewData = [
    {
      projectName: "Project Alpha",
      qSquared: "Q1",
      creationDate: "2024-01-01",
      samples: 50,
      parameters: 10,
    },
    {
      projectName: "Project Beta",
      qSquared: "Q2",
      creationDate: "2024-02-01",
      samples: 30,
      parameters: 8,
    },
    {
      projectName: "Project Gamma",
      qSquared: "Q3",
      creationDate: "2024-03-01",
      samples: 40,
      parameters: 12,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const projectName = form.projectName.value;

    // const handleSafeUserToDB = async (user) => {
    const data = {
      email: user?.email,
      projectName,
    };

    const res = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({ data }),
      "Content-Type": "application/json",
    });
    if (!res.ok) {
      throw new Error("Failed to add project");
    } else {
      // window.location.href = "/dashboard";
      setCreated(true);
      window.location.reload();

      // alert("Project added");
    }
    form.reset();

    // };
  };
  return (
    <div className="content">
      <button
        className="btn btn-active btn-success text-white"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Create New Project
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">New Project </h3>
          {created ? (
            <>New project created!</>
          ) : (
            <form action="" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Project name here"
                name="projectName"
                className="input input-bordered input-info w-full my-4"
              />

              <button
                className="btn btn-active btn-info text-white"
                type="submit"
              >
                Create
              </button>
            </form>
          )}
        </div>
      </dialog>
      <div>
        {projectsLoading ? (
          <>
            <span className="loading loading-spinner text-info my-4"></span>
          </>
        ) : (
          <>
            {" "}
            {filteredProjects.length > 0 ? (
              <>
                {activeSection === "overview" && (
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Project Name</th>
                          <th>Q-Squared</th>
                          <th>Creation Date</th>
                          <th>#Samples</th>
                          <th>#Parameters</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProjects.map((row, index) => (
                          <tr key={index}>
                            <td>{row.projectName}</td>
                            <td>{row.qSquared}</td>
                            <td>{row.createdAt.slice(0, 10)}</td>
                            <td>{row.samples}</td>
                            <td>{row.parameters}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            ) : (
              <div class="p-4 bg-gray-100 mt-4 w-full text-black">No data</div>
            )}
          </>
        )}
      </div>

      {activeSection === "control" && <div>Control Content will be here</div>}
      {activeSection === "status" && <div>Status Content will be here</div>}
    </div>
  );
};

export default MainContent;
