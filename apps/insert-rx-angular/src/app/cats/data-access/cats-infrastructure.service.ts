/**ANGULAR*/
import { Injectable } from '@angular/core';

/**DEPENDENCIES*/
import { Observable, of } from 'rxjs';

/**INTERNALS*/
import { Cat } from '../state/cat.model';
import { CatDomain } from './cat.entity';

@Injectable({
  providedIn: 'root',
})
export class CatsInfrastructureService {
  cats: Cat[] = [
    { id: 1, name: 'Gustaw', age: 5, breed: 'Ragdoll' },
    { id: 2, name: 'Czesio', age: 10, breed: 'Maine coon' },
    { id: 3, name: 'Glutek', age: 15, breed: 'Siberian' },
  ];

  index = this.cats.length;

  findAll(): Observable<CatDomain[]> {
    return of(this.cats);
  }

  delete(id: number): Observable<CatDomain[]> {
    this.cats = this.cats.filter((c: Cat) => c.id !== id);
    return of(this.cats);
  }

  add(cat: Cat): Observable<CatDomain[]> {
    this.index += 1;
    this.cats.push({ ...cat, id: this.index });
    return of(this.cats);
  }

  update(cat: Cat): Observable<CatDomain[]> {
    const index = this.cats.findIndex((c: Cat) => c.id === cat.id);
    this.cats[index] = cat;
    return of(this.cats);
  }
}
