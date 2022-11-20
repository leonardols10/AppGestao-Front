import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { colaborador } from '../models/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<colaborador>{
    return this.http.get<colaborador>(`${API_CONFIG.baseUrl}/colaboradores/${id}`);
  }

  findall(): Observable<colaborador[]>  {
    return this.http.get<colaborador[]>(`${API_CONFIG.baseUrl}/colaboradores`);
  }

  create(colaborador: colaborador): Observable<colaborador> {
    return this.http.post<colaborador>(`${API_CONFIG.baseUrl}/colaboradores`, colaborador);
  }

  update(colaborador: colaborador): Observable<colaborador> {
    return this.http.put<colaborador>(`${API_CONFIG.baseUrl}/colaboradores/${colaborador.id}`, colaborador);
  }

  delete(id: any): Observable<colaborador> {
    return this.http.delete<colaborador>(`${API_CONFIG.baseUrl}/colaboradores/${id}`);
  }
}
