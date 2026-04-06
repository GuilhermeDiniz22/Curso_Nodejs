import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    sparse: true
  },
  titulo: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  ano: {
    type: Number,
    required: true
  },
  genero: {
    type: String,
    required: true
  }
});

const Livro = mongoose.model('livros', livroSchema);

export default Livro;
