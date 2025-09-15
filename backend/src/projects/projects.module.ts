
import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [KafkaModule],
})
export class ProjectsModule {}
