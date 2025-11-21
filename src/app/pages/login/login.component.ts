import { Component } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  imports: [FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario={
    nome:'',
    senha:''
  }

  constructor(private authService:AuthService, private router:Router){}

  login(){
  this.authService.login(this.usuario).subscribe({
  next:(response)=>{
    
    console.log("Usuário efetuado");
    this.router.navigate(["/home"]);
  },
  error:(err)=>{
    alert("usuário ou senha incorreta");
  }

})

  }

}
