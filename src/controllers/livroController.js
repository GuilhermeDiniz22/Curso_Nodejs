import mongoose from "mongoose";
import Autor from "../models/autor.js";
import Livro from "../models/livro.js";
import { tratarErroValidacao, tratarErroCastId, tratarErroGenerico, validarCamposObrigatorios, responderErroValidacao } from "../utils/erros.js";

class LivroController {
    
  static async homepage(req, res) {
     res.status(200).send("Curso de node js");
    };
  
  static async listarLivros(req, res) {
    try {
      const livros = await Livro.find().populate("autor");
      res.status(200).json(livros);
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro ao buscar livros", erro: error.message });
    }
  }

  static async criarLivro(req, res) {
    const livro = req.body;
    livro.genero = livro.genero.charAt(0).toUpperCase() + livro.genero.slice(1).toLowerCase();
    try {
      const camposObrigatorios = ["titulo", "autor", "ano", "genero"];
      const camposFaltantes = validarCamposObrigatorios(req.body, camposObrigatorios);

      const erro = responderErroValidacao(res, camposFaltantes);
      if (erro) return;

      const autor = await Autor.findById(livro.autor);

      if(!autor){
        return res.status(404).json({
          message: "Autor não encontrado!"
        });
      }

      const livroCompleto = { ...livro, autor: autor._id };
      const livroCriado = await Livro.create(livroCompleto);

      res.status(201).json({
        message: "Livro criado com sucesso",
        livro: livroCriado,
      });
    } catch (error) {
      if (tratarErroValidacao(res, error)) return;
      tratarErroGenerico(res, error, "Erro ao cadastrar livro");
    }
  }

  static async buscarLivroPorId(req, res) {
    try {
      const livro = await Livro.findById(req.params.id).populate("autor");
      if (!livro) {
        return res.status(404).json({ mensagem: "Livro não encontrado" });
      }
      res.status(200).json(livro);
    } catch (error) {
      if (tratarErroCastId(res, error, "livro")) return;
      tratarErroGenerico(res, error, "Erro ao buscar livro");
    }
  }

  static async atualizarLivro(req, res) {
    try {
      const livro = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("autor");
      if (!livro) {
        return res.status(404).json({ mensagem: "Livro não encontrado" });
      }
      res.status(200).json({ mensagem: "Livro atualizado!", livro });
    } catch (error) {
      if (tratarErroValidacao(res, error)) return;
      if (tratarErroCastId(res, error, "livro")) return;
      tratarErroGenerico(res, error, "Erro ao atualizar livro");
    }
  }

  static async deletarLivro(req, res) {
    try {
      const livro = await Livro.findByIdAndDelete(req.params.id);
      if (!livro) {
        return res.status(404).json({ mensagem: "Livro não encontrado" });
      }
      res.status(200).json({ mensagem: "Livro deletado com sucesso!" });
    } catch (error) {
      if (tratarErroValidacao(res, error)) return;
      if (tratarErroCastId(res, error, "livro")) return;
      tratarErroGenerico(res, error, "Erro ao deletar livro");
    }
  }

  static async buscarLivrosPorGenero(req, res){
    const genero = req.params.genero.charAt(0).toUpperCase() + req.params.genero.slice(1).toLowerCase();
    try {
      const livrosPorGenero = await Livro.find({genero: genero}).populate("autor");
      res.status(200).json(livrosPorGenero);
    } catch (error) {
      tratarErroGenerico(res, error, `Livros não encontrados por gênero: ${genero}`);
    }
  }
}
export default LivroController;
