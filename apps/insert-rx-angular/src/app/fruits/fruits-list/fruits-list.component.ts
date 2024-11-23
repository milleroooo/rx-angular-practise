/**ANGULAR*/
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**DEPENDENCIES*/
import { Observable, of } from 'rxjs';

/**INTERNALS*/
import { Fruit } from '../state/fruit.model';
import { FruitsFacadeService } from '../state/fruits-facade.service';

@Component({
  selector: 'app-fruits-list',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './fruits-list.component.html',
  styleUrl: './fruits-list.component.css'
})
export class FruitsListComponent implements OnInit {
  isEdit = false;
  selectedId = '-1';

  fruitForm!: FormGroup;

  fruits$: Observable<Fruit[]> = of([]);
  fruit$: Observable<Fruit | undefined> = new Observable<Fruit | undefined>();

  constructor(private readonly facade: FruitsFacadeService) {}

  ngOnInit(): void {
    this.initForm();
    this.findAllFruits();
    this.fruits$ = this.facade.fruits$;
  }

  findAllFruits(): void {
    this.facade.findAll();
  }

  findFruitById(): void {
    this.facade.findById(this.selectedId);
    this.fruit$ = this.facade.fruit$;
  }

  addFruit(fruit: Fruit): void {
    this.facade.addFruit(fruit);
  }

  updateFruit(fruit: Fruit): void {
    this.facade.updateFruit(fruit);
  }

  deleteFruit(id: string): void {
    this.facade.deleteFruit(id);
  }

  initForm(): void {
    this.fruitForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      taste: new FormControl('', Validators.required)
    });
  }

  changeToAddFruit(): void {
    this.isEdit = false;
    this.resetForm();
  }

  changeToUpdateFruit(fruit: Fruit): void {
    this.isEdit = true;
    this.fruitForm.patchValue(fruit);
  }

  onSubmit(): void {
    if(this.fruitForm.valid) {
      this.addOrUpdateFruit();
      this.resetForm();
    }
  }

  addOrUpdateFruit(): void {
    const fruit = this.mapFormToFruit();
    if (this.isEdit) {
      this.updateFruit(fruit);
    } else {
      this.addFruit(fruit);
    }
  }

  resetForm(): void {
    this.fruitForm.reset();
  }

  mapFormToFruit(): Fruit {
    return {
      id: this.fruitForm.get('id')?.value,
      name: this.fruitForm.get('name')?.value,
      color: this.fruitForm.get('color')?.value,
      taste: this.fruitForm.get('taste')?.value
    } as Fruit;
  }
}
