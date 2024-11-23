/**ANGULAR*/
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';

/**INTERNALS*/
import { DairiesFacadeService } from '../state/dairies-facade.service';
import { Observable, of } from 'rxjs';
import { Dairy } from '../state/dairy.model';

@Component({
  selector: 'app-dairies-list',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './dairies-list.component.html',
  styleUrl: './dairies-list.component.css'
})
export class DairiesListComponent implements OnInit{
  dairies$: Observable<Dairy[]> = of([]);
  constructor(private readonly facade: DairiesFacadeService) {}

  ngOnInit(): void {
    this.facade.actions.findAll();
    this.dairies$ = this.facade.dairies$;
  }
}
