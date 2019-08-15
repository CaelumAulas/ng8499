import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable()
export class LoginService {

  readonly url = environment.api+'login';

  constructor(private http: HttpClient){}

  autenticar(login: LoginInputDTO): Observable<{}> {
    return this.http
                .post<LoginOutputDTO>(this.url,login)
                .pipe(
                  map(response => {
                    localStorage.setItem('cmail-token', response.token)
                    return {};
                  })
                )
  }

}
