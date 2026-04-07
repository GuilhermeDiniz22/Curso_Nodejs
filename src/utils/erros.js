import mongoose from "mongoose";

export const tratarErroValidacao = (res, error) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Dados fornecidos são inválidos",
      erros: error.errors,
    });
  }
};

export const tratarErroCastId = (res, error, recurso = "registro") => {
  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: `ID do ${recurso} fornecido é inválido.`,
    });
  }
};

export const tratarErroGenerico = (res, error, mensagem = "Erro ao processar operação") => {
  res.status(500).json({
    message: mensagem,
    error: error.message,
  });
};

export const validarCamposObrigatorios = (body, camposObrigatorios) => {
  return camposObrigatorios.filter((campo) => !body[campo]);
};

export const calcularPaginacao = (page, limit, total) => {
  const currentPage = parseInt(page) || 1;
  const itemsPerPage = parseInt(limit) || 10;
  const totalPages = Math.ceil(total / itemsPerPage);
  const skip = (currentPage - 1) * itemsPerPage;

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems: total,
    skip
  };
};
