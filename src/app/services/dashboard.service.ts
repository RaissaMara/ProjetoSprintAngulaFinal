import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private apiUrl = 'http://localhost:3001';
 
  constructor(private http:HttpClient) { }
 
  getVehicles(): Observable<any> {
      return this.http.get(`${this.apiUrl}/vehicles`);
    }
  
    getVehicleData(vin: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/vehicleData`, { vin });
    }
  
}


