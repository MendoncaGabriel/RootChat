import express, { type Request, type Response } from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
const PORT = 4002;

app.use(express.json());

// Rota REST simples
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Servidor rodando 🚀" });
});

// Inicia o servidor HTTP
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// --- WebSocket ---
// Usa o mesmo servidor HTTP do Express para WebSocket (opcional)
const wss = new WebSocketServer({ server }); 

wss.on("connection", (ws: WebSocket) => {
  console.log("Novo cliente conectado!");

  ws.on("message", (message: WebSocket.RawData) => {
    const msgStr = message.toString();
    console.log(`Mensagem recebida: ${msgStr}`);

    // Broadcast para todos os clientes, exceto o remetente
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`Alguém disse: ${msgStr}`);
      }
    });
  });

  // ws.send("Bem-vindo ao RootChat! 👋");
});
