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
app.post('/cursos', (req, res)=>{
  let query = 'select * from Estudiantes where Cedula = ?'
  const { Nombre, Codigo, Cedula, Precio, Estado } = req.body;

  connecting.query(query, [ Cedula ], (err, resu)=>{
    if (err) {return res.status(500).json({error: err.message})}
    if(resu.length == 0){return res.status(400).send([{codigo:'002'}])}

    query = 'insert into Cursos(Nombre, Codigo, Cedula, Precio, Estado) values (?,?,?,?,?)'
    connecting.query(query, [ Nombre, Codigo,  Cedula, Precio, Estado ], (err, resu)=>{  
      if (err) {return res.status(500).json({error: err.message})}
      res.json(resu)
    })
  })
})

// PUT para actualizar información del curso 
app.put('/cursos',(req, res)=>{ 
  const query = 'update Cursos set Nombre = ?, Codigo = ?, Precio = ? where CursoID = ?';
  const { Nombre, Codigo, Precio, CursoID } = req.body;

  connecting.query(query, [ Nombre, Codigo, Precio, CursoID ], (err, resu)=>{
    if (err) {return res.status(500).json({error: err.message})}
    res.json(resu)
  })
})

// Listening in port 3000
app.listen(3000, ()=>{})
