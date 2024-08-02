"use client";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Link from "next/link";
import { Router } from "react-router-dom";
import { useRouter } from "next/router";

const page = () => {
  const { user, logIn, loading } = useContext(AuthContext);
  const [signinError, setSignInError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((result) => {
        const user = result.user;
        window.location.href = "/dashboard";
      })
      .catch((error) => setSignInError(true));

    form.reset();
  };
  return (
    <div className="hero min-h-screen bg-base-200 container mx-auto flex items-center justify-center ">
      <div className="hero-content flex-col lg:flex-row-reverse p-4">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-4 w-[40px]">
          <p className="text-xl">Sign In</p>

          <form className="card-body" onSubmit={handleSubmit}>
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
              {/* <label className="label">
                <Link
                  href="/forget-password"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>
              </label> */}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" disabled={user}>
                {" "}
                {loading ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  <>Login</>
                )}
              </button>
            </div>
          </form>

          {signinError && <>Email or password icorrect</>}

          <Link href="/sign-up" className="m-2">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
