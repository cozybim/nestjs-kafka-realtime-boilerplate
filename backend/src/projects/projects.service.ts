
import { Injectable } from '@nestjs/common';

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

@Injectable()
export class ProjectsService {
  private projects: Project[] = [];

  create(project: Omit<Project, 'createdAt'>) {
    const p = { ...project, createdAt: new Date().toISOString() };
    this.projects.push(p);
    return p;
  }

  findAll() {
    return this.projects;
  }
}
