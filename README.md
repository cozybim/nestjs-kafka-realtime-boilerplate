
# NestJS + Kafka + WebSocket Realtime Example (Bootstrap)

This repository contains:
- backend/ : NestJS example that publishes project_created events to Kafka and runs a Socket.IO gateway to broadcast to browsers.
- frontend/: Next.js example that creates projects via backend and listens on Socket.IO for live updates.
- docker-compose.yml : Zookeeper + Kafka (Bitnami) for local testing.

Quick start (in separate terminals):
1. Start Kafka & Zookeeper:
   ```bash
   docker-compose up -d
   ```
2. Start backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Ensure .env or environment variable `KAFKA_BROKERS` points to `localhost:9092` (default)
3. Start frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. Open http://localhost:3000 - create a project. The backend publishes to Kafka, Gateway consumes and broadcasts via Socket.IO to all connected FE clients.

Notes:
- The backend uses in-memory storage for demo purposes. Replace with DB for production.
- When deploying multiple backend instances, Kafka ensures events are durable and distributed.
- Socket.IO server runs on port 3002 by default in the example.
