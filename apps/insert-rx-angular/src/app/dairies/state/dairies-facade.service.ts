/**ANGULAR*/
import { Injectable } from '@angular/core';

/**DEPENDENCIES*/
import { rxActions } from '@rx-angular/state/actions';
import { rxState } from '@rx-angular/state';
import { map, switchMap } from 'rxjs';

/**INTERNALS*/
import { mapDomainsToDairies } from '../util/dairy.mapper';
import { DairiesState, Dairy } from './dairy.model';
import { DairiesInfrastructureService } from '../data-access/dairies-infrastructure.service';

@Injectable({
  providedIn: 'root'
})
export class DairiesFacadeService {
  readonly actions = rxActions<{
    findAll: void;
    findById: { id: string };
    update: { dairy: Dairy };
    delete: { id: string }
  }>();

  constructor(private readonly infrastructure: DairiesInfrastructureService) {}

  private state = rxState<DairiesState>(({ set, connect }) => {
    set({
      dairies: []
    });
    connect(
      'dairies',
      this.actions.findAll$.pipe(
        switchMap(() =>
          this.infrastructure.findAll()
            .pipe(map(mapDomainsToDairies))
        )
      )
    )
  }
)

  dairies$ = this.state.select('dairies');
}
