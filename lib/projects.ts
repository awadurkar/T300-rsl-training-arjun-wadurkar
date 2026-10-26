import projectData from "@/data/projects.json";

export type ProjectStatus = "active" | "completed" | "planning";

export type ProjectTask = {
  title: string;
  done: boolean;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  category: string;
  owner: string;
  initials: string;
  color: string;
  progress: number;
  dueDate: string;
  team: string[];
  tasks: ProjectTask[];
};

const projects = projectData as Project[];

export function getProjects(): Project[] {
  return projects;
}

export function findProject(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export async function loadProject(id: string): Promise<Project | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 650));
  if (id === "demo-error") {
    throw new Error("The project service is temporarily unavailable.");
  }
  return findProject(id);
}
