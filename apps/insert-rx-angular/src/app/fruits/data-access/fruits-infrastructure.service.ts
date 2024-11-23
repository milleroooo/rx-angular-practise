/**ANGULAR*/
import { Injectable } from '@angular/core';

/**DEPENDENCIES*/
import { Observable, of, throwError } from 'rxjs';

/**INTERNALS*/
import { FruitDomain } from './fruit.entity';
import { Fruit } from '../state/fruit.model';

@Injectable({
  providedIn: 'root'
})
export class FruitsInfrastructureService {
  fruits: FruitDomain[] = [
    { id: '1', name: 'Apple', color: 'Red', taste: 'Sour' },
    { id: '2', name: 'Banana', color: 'Yellow', taste: 'Sweet' },
    { id: '3', name: 'Pear', color: 'Green', taste: 'Sweet' },
  ];

  findAll(): Observable<FruitDomain[]> {
    return of(this.fruits);
  }

  findById(id: string): Observable<FruitDomain> {
    const fruit = this.fruits.find((f: Fruit) => f.id === id);
    if(!fruit) {
      return throwError(() => new Error(`Fruit not found`));
    }

    return of(fruit);
  }

  add(fruit: Fruit): Observable<FruitDomain[]> {
    const newFruit = { ...fruit, id: (this.fruits.length + 1).toString() };
    this.fruits.push(newFruit);
    return of(this.fruits);
  }

  update(fruit: Fruit): Observable<FruitDomain[]> {
    const index = this.fruits.findIndex((f: Fruit) => f.id === fruit.id);
    if (index === -1) {
      return throwError(() => new Error(`Fruit with id ${fruit.id} not found`));
    }
    this.fruits[index] = { ...fruit };

    return of(this.fruits);
  }

  delete(id: string): Observable<FruitDomain[]> {
    this.fruits = this.fruits.filter((f: Fruit) => f.id !== id);
    return of(this.fruits);
  }
}
