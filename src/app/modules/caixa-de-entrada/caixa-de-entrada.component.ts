import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'cmail-caixa-de-entrada',
  templateUrl: './caixa-de-entrada.component.html',
  styles: [`
    ul,li {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }
  `]
})
export class CaixaDeEntradaComponent implements OnInit {

  constructor(private servico: EmailService) { }

  ngOnInit() {
    this.listarEmails();
  }

  listarEmails (){
    this.servico
        .listar()
        .subscribe(
          (listaEmailsPt) => {
            console.log(listaEmailsPt);
            this.listaEmails = listaEmailsPt.reverse();
          },
          erro => console.log(erro)
        )
  }

  private _isEmailFormOpen = false;

  listaEmails = [];

  email = {
    destinatario: '',
    assunto: '',
    conteudo: ''
  }

  get isEmailFormOpen() {
    return this._isEmailFormOpen;
  }

  toggleEmailForm() {
    this._isEmailFormOpen = !this.isEmailFormOpen;
  }

  enviarEmail(formEmail: NgForm){

    if(formEmail.invalid){
      /* formEmail.controls['para'].markAsTouched();
      formEmail.controls['assunto'].markAsTouched(); */

      formEmail.control.markAllAsTouched();

      return
    }

    const novoEmail = {
      destinatario: this.email.destinatario,
      assunto: this.email.assunto,
      conteudo: this.email.conteudo
    }

    this.servico
          .enviar(novoEmail)
          .subscribe(
            () => {
              this.listarEmails();
              formEmail.resetForm();
            }
            ,erro => console.log(erro)
          )

  }

}
