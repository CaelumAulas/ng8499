import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cmail-list-item',
  templateUrl: './cmail-list-item.component.html',
  styleUrls: ['./cmail-list-item.component.css']
})
export class CmailListItemComponent implements OnInit {

  @Input() destinatario = '';
  @Input() assunto = '';
  @Input() conteudo = '';
  @Input() dataEnvio = '';
  @Output() clicouNaLixeira = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deletar(){
    this.clicouNaLixeira.emit();
  }

}
