import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = 'http://localhost:3000/device/';

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest(query = null) {
    if (query == null) {
      query = 'all';
    }
    console.log(this.REST_API_SERVER + query);
    return this.httpClient.get(this.REST_API_SERVER + query).pipe(retry(3), catchError(this.handleError));
  }

  public sendDeleteRequest(deleteId) {
    console.log(this.REST_API_SERVER + 'delete/' + deleteId);
    return this.httpClient.delete(this.REST_API_SERVER + 'delete/' + deleteId).pipe(retry(3), catchError(this.handleError));
  }
}

export class MyService {
  myMethod$: Observable<any>;
  private myMethodSubject = new Subject<any>();

  constructor() {
    this.myMethod$ = this.myMethodSubject.asObservable();
  }

  myMethod(data) {
    console.log(data);
    // we can do stuff with data if we want
    this.myMethodSubject.next(data);
  }
}
