export class EmailInputDTO {

    to = '';
    subject = '';
    content = '';

    created_at = '';
    from = '';
    id = '';

    constructor({destinatario, assunto, conteudo}){
      this.to = destinatario;
      this.subject = assunto;
      this.content = conteudo;
    }

}
