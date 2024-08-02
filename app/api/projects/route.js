import Projects from "@/models/projects";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const data = body.data;
    await Projects.create(data);
    console.log(data);
    return NextResponse.json({ message: "Projects added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

// export async function GET(req) {
//   try {
//     const products = await Product.find();
//     return NextResponse.json({ products }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "error", error }, { status: 500 });
//   }
// }

export async function GET(req) {
  try {
    const projects = await Projects.find();
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
