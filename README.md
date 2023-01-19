# Setup-NLW

## 🚀 Projeto
Um controlador de hábitos com visualização do progresso dia-a-dia

- 📊 Backend:   🚧 Em construção 🚧
- 🖼️ Frontend:   🚧 Em construção 🚧
- 📱 Mobile:  🚧 Em construção 🚧

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
  $ npx prisma db seed		  #populates the db with data from the seed.ts file
  $ npx prisma studio dev		#optional - visualize the db on the web browser
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
  $ cd back
  $ npm install             #download dependencies to node_modules
  $ npx expo start          #start the project
```
