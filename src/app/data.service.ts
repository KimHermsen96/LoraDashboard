import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = 'http://192.168.1.44:3000/devices/';
  private REST_API_MEASUREMENT = 'http://192.168.1.44:3000/measurements/';

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

  public sendGetRequest(query = null, measurement = 0) {
    if (query == null) {
      query = '';
    }
    if (measurement) {
        console.log(this.REST_API_MEASUREMENT + query);
        return this.httpClient.get(this.REST_API_MEASUREMENT + query).pipe(retry(3), catchError(this.handleError));
    } else {
        console.log(this.REST_API_SERVER + query);
        return this.httpClient.get(this.REST_API_SERVER + query).pipe(retry(3), catchError(this.handleError));
    }
  }

  public sendDeleteRequest(deleteId) {
    console.log(this.REST_API_SERVER + deleteId);
    return this.httpClient.delete(this.REST_API_SERVER + deleteId).pipe(retry(3), catchError(this.handleError));
  }

  public sendInsertRequest(body) {
    console.log(this.REST_API_SERVER);
    return this.httpClient.post(this.REST_API_SERVER, body).pipe(retry(3), catchError(this.handleError));
  }

    public sendUpdateRequest(updateId, body) {
        console.log(this.REST_API_SERVER + updateId);
        return this.httpClient.put(this.REST_API_SERVER + updateId, body).pipe(retry(3), catchError(this.handleError));
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
