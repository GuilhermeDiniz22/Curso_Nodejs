import express from 'express';
import LivroController from '../controllers/livroController.js';

const routes = express.Router();

routes.get("/", LivroController.homepage)
routes.get("/livros", LivroController.listarLivros);
routes.post("/livros", LivroController.criarLivro);
routes.get("/livros/:id", LivroController.buscarLivroPorId);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.deletarLivro);

export default routes;