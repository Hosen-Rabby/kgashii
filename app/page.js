import Image from "next/image";
import { useContext } from "react";
import AuthProvider, { AuthContext } from "./provider/AuthProvider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <h1 className="text-xl">
        Welcome 
      </h1>
      <a href="/dashboard">Login</a>
    </main>
  );
}
