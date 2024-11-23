/**ANGULAR*/
import { Injectable } from '@angular/core';

/**DEPENDENCIES*/
import { rxActions } from '@rx-angular/state/actions';
import { rxState } from '@rx-angular/state';
import { map, switchMap } from 'rxjs';

/**INTERNALS*/
import { Cat, CatsState } from './cat.model';
import { CatsInfrastructureService } from '../data-access/cats-infrastructure.service';
import { mapDomainsToCats } from '../util/cat.mapper';

@Injectable({
  providedIn: 'root',
})
export class CatsFacadeService {
  readonly actions = rxActions<{
    findAll: void;
    create: { cat: Cat };
    update: { cat: Cat };
    delete: { id: number };
  }>();

  constructor(private readonly infrastructure: CatsInfrastructureService) {}

  private state = rxState<CatsState>(({ set, connect }) => {
    set({
      cats: [],
    });
    connect(
      'cats',
      this.actions.findAll$.pipe(
        switchMap(() =>
          this.infrastructure.findAll().pipe(map(mapDomainsToCats))
        )
      )
    );
    connect(
      'cats',
      this.actions.create$.pipe(
        switchMap(({ cat }) =>
          this.infrastructure.add(cat).pipe(map(mapDomainsToCats))
        )
      )
    );
    connect(
      'cats',
      this.actions.delete$.pipe(
        switchMap(({ id }) =>
          this.infrastructure.delete(id).pipe(map(mapDomainsToCats))
        )
      )
    );
    connect(
      'cats',
      this.actions.update$.pipe(
        switchMap(({ cat }) =>
          this.infrastructure.update(cat).pipe(map(mapDomainsToCats))
        )
      )
    );
  });

  cats$ = this.state.select('cats');
}
