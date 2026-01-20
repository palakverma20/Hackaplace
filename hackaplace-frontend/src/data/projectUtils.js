import { mockProjects } from './mockProjects';

const PROJECTS_KEY = 'hackaplace_user_projects';

export const getProjects = () => {
  const stored = localStorage.getItem(PROJECTS_KEY);
  return stored ? JSON.parse(stored) : mockProjects;
};

export const saveProjects = (projects) => {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
};

export const deleteProject = (projectId) => {
  const projects = getProjects();
  const updated = projects.filter(p => p.projectId !== projectId);
  saveProjects(updated);
};
