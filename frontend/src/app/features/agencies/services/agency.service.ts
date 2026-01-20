import {Agencies} from '../interfaces/api/agencies.interface';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  private pathService = 'api/test';

  constructor(private httpClient: HttpClient) { }

  public getAgencies(): Observable<Agencies> {
    return this.httpClient.get<Agencies>(this.pathService + '/agencies');
  }
}
