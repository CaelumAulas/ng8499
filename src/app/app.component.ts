import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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

  enviarEmail(eventoSubmit: Event){
    eventoSubmit.preventDefault();

    const novoEmail = {
      destinatario: this.email.destinatario,
      assunto: this.email.assunto,
      conteudo: this.email.conteudo
    }

    this.listaEmails.push(novoEmail)

    this.email = {
      destinatario: '',
      assunto: '',
      conteudo: ''

    }
  }

}
