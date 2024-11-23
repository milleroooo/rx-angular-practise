/**ANGULAR**/
import { Injectable } from '@angular/core';

/**DEPENDENCIES**/
import { EMPTY, Observable, of } from 'rxjs';

/**INTERNALS**/
import { BeverageDomain } from './beverages.entity';
import { Beverage } from '../state/beverage.model';

@Injectable({
  providedIn: 'root',
})
export class BeveragesInfrastructureService {
  beverages: BeverageDomain[] = [
    {
      id: 1,
      name: 'Coca-Cola',
      type: 'Soda',
      volumeInLiters: 1.5,
      isCarbonated: true,
    },
    {
      id: 2,
      name: 'Pepsi',
      type: 'Soda',
      volumeInLiters: 1,
      isCarbonated: true,
    },
    {
      id: 3,
      name: 'Orange Juice',
      type: 'Juice',
      volumeInLiters: 1,
      isCarbonated: false,
    },
    {
      id: 4,
      name: 'Mineral Water',
      type: 'Water',
      volumeInLiters: 0.5,
      isCarbonated: false,
    },
  ];

  findAll(): Observable<BeverageDomain[]> {
    return of(this.beverages);
  }

  add(beverage: Beverage): Observable<BeverageDomain[]> {
    const newId = this.beverages.length + 1;
    const newBeverage = { ...beverage, id: newId };

    this.beverages.push(newBeverage);

    return of(this.beverages);
  }

  findById(id: number): Observable<BeverageDomain> {
    const beverage = this.beverages.find(
      (beverage: Beverage) => beverage.id === id
    );

    return beverage ? of(beverage) : EMPTY;
  }

  update(beverage: Beverage, id: number): Observable<BeverageDomain[]> {
    const index = this.beverages.findIndex(
      (beverage: Beverage) => beverage.id === id
    );

    this.beverages[index] = { ...beverage };

    return of(this.beverages);
  }

  delete(id: number): Observable<BeverageDomain[]> {
    this.beverages = this.beverages.filter((f: Beverage) => f.id !== id);

    return of(this.beverages);
  }
}
