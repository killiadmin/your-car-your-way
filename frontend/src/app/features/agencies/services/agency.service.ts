import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { Agency } from '../interfaces/model/agency.model';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  private pathService = 'api/test';

  constructor(private httpClient: HttpClient) { }

  public getAgencies(): Observable<Agency[]> {
    return this.httpClient.get<Agency[]>(this.pathService + '/agencies');
  }
}
