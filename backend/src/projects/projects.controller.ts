
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProjectsService, Project } from './projects.service';
import { KafkaService } from '../kafka/kafka.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly kafkaService: KafkaService,
  ) {}

  @Post()
  async create(@Body() payload: { name: string; description?: string }) {
    const project: Project = {
      id: uuidv4(),
      name: payload.name,
      description: payload.description,
      createdAt: new Date().toISOString(),
    };
    const created = this.projectsService.create(project);
    // publish to kafka topic 'projects'
    await this.kafkaService.publish('projects', created);
    return created;
  }

  @Get()
  async list() {
    return this.projectsService.findAll();
  }
}
