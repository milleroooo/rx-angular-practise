/**ANGULAR*/
import { Injectable } from '@angular/core';

/**DEPENDENCIES*/
import { Observable, of } from 'rxjs';

/**INTERNALS*/
import { DairyDomain } from './dairy.entity';

@Injectable({
  providedIn: 'root'
})
export class DairiesInfrastructureService {
  dairies: DairyDomain[] = [
    { id: '1', name: 'Cheddar', type: 'Cheese', fatContent: 33 },
    { id: '2', name: 'Whole Milk', type: 'Milk', fatContent: 3.25 },
    { id: '3', name: 'Yogurt', type: 'Yogurt', fatContent: 4 },
  ];

  findAll(): Observable<DairyDomain[]> {
    return of(this.dairies);
  }
}
