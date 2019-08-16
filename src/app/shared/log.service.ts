import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private httpClient: HttpClient) { }

  Log(source: string, payload: string): void {
    const data = { source, payload };
    this.httpClient.post(environment.logUrl, data).subscribe();
  }
}
