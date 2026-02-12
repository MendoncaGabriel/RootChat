# RootChat CLI

Chat interativo via terminal, usando WebSocket.  

---

## Pré-requisitos

- **Node.js** v24.x
- **npm** 11.x

---

## Instalação

1. Clone ou baixe o projeto do RootChat:

```bash
git clone https://github.com/MendoncaGabriel/RootChat.git
cd RootChat/chat
````

2. Instale as dependências:

```bash
npm install
```

3. Link do CLI global (para rodar `rc` de qualquer terminal):

```bash
npm run link
```

4. crie um arquivo ".env" na pasta chat seguindo o modelo descrito no arquivo .env.example

---

## Uso

Após linkar o CLI, abra qualquer terminal e rode:

```bash
rc
```

* Ao abrir pela primeira vez, você será solicitado a digitar seu nome.
* Digite suas mensagens e veja a conversa em tempo real com outros usuários conectados.