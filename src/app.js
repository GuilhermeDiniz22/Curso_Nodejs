import express from 'express';

const app = express();
app.use(express.json());

const livros = [
  {
    id: 1,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    ano: 1899,
    genero: "Romance"
  },
  {
    id: 2,
    titulo: "O Senhor dos Anéis",
    autor: "J.R.R. Tolkien",
    ano: 1954,
    genero: "Fantasia"
  },
  {
    id: 3,
    titulo: "1984",
    autor: "George Orwell",
    ano: 1949,
    genero: "Distopia"
  },
  {
    id: 4,
    titulo: "A Revolução dos Bichos",
    autor: "George Orwell",
    ano: 1945,
    genero: "Sátira"
  },
  {
    id: 5,
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    ano: 1943,
    genero: "Fábula"
  }
];

app.get('/', (req, res) =>{
    res.status(200).send("Curso de node js");
});

app.get('/livros', (req, res) =>{
    res.status(200).json(livros);
});

app.get('/livros/:id', (req, res) =>{
    const livroId = parseInt(req.params.id);
    const livro = livros.find(l => l.id == livroId);

    if(!livro){
        res.status(401).send("Livro com id: "+ livroId + " não encontrado!")
    }

    res.status(200).json(livro);
});

app.post('/livros', (req, res) =>{
    livros.push(req.body);
    res.status(201).send("Livro cadastrado!")
});

app.put('/livros/:id', (req, res) =>{
    

    const index = buscaIndex(req.params.id, livros)

    livros[index].titulo = req.body.titulo;
    livros[index].autor = req.body.autor;
    livros[index].ano = req.body.ano;  
    livros[index].genero = req.body.genero;
    
   

    res.status(200).send("Livro atualizado!")
});

function buscaIndex(id, array){
    return array.findIndex(item => {
        return item.id === Number(id);
    })
}

export default app;