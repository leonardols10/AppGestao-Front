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

  findall(): Observable<colaborador[]>  {
    return this.http.get<colaborador[]>(`${API_CONFIG.baseUrl}/colaboradores`);
  }
}
