#!/usr/bin/env node

import { Directory } from "./components/directory.js";

const directory = new Directory();

console.log("📂 Diretório do terminal:");
console.log(directory.terminal);

console.log("\n📁 Diretório do projeto:");
console.log(directory.project);
