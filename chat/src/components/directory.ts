import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Directory {
  /** Retorna onde o usuário está rodando o CLI */
  get terminal() {
    return process.cwd();
  }
  
  /** Retorna a pasta onde o CLI está instalado */
  get project() {
    return path.resolve(__dirname, "../../");
  }
}
