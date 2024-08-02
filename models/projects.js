import connetMongoDB from "@/libs/mongodb";
import mongoose, { Schema } from "mongoose";
connetMongoDB();
const projectsShema = new Schema(
  {
    email: String,
    projectName: String,
  },
  {
    timestamps: true,
  }
);

const Projects =
  mongoose.models.Projects || mongoose.model("Projects", projectsShema);
export default Projects;
