import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import {Flower} from './flower';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FloversService {
  private flowersUrl = 'api/flowers';  // URL to web api
  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  getFlowers(): Observable<Flower[]>{
    return this.http.get<Flower[]>(this.flowersUrl).pipe(
      tap(() => this.log('fetched flowers')),
      // смотрит на наблюдаемые значения, что-то делает с этими значениями и передает их
      catchError(this.handleError<Flower[]>('getFlowers', []))
    );
  }

  getFlower(id: number): Observable<Flower>{
    const url = `${this.flowersUrl}/${id}`;
    console.log(url);
    return this.http.get<Flower>(url).pipe(
      tap(() => this.log(`fetched flower id = ${id}`)),
      catchError(this.handleError<Flower>(`getHero id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`FlowerService: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T){
    return(error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  updateFlower(flower: Flower): Observable<any>{
  return this.http.put(this.flowersUrl, flower, this.httpOptions).pipe(
    tap(() => this.log(`update flower id = ${flower.id}`))
  );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addFlower(flower: Flower): Observable<Flower>{
    return this.http.post<Flower>(this.flowersUrl, flower, this.httpOptions)
      .pipe(
        tap((newFlower: Flower) => this.log(`added flower w/ id=${newFlower.id}`)),
        catchError(this.handleError<Flower>('addFLower'))
      );
  }

  deleteFlower(id: number): Observable<Flower>{
    const url = `${this.flowersUrl}/${id}`;
    return this.http.delete<Flower>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted flower id = ${id}`)),
      catchError(this.handleError<Flower>('deleteFlower'))
    );
  }

  searchFlowers(term: string): Observable<Flower[]>{
    if (!term.trim()){
      return of ([]);
    }

    return this.http.get<Flower[]>(`${this.flowersUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found flowers matching "${term}"`) :
        this.log(`no flowers matching "${term}"`)),
      catchError(this.handleError<Flower[]>(`searchFlowers`, []))
    );
  }

}
