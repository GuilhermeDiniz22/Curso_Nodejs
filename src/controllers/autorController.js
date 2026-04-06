import Autor from "../models/autor.js";

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
      const camposFaltantes = camposObrigatorios.filter(
        (campo) => !req.body[campo],
      );

      if (camposFaltantes.length) {
        return res.status(400).json({
          message: "Campos obrigatórios faltando",
          missingFields: camposFaltantes,
        });
      }

      const novo = await Autor.create(req.body);

      res.status(201).json({
        message: "Autor adicionado com sucesso",
        autor: novo,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          message: "Dados do autor inválidos",
          erros: error.errors,
        });
      }

      res.status(500).json({
        message: "Erro ao cadastrar autor",
        error: error.message,
      });
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
      res.status(500).json({ mensagem: "Erro ao buscar autor", erro: error.message });
    }
  }

  static async atualizarAutor(req, res) {
    try {
      const autor = await Autor.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!autor) {
        return res.status(404).json({ mensagem: "Autor não encontrado" });
      }
      res.status(200).json({ mensagem: "Autor atualizado!", autor });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao atualizar autor", erro: error.message });
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
      res.status(500).json({ mensagem: "Erro ao deletar autor", erro: error.message });
    }
  }
}
export default AutorController;
