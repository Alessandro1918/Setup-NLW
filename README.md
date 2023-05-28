# Setup-NLW

## 🚀 Projeto
Um controlador de hábitos com visualização do progresso dia-a-dia!

<div align="center">
  <img alt="1 - overview" title="1 - overview" src="assets/NlwSetup1.jpg" width="30%" />
  <img alt="2 - overview" title="2 - overview" src="assets/NlwSetup2.jpg" width="30%" />
  <img alt="3 - overview" title="3 - overview" src="assets/NlwSetup3.jpg" width="30%" />
</div>


## 🛠️ Tecnologias
- 📊 Backend: [Node.js](https://nodejs.org/en/) | [Prisma](https://www.prisma.io)
- 🖼️ Frontend: [React](https://pt-br.reactjs.org) | [Tailwind CSS](https://tailwindcss.com)
- 📱 Mobile: [React Native](https://reactnative.dev) | [Expo](https://expo.dev)


## 🗂️ Utilização

### 🐑🐑 Clonando o repositório:

```bash
  $ git clone url-do-projeto.git
```

### ▶️ Rodando o App:

📊 Backend
```bash
  $ cd back
  $ npm install             #download dependencies to node_modules
  $ npx prisma migrate dev  #creates the local dev.db file
  $ npx prisma db seed      #populates the db with data from the seed.ts file
  $ npx prisma studio dev   #optional - visualize the table relations on a diagram on the web browser
  $ npm run dev             #start the project
```

🖼️ Frontend
```bash
  $ cd front
  $ npm install             #download dependencies to node_modules
  $ npm run dev             #start the project
```

📱 Mobile
```bash
  $ cd mobile
  $ npm install             #download dependencies to node_modules
  $ npx expo start          #start the project
```
