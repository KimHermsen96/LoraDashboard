import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = 'http://192.168.1.44:3000/device/';
  private REST_API_MEASUREMENT = 'http://192.168.1.44:3000/measurement/select/';

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

  public sendInsertRequest(body) {
    console.log(this.REST_API_SERVER + 'insert');
    return this.httpClient.post(this.REST_API_SERVER + 'insert', body).pipe(retry(3), catchError(this.handleError));
  }

    public sendUpdateRequest(updateId, body) {
        console.log(this.REST_API_SERVER + 'update/' + updateId);
        return this.httpClient.put(this.REST_API_SERVER + 'update/' + updateId, body).pipe(retry(3), catchError(this.handleError));
    }

    public getAPIlink() {
        return this.REST_API_MEASUREMENT;
    }
}

export class MyService {
    myMethod$: Observable<any>;
    private myMethodSubject = new Subject<any>();
    myMethod2$: Observable<any>;
    private myMethod2Subject = new Subject<any>();

  constructor() {
    this.myMethod$ = this.myMethodSubject.asObservable();
    this.myMethod2$ = this.myMethod2Subject.asObservable();
  }

    myMethod(data) {
        console.log(data);
        // we can do stuff with data if we want
        this.myMethodSubject.next(data);
    }

    myMethod2(data) {
        console.log(data);
        // we can do stuff with data if we want
        this.myMethod2Subject.next(data);
    }
}
