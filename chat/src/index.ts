#!/usr/bin/env node
import WebSocket from "ws";
import readline from "node:readline";
import fs from "node:fs";
import path from "node:path";
import { Directory } from "./components/directory.js";
import dotenv from "dotenv";

const directory = new Directory();

dotenv.config({
  path: path.resolve(directory.project, ".env"),
  override: true
});

const WS_URL = process.env.WS_URL || "ws://localhost:4002";


const userFile = path.join(directory.project, ".rootchat_user");

// ANSI codes para verde estilo Matrix
const green = "\x1b[32m";
const reset = "\x1b[0m";
const bold = "\x1b[1m";

console.clear();

// Função para mostrar o banner Matrix
function showWelcome() {
  const banner = `
██████╗  ██████╗  ██████╗ ████████╗ ██████╗██╗  ██╗ █████╗ ████████╗
██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝██╔════╝██║  ██║██╔══██╗╚══██╔══╝
██████╔╝██║   ██║██║   ██║   ██║   ██║     ███████║███████║   ██║   
██╔══██╗██║   ██║██║   ██║   ██║   ██║     ██╔══██║██╔══██║   ██║   
██║  ██║╚██████╔╝╚██████╔╝   ██║   ╚██████╗██║  ██║██║  ██║   ██║   
╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝    ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝                                                                      
`;
  console.log(green + bold + banner + reset);
}

// Obtém ou pergunta o nome do usuário
async function getUserName(): Promise<string> {
  if (fs.existsSync(userFile)) {
    return fs.readFileSync(userFile, "utf-8").trim();
  }

  return new Promise((resolve) => {
    const rlTemp = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rlTemp.question(`${green}Digite seu nome: ${reset}`, (name) => {
      const trimmed = name.trim() || "Anônimo";
      fs.writeFileSync(userFile, trimmed, "utf-8");
      rlTemp.close();
      resolve(trimmed);
    });
  });
}

async function startChat() {
  showWelcome();

  const userName = await getUserName();

  const ws = new WebSocket(WS_URL);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `${green}${userName}> ${reset}`,
  });

  ws.on("open", () => {
    // fazer alguma ação
    // console.log(`${green}Conectado ao chat! Digite suas mensagens.${reset}\n`);
    rl.prompt();
  });

  ws.on("message", (data) => {
    console.log(`\n${green}${data.toString()}${reset}`);
    rl.prompt();
  });

  rl.on("line", (line) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ user: userName, message: line }));
    }
    rl.prompt();
  });
}

startChat();
