
import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { GatewayModule } from './gateway/gateway.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [ProjectsModule, GatewayModule, KafkaModule],
  providers: [],
})
export class AppModule {}
