import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { PageDataService } from 'src/app/services/page-data.service';
import { EmailOutputDTO } from 'src/app/models/dto/email-output';

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

  constructor(private servico: EmailService, private pageData: PageDataService) { }

  ngOnInit() {
    this.listarEmails();
    this.pageData.atualizaTitulo('Caixa de Entrada');
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

  listaEmails: EmailOutputDTO[] = [];

  textoDigitadoFiltro = '';

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

  apagar(idEmail){
    this.servico
        .deletar(idEmail)
        .subscribe(
          (response) => {
            console.log(response);
            this.listarEmails();
          }
          ,erro => console.log(erro)
        )
  }

  listaFiltrada(){

    const filtro = this.textoDigitadoFiltro.toLowerCase();

    return this
            .listaEmails
            .filter((email) => {

                if(
                  email
                    .assunto
                    .toLowerCase()
                    .includes(filtro)
                ){
                  return email
                }

            })
  }

}
