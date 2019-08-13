import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserInputDTO } from 'src/app/models/dto/user-input';

@Component({
  selector: 'cmail-cadastro',
  templateUrl: './cadastro.component.html',
  styles: []
})
export class CadastroComponent implements OnInit {

  formCadastro = new FormGroup({
    nome: new FormControl(),
    username: new FormControl(),
    senha: new FormControl(),
    avatar: new FormControl(),
    telefone: new FormControl()
  });

  mensagemErro = "";

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  enviarCadastro(){
    const dadosForm = this.formCadastro.value;
    const cadastroDTO = new UserInputDTO(dadosForm);

    this.http
        .post("http://localhost:3200/users", cadastroDTO)
        .subscribe(
          (response) => {
            console.log(response);
          }
          ,(erro: HttpErrorResponse) => {
            console.log(erro.error.body[0].message);
            this.mensagemErro = erro.error.body[0].message;
          }
        )
  }

}
