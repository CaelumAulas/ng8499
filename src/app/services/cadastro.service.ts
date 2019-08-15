import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { UserInputDTO } from '../models/dto/user-input';
import { Observable } from 'rxjs';

@Injectable()
export class CadastroService {

  readonly url = environment.api+'users';

  constructor(private http: HttpClient){}

  cadastrar(dadosCadastro): Observable<Object> {
    const cadastroDTO = new UserInputDTO(dadosCadastro);
    return this.http.post(this.url,cadastroDTO)
  }

}
