import express from 'express';
import conecta from './config/db.js';
import routes from './routes/livrosRoutes.js';

const conexao = await conecta();

conexao.on("error", (erro) =>{
  console.error("erro de conexão: ", erro)
});

conexao.once("open", ()=>{
  console.log("conexão realizada com sucesso!")
});

const app = express();
app.use(express.json());

app.use(routes);

export default app;