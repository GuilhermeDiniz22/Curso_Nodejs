import mongoose from "mongoose";

async function conecta(){
  try {
    await mongoose.connect(process.env.DB_STRING);
    return mongoose.connection;
  } catch (erro) {
    console.error("Erro ao conectar ao MongoDB: ", erro);
    throw erro;
  }
}

export default conecta;


