import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cmail-caixa-de-entrada',
  templateUrl: './caixa-de-entrada.component.html'
})
export class CaixaDeEntradaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

    this.listaEmails.push(novoEmail)

    formEmail.resetForm();

  }

}
