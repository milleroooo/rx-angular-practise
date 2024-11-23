/**ANGULAR**/
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**DEPENDENCIES**/
import { Observable, of } from 'rxjs';

/**INTERNALS**/
import { Beverage } from '../state/beverage.model';
import { BeveragesFacadeService } from '../state/beverages.facade.service';

const MOCK_INIT_DATA = {
  id: 0,
  name: '',
  type: '',
  volumeInLiters: 0.5,
  isCarbonated: true,
};

@Component({
  selector: 'app-beverages-view',
  standalone: true,
  imports: [CommonModule, NgForOf, AsyncPipe, FormsModule],
  templateUrl: './beverages-view.component.html',
  styleUrl: './beverages-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeveragesViewComponent implements OnInit {
  protected beverage = MOCK_INIT_DATA;
  protected isEditMode = false;

  protected beverages$: Observable<Beverage[]> = of([]);
  protected beverage$: Observable<Beverage | undefined> = new Observable<
    Beverage | undefined
  >();

  constructor(private readonly facade: BeveragesFacadeService) {}

  ngOnInit(): void {
    this.facade.actions.findAll();
    this.beverages$ = this.facade.beverages$;
  }

  onSelectBeverage(beverage: Beverage): void {
    this.beverage.name = beverage.name;
    this.beverage.type = beverage.type;
    this.beverage.volumeInLiters = beverage.volumeInLiters;
    this.beverage.isCarbonated = beverage.isCarbonated;
    this.beverage.id = beverage.id;

    this.isEditMode = true;
  }

  onDeleteBeverage(beverage: Beverage): void {
    this.facade.delete(beverage.id);
  }

  onSave() {
    const body = {
      name: this.beverage.name,
      type: this.beverage.type,
      volumeInLiters: this.beverage.volumeInLiters,
      isCarbonated: this.beverage.isCarbonated,
    } as Beverage;

    if (this.isEditMode) {
      this.facade.update(body, this.beverage.id);
    } else {
      this.facade.add(body);
    }

    this.isEditMode = false;
  }
}
