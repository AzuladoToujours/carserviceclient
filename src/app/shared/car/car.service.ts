import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CarService {
  public API = '//thawing-chamber-47973.herokuapp.com';
  public CAR_API = this.API + '/cars';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/cool-cars');
  }

  get(id: string) {
    return this.http.get(this.CAR_API + '/' + id);
  }

  save(car: any): Observable<any> {
    let result: Observable<Object>;
    if (car['href']) {
      result = this.http.put(car.href, car);
    } else {
      result = this.http.post(this.CAR_API, car);
    }
    return result;
  }

  saveWithoutOwner(car:any) : Observable<any> {
    return this.http.put(car.href, car);
  }

  remove(href: string) {
    return this.http.delete(href);
  }

 
  removeOwners(owners: Array<String>){
    this.getAll().subscribe(cars => {
      cars.forEach(car => {
        owners.forEach(owner => {
          if (car.ownerDni == owner){
           const newCar = {
             href : `https:${this.CAR_API}/${car.id}`,
             name : `${car.name}`,
             ownerDni : null
           }
           this.saveWithoutOwner(newCar).subscribe();
          }
        })
      });
    })
   
  }

  
  
}
