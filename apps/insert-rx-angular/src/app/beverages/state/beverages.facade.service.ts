/**ANGULAR**/
import { Injectable } from '@angular/core';

/**DEPENDENCIES**/
import { map, switchMap } from 'rxjs';

/**INTERNALS**/
import {
  mapDomainsToBeverages,
  mapDomainToBeverage,
} from '../util/beverage.mapper';
import { BeveragesInfrastructureService } from '../data-access/beverages.infrastructure.service';
import { Beverage, BeveragesState } from './beverage.model';
import { rxActions } from '@rx-angular/state/actions';
import { rxState } from '@rx-angular/state';

const BEVERAGES = 'beverages';
const BEVERAGE = 'beverage';

@Injectable({
  providedIn: 'root',
})
export class BeveragesFacadeService {
  readonly actions = rxActions<{
    findAll: void;
    findById: { id: number };
    add: { beverage: Beverage };
    update: { beverage: Beverage; id: number };
    delete: { id: number };
  }>();

  constructor(
    private readonly infrastructure: BeveragesInfrastructureService
  ) {}

  private state = rxState<BeveragesState>(({ set, connect }) => {
    set({
      beverages: [],
    });
    connect(
      BEVERAGES,
      this.actions.findAll$.pipe(
        switchMap(() =>
          this.infrastructure.findAll().pipe(map(mapDomainsToBeverages))
        )
      )
    );

    connect(
      BEVERAGE,
      this.actions.findById$.pipe(
        switchMap((action) =>
          this.infrastructure.findById(action.id).pipe(map(mapDomainToBeverage))
        )
      )
    );

    connect(
      BEVERAGES,
      this.actions.add$.pipe(
        switchMap((action) =>
          this.infrastructure
            .add(action.beverage)
            .pipe(map(mapDomainsToBeverages))
        )
      )
    );

    connect(
      BEVERAGES,
      this.actions.update$.pipe(
        switchMap((action) =>
          this.infrastructure
            .update(action.beverage, action.id)
            .pipe(map(mapDomainsToBeverages))
        )
      )
    );

    connect(
      BEVERAGES,
      this.actions.delete$.pipe(
        switchMap((action) =>
          this.infrastructure.delete(action.id).pipe(map(mapDomainsToBeverages))
        )
      )
    );
  });

  beverages$ = this.state.select(BEVERAGES);
  beverage$ = this.state.select(BEVERAGE);

  findAll(): void {
    this.actions.findAll();
  }

  findById(id: number): void {
    this.actions.findById({ id });
  }

  add(beverage: Beverage): void {
    this.actions.add({ beverage });
  }

  update(beverage: Beverage, id: number): void {
    this.actions.update({ beverage, id });
  }

  delete(id: number): void {
    this.actions.delete({ id });
  }
}
