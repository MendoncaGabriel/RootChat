import express, { type Request, type Response } from "express";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Servidor rodando 🚀" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
