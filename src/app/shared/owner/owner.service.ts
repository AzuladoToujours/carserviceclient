import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  public API = '//thawing-chamber-47973.herokuapp.com';
  public OWNER_API = this.API + '/owners';
  public API_SEARCH = this.OWNER_API + '/search/findByDni?dni='

  constructor(private http: HttpClient) { 
}

getAll(): Observable<Array<any>> {
  
  return this.http.get(this.API + '/owners')
  .pipe(map((data:any) => {
    return data._embedded.owners;
  }))
}

get(dni: string){
    return this.http.get(this.API_SEARCH + dni)
    .pipe(map((data:any) => {
       return data._embedded.owners
    }))
  }

save(owner: any): Observable<any> {
  let result: Observable<Object>;
  if (owner['href']) {
    result = this.http.put(owner.href, owner);
  } else {
    result = this.http.post(this.OWNER_API, owner);
  }
  return result;
}

remove(href: string) {
  return this.http.delete(href);
}

}
