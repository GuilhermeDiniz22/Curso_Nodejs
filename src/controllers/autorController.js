import Autor from "../models/autor.js";
import { tratarErroValidacao, tratarErroCastId, tratarErroGenerico, validarCamposObrigatorios, responderErroValidacao } from "../utils/erros.js";

class AutorController {
  static async listarAutores(req, res) {
    try {
      const autores = await Autor.find();
      res.status(200).json(autores);
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro ao buscar autores", erro: error.message });
    }
  }

  static async criarAutor(req, res) {
    try {
      const camposObrigatorios = ["nome", "nacionalidade"];
      const camposFaltantes = validarCamposObrigatorios(req.body, camposObrigatorios);

      const erro = responderErroValidacao(res, camposFaltantes);
      if (erro) return;

      const novo = await Autor.create(req.body);

      res.status(201).json({
        message: "Autor adicionado com sucesso",
        autor: novo,
      });
    } catch (error) {
      if (tratarErroValidacao(res, error)) return;
      tratarErroGenerico(res, error, "Erro ao cadastrar autor");
    }
  }

  static async buscarAutorPorId(req, res) {
    try {
      const autor = await Autor.findById(req.params.id);
      if (!autor) {
        return res.status(404).json({ mensagem: "Autor não encontrado" });
      }
      res.status(200).json(autor);
    } catch (error) {
      if (tratarErroCastId(res, error, "autor")) return;
      tratarErroGenerico(res, error, "Erro ao buscar autor");
    }
  }

  static async atualizarAutor(req, res) {
    try {
      const autor = await Autor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!autor) {
        return res.status(404).json({ mensagem: "Autor não encontrado" });
      }
      res.status(200).json({ mensagem: "Autor atualizado!", autor });
    } catch (error) {
      if (tratarErroValidacao(res, error)) return;
      if (tratarErroCastId(res, error, "autor")) return;
      tratarErroGenerico(res, error, "Erro ao atualizar autor");
    }
  }

  static async deletarAutor(req, res) {
    try {
      const autor = await Autor.findByIdAndDelete(req.params.id);
      if (!autor) {
        return res.status(404).json({ mensagem: "Autor não encontrado" });
      }
      res.status(200).json({ mensagem: "Autor deletado com sucesso!" });
    } catch (error) {
      if (tratarErroValidacao(res, error)) return;
      if (tratarErroCastId(res, error, "autor")) return;
      tratarErroGenerico(res, error, "Erro ao deletar autor");
    }
  }
}
export default AutorController;
