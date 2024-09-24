import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
const app = express()

app.use(express.json())
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

// POST para añadir nuevos estudiantes
app.post('/user', (req, res)=>{ 
  let query = 'select * from Estudiantes where Cedula = ?';
  const { Nombre, Apellidos, Cedula, Correo, Contrasena, Carrera, Estado } = req.body;

  connecting.query(query, [ Cedula ], (err, resu)=>{
    if (err) {return res.status(500).json({error: err.message})}
    if(resu.length > 0){return res.status(400).send([{codigo:'001'}])}

    query = 'insert into Estudiantes(Nombre, Apellidos, Cedula, Correo, Contrasena, Carrera, Estado) values (?,?,?,?,?,?,?)'
    connecting.query(query, [ Nombre, Apellidos, Cedula, Correo, Contrasena, Carrera, Estado ], (err, resu)=>{  
      if (err) {return res.status(500).json({error: err.message})}
      res.json(resu)
    })
  })
})

// PUT para actualizar información del estudiante
app.put('/user',(req, res)=>{ 
  let query = 'update Estudiantes set Nombre = ?, Apellidos = ?, Correo = ?, Carrera = ? where Cedula = ?';
  const { Nombre, Apellidos, Cedula, Correo, Carrera } = req.body;

  connecting.query(query, [ Nombre, Apellidos, Correo, Carrera, Cedula ], (err, resu)=>{
    if (err) {return res.status(500).json({error: err.message})}
    res.json(resu)
  })
})

app.listen(3001, ()=>{})

