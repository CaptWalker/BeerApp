import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BeerService {

  beerListUrl = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json';
  beerImageListUrl = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json';

  constructor(private http: HttpClient) { }

  getBeerList = () => {
    return this.http.get(this.beerListUrl).pipe(
      map(( response ) => response)
    );
  }

  getBeerImages = () => {
    return this.http.get(this.beerImageListUrl).pipe(
      map((response) => response)
    );
  }
}
