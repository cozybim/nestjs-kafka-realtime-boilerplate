
import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class GatewayService {
  private io: Server;

  constructor(private readonly kafkaService: KafkaService) {
    this.initSocket();
    // register Kafka message handler
    this.kafkaService.setMessageHandler(async (msg) => {
      this.broadcastProjectCreated(msg);
    }).catch(err => console.error(err));
  }

  initSocket() {
    const httpServer = createServer();
    const io = new Server(httpServer, {
      cors: { origin: '*' }
    });
    this.io = io;

    io.on('connection', (socket: Socket) => {
      console.log('Client connected', socket.id);
      socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
      });
    });

    // Listen on a separate port for socket server
    const port = 3002;
    httpServer.listen(port, () => console.log(`Socket.IO server listening on port ${port}`));
  }

  broadcastProjectCreated(project: any) {
    if (!this.io) return;
    this.io.emit('project_created', project);
    console.log('Broadcasted project_created', project.id || project.name);
  }
}
