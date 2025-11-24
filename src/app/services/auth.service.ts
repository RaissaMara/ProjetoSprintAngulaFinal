import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:3001';

  const USER.KEY = 'auth-user'

  constructor(private http:HttpClient) { }

  login(usuario:Pick<Usuario, 'nome'|'senha'>):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.apiUrl}/login`,usuario);
  }

}
