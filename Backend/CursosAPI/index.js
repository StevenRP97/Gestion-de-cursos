import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
  res.json([{hola:"Holi UwU"}])
})

const port = 3000;
app.listen(port, ()=>{})
