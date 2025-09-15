
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;
export default function Home() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/projects').then(r => r.json()).then(setProjects).catch(console.error);

    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3002');
    socket.on('connect', () => console.log('connected to socket', socket.id));
    socket.on('project_created', (p) => {
      setProjects(prev => [p, ...prev]);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  async function createProject(e) {
    e.preventDefault();
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description: desc }),
    });
    const data = await res.json();
    setName('');
    setDesc('');
    // created will be broadcasted via socket when Kafka consumer emits it
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>NestJS + Kafka + WebSocket Realtime Demo</h1>
      <form onSubmit={createProject} style={{ marginBottom: 20 }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="project name" required />
        <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="description" style={{ marginLeft: 8 }} />
        <button type="submit" style={{ marginLeft: 8 }}>Create</button>
      </form>
      <h2>Projects (live)</h2>
      <ul>
        {projects.map(p => (
          <li key={p.id}><strong>{p.name}</strong> — {p.description} <em>({new Date(p.createdAt).toLocaleString()})</em></li>
        ))}
      </ul>
    </div>
  );
}
