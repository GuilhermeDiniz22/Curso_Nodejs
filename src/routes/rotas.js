import express from 'express';
import LivroController from '../controllers/livroController.js';
import AutorController from '../controllers/autorController.js';

const routes = express.Router();

routes.get("/", LivroController.homepage)
routes.get("/livros", LivroController.listarLivros);
routes.post("/livros", LivroController.criarLivro);
routes.get("/livros/:id", LivroController.buscarLivroPorId);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.deletarLivro);

routes.get("/autores", AutorController.listarAutores);
routes.post("/autores", AutorController.criarAutor);
routes.get("/autores/:id", AutorController.buscarAutorPorId);
routes.put("/autores/:id", AutorController.atualizarAutor);
routes.delete("/autores/:id", AutorController.deletarAutor);

export default routes;