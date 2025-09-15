
# NestJS Kafka Realtime Backend (Example)

Install dependencies:
```bash
cd backend
npm install
```

Run (dev):
```bash
npm run dev
```

Defaults:
- REST API: http://localhost:3001
- Socket.IO server: http://localhost:3002 (CORS: *)
- Kafka brokers: localhost:9092 (configure via .env)

Flow:
1. POST /projects => backend saves in-memory and publishes to Kafka topic 'projects'
2. Gateway service consumes from 'projects' and broadcasts `project_created` via Socket.IO
