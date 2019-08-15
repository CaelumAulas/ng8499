import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
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
    ,private rota: ActivatedRoute
    ) { }

  ngOnInit() {

    /* this.rota.params.subscribe( parametros => console.log(parametros))
    this.rota.queryParams.subscribe( parametros => console.log(parametros)) */

    const parametros = this.rota.snapshot.params;

    if(parametros.username){
      this.login.email = `${parametros.username}@cmail.com.br`;
    }

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
          () => this.roteador.navigate([''])
          ,(erro: HttpErrorResponse) => {
            console.log(erro);
            this.errorMessage = 'Oops, credenciais inválidas'
          }
        )
  }

}

