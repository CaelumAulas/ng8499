import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { UserInputDTO } from 'src/app/models/dto/user-input';
import { Router } from '@angular/router';
import { map, catchError } from "rxjs/operators";
import { CadastroService } from 'src/app/services/cadastro.service';

@Component({
  selector: 'cmail-cadastro',
  templateUrl: './cadastro.component.html',
  styles: []
})
export class CadastroComponent implements OnInit {

  nome = new FormControl('',[Validators.required, Validators.minLength(2), Validators.pattern(/^\D*$/)]);
  username = new FormControl('',[Validators.required,Validators.minLength(4)]);
  senha = new FormControl('',[Validators.required,Validators.minLength(3)] );
  avatar = new FormControl('',Validators.required,this.validaImagem.bind(this) );
  telefone = new FormControl('',[Validators.required,Validators.minLength(8), Validators.maxLength(9), Validators.pattern(/^\d{8,9}$/)]);

  formCadastro = new FormGroup({
    nome: this.nome,
    username: this.username,
    senha: this.senha,
    avatar: this.avatar,
    telefone: this.telefone
  });

  mensagemErro = "";

  constructor(private http: HttpClient
            ,private roteador: Router
            ,private servico: CadastroService) {}

  ngOnInit() {}

  validaImagem(campo: FormControl) {

    return this.http
                .head( campo.value, {observe: 'response'})
                .pipe(
                  map((response: HttpResponseBase) => {

                    if(response.status == 200){
                      return null
                    } else {
                      return {urlInvalida: true}
                    }

                  })
                  ,catchError((error: HttpErrorResponse) => {
                    console.log(error);
                    return [{urlInvalida: true}]
                  })
                )

  }

  enviarCadastro(){

    if(this.formCadastro.invalid){
      this.formCadastro.markAllAsTouched();
      return
    }

    this.servico
        .cadastrar(this.formCadastro.value)
        .subscribe (
          (response) => {
            console.log(response);
            this.roteador.navigate(['login', this.formCadastro.get('username').value])
          }
          ,(erro: HttpErrorResponse) => {
            console.log(erro.error.body[0].message);
            this.mensagemErro = erro.error.body[0].message;
          }
        )
  }

}
