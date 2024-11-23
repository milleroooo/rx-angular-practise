/**ANGULAR*/
import { Injectable } from '@angular/core';

/**DEPENDENCIES*/
import { rxActions } from '@rx-angular/state/actions';
import { rxState } from '@rx-angular/state';
import { catchError, map, switchMap, of } from 'rxjs';

/**INTERNALS*/
import { Fruit, FruitsState } from './fruit.model';
import { FruitsInfrastructureService } from '../data-access/fruits-infrastructure.service';
import { clearFruit, mapDomainsToFruits, mapDomainToFruit } from '../util/fruit.mapper';

@Injectable({
  providedIn: 'root'
})
export class FruitsFacadeService {
  readonly actions = rxActions<{
    findAll: void;
    findById: { id: string };
    update: { fruit: Fruit };
    delete: { id: string };
    add: { fruit: Fruit };
  }>();

  constructor(private readonly infrastructure: FruitsInfrastructureService) {}

  private state = rxState<FruitsState>(({ set, connect }) => {
    set({
      fruits: [],
      fruit: clearFruit(),
    });

    connect(
      'fruits',
      this.actions.findAll$.pipe(
        switchMap(() =>
          this.infrastructure.findAll()
            .pipe(map(mapDomainsToFruits))
        )
      )
    );

    connect(
      'fruit',
      this.actions.findById$.pipe(
        switchMap(action =>
          this.infrastructure.findById(action.id).pipe(map(mapDomainToFruit),
            catchError(() => {
              this.state.set({ fruit: clearFruit() });
              return of();
          }))
        )
      )
    );

    connect(
      'fruits',
      this.actions.add$.pipe(
        switchMap(action =>
          this.infrastructure.add(action.fruit).pipe(map(mapDomainsToFruits))
        )
      )
    );

    connect(
      'fruits',
      this.actions.update$.pipe(
        switchMap(action =>
          this.infrastructure.update(action.fruit).pipe(map(mapDomainsToFruits))
        )
      )
    );

    connect(
      'fruits',
      this.actions.delete$.pipe(
        switchMap(action =>
          this.infrastructure.delete(action.id).pipe(map(mapDomainsToFruits))
        )
      )
    );
  });

  fruits$ = this.state.select('fruits');
  fruit$ = this.state.select('fruit');

  findAll(): void {
    this.actions.findAll();
  }

  findById(id: string): void {
    this.actions.findById({ id });
  }

  addFruit(fruit: Fruit): void {
    this.actions.add({ fruit });
  }

  updateFruit(fruit: Fruit): void {
    this.actions.update({ fruit });
  }

  deleteFruit(id: string): void {
    this.actions.delete({ id });
  }
}
