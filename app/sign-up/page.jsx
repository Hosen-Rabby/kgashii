"use client";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Link from "next/link";




const page = () => {
  const { user, loading, createUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        if (user?.uid) {
          handleSafeUserToDB(user);
        }
        const loggedUser = {
          email: user.email,
        };
      })
      .catch((error) => console.log(Error));
    console.log(email, password);

    form.reset();
  };

  const handleSafeUserToDB = async (user) => {
    const data = { email: user?.email };
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ data }),
      "Content-Type": "application/json",
    });
    if (!res.ok) {
      throw new Error("Failed to add user");
    } else {
      window.location.href = "/dashboard";
    }
  };


  return (
    <div className="hero min-h-screen bg-base-200 container mx-auto flex items-center justify-center ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-4  w-[400px]">
          <p className="text-xl">Sign Up</p>
          <form className="card-body " onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" disabled={user}>
                {" "}
                {loading ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  <>Sign Up</>
                )}
              </button>
            </div>
          </form>

          <Link href="/sign-in" className="m-2">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
