import express from 'express';
import conecta from './config/db.js';
import Livro from './models/livro.js';

const conexao = await conecta();

conexao.on("error", (erro) =>{
  console.error("erro de conexão: ", erro)
});

conexao.once("open", ()=>{
  console.log("conexão realizada com sucesso!")
});

const app = express();
app.use(express.json());

app.get('/', (req, res) =>{
    res.status(200).send("Curso de node js");
});

app.get('/livros', async (req, res) =>{
    try {
      const livros = await Livro.find();
      res.status(200).json(livros);
    } catch (erro) {
      res.status(500).json({mensagem: "Erro ao buscar livros", erro});
    }
});

app.get("/livros/:id", async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if(!livro){
      res.status(404).json({mensagem: "Livro não encontrado"});
      return;
    }
    res.status(200).json(livro);
  } catch (erro) {
    res.status(500).json({mensagem: "Erro ao buscar livro", erro});
  }
});

app.post("/livros", async (req, res) => {
  try {
    const livro = new Livro(req.body);
    await livro.save();
    res.status(201).json({mensagem: "Livro cadastrado com sucesso", livro});
  } catch (erro) {
    res.status(400).json({mensagem: "Erro ao cadastrar livro", erro});
  }
});

app.put('/livros/:id', async (req, res) =>{
  try {
    const livro = await Livro.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!livro){
      res.status(404).json({mensagem: "Livro com id: "+ req.params.id + " não encontrado!"});
      return;
    }
    res.status(200).json({mensagem: "Livro atualizado!", livro});
  } catch (erro) {
    res.status(400).json({mensagem: "Erro ao atualizar livro", erro});
  }
});

app.delete('/livros/:id', async (req, res) =>{
  try {
    const livro = await Livro.findByIdAndDelete(req.params.id);
    if(!livro){
      res.status(404).json({mensagem: "Livro com id: "+ req.params.id + " não encontrado!"});
      return;
    }
    res.status(200).json({mensagem: "Livro deletado com sucesso!"})
  } catch (erro) {
    res.status(400).json({mensagem: "Erro ao deletar livro", erro});
  }
})

export default app;