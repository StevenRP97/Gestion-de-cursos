import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

// Conexión con la base de datos 
const connecting = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'0123456789',
  database:'GestionCursos'
})
connecting.connect((err)=>{if (err) throw err;})

// Declaración de los endpoints 

// POST para añadir nuevos cursos
app.post('/GestionNotas', (req, res)=>{
  let query = 'select * from Cursos where CursoID = ?'
  const { Rubro, Nota, CursoID } = req.body;

  connecting.query(query, [ CursoID ], (err, resu)=>{
    if (err) {return res.status(500).json({error: err.message})}
    if(resu.length == 0){return res.status(400).send([{codigo:'002'}])}

    query = 'insert into GestionNotas(Rubro, Nota, CursoID) values (?,?,?)'
    connecting.query(query, [ Rubro, Nota, CursoID ], (err, resu)=>{  
      if (err) {return res.status(500).json({error: err.message})}
      res.json(resu)
    })
  })
})

// PUT para actualizar información del curso 
app.put('/GestionNotas', (req, res)=>{
  const query = 'update GestionNotas set Rubro = ?, Nota = ? where RubroID = ?';
  const { Rubro, Nota, RubroID } = req.body;

  connecting.query(query, [ Rubro, Nota, RubroID ], (err, resu)=>{
    if (err) {return res.status(500).json({error: err.message})}
    res.json(resu)
  })
})

// Listening in port 3002
app.listen(3002, ()=>{})
