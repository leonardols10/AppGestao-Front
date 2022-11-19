import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Credenciais } from '../models/credenciais';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  //faz a requisição de login
  authenticate(creds: Credenciais){
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds,{
      observe: 'response',
      responseType: 'text'
    })
  }

  //salva o token jwt no localstorage
  successFulLogin(authToken: string){
    localStorage.setItem('token', authToken);
  }

  //confirma se existe o token e não está expirado
  isAuthenticated(){
    let token = localStorage.getItem('token')
    if(token != null){
      return !this.jwtService.isTokenExpired(token)
    }
    return false;
  }
  //limpa o localstorage do usuario
  logout(){
    localStorage.clear();
  }
}
