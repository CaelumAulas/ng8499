import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'cmail-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = {
    email: 'sd@cmail.com.br',
    password: '123'
  }

  errorMessage = '';

  constructor(
    private roteador: Router
    ,private servico: LoginService
    ) { }

  ngOnInit() {
  }

  handleLogin(formLogin: NgForm) {

    if(formLogin.invalid){
      formLogin.control.markAllAsTouched();
      console.error('dados invalidos');
      return
    }

    this.servico
        .autenticar(this.login)
        .subscribe(
          response => {
            localStorage.setItem('cmail-token',response.token)
            this.roteador.navigate(['']);
          }
          ,(erro: HttpErrorResponse) => {
            console.log(erro);
            this.errorMessage = 'Oops, credenciais inválidas'
          }
        )
  }

}

