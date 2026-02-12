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
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// --- WebSocket ---
// Usa o mesmo servidor HTTP do Express para WebSocket (opcional)
const wss = new WebSocketServer({ server });

wss.on("connection", (ws: WebSocket) => {
  console.log("Novo cliente conectado!");

  // Mensagem de boas-vindas apenas para o cliente novo
  ws.send(JSON.stringify({ user: "SERVER", message: "🟢 Bem-vindo ao chat!" }));

  ws.on("message", (message: WebSocket.RawData) => {
    const msgStr = message.toString();
    console.log(`Mensagem recebida: ${msgStr}`);

    // Broadcast para todos os clientes, incluindo o remetente
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msgStr);
      }
    });
  });
});

