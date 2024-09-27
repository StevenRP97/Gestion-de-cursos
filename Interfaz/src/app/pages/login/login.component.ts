import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HttpClient } from "@angular/common/http"
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginObj: Login;

  constructor(private http:HttpClient, private router: Router){
    this.loginObj = new Login();
  }

  onLogin(){
    this.http.post('http://localhost:3001/estudiante/login', this.loginObj).subscribe((res:any)=>{
      console.log('El compa pudo ejecutar el API somehow bien')
      if(res.length > 0){
        console.log(res.json)
        alert("bieeeen")
        this.router.navigateByUrl('/dashboard')
      } else {
        alert(res.message)
      }
    })
  }
}

export class Login{
  Cedula: string
  Contrasena: string

  constructor(){
    this.Cedula = ''
    this.Contrasena = ''
  }
}
