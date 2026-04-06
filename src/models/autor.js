import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    sparse: true
  },
  nome: {
    type: String,
    required: true
  },
  nacionalidade : {
    type: String,
    required: true
  }
});

const Autor = mongoose.model('autores', autorSchema);

export default Autor;
export { autorSchema }; 
