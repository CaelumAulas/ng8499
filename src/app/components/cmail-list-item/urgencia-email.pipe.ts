import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urgencia'
})
export class UrgenciaEmailPipe implements PipeTransform{
  transform(destinatario: string){

    if(destinatario.includes('chefe')){
     return `[URGENTE] ${destinatario}`
    }

    return destinatario

  }
}
