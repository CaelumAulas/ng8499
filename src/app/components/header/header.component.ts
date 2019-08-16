import { Component, EventEmitter, Output } from '@angular/core';
import { PageDataService } from 'src/app/services/page-data.service';

@Component({
  selector: 'cmail-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', './header-search.css']
})
export class HeaderComponent {

    isMenuOpen = false;
    tituloHeader = '';
    @Output() enviaFiltro = new EventEmitter<string>();

    constructor(private pageService: PageDataService){
      this.pageService
          .titulo
          .subscribe(
              (novoTitulo) => {
                this.tituloHeader = novoTitulo;
            }
          )
    }

    exibeMenu(){
      this.isMenuOpen = !this.isMenuOpen;
    }

    handleFiltro(inputValue){
      this.enviaFiltro.emit(inputValue);
    }


}
