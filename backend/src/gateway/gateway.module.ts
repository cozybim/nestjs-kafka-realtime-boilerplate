
import { Module, OnModuleInit } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  providers: [GatewayService],
  imports: [KafkaModule],
  exports: [GatewayService],
})
export class GatewayModule implements OnModuleInit {
  constructor(private readonly gatewayService: GatewayService) {}
  onModuleInit() {
    // nothing here, service initializes itself
  }
}
