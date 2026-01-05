
// Always load fresh JSON (no build-time caching)

// const baseUrl =
//   process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";


// async function loadProjects() {
//   const res = await fetch(`${baseUrl}/api/projects`, {
//     cache: "no-store",
//   });

//   return res.json();
// }

import projectData from "./projectsData.json"



export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  showcaseImages:string[];
  city:string;
}

export interface ProjectCategory {
  id: string;
  title: string;
  description: string;
  image:string;
  showcaseImages: string[]; // 👈 New field for 2x2 grid showcase
  projects: Project[];
}

export const projectCategories: ProjectCategory[] =projectData
