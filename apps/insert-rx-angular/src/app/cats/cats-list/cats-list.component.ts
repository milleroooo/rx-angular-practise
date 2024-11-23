/**ANGULAR*/
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**DEPENDENCIES */
import { Observable, of } from 'rxjs';

/**INTERNALS*/
import { CatsFacadeService } from '../state/cats-facade.service';
import { Cat } from '../state/cat.model';

const TITLE = {
  list: 'My Cats',
  add: 'Add New Cat',
  update: 'Udate Cat',
};

const BUTTON = {
  delete: 'Delete',
  update: 'Update',
  submit: 'Submit',
};

const FORM_LABEL = {
  name: 'Name',
  age: 'Age',
  breed: 'Breed',
};

@Component({
  selector: 'app-cats-list',
  standalone: true,
  imports: [NgForOf, NgIf, AsyncPipe, ReactiveFormsModule],
  templateUrl: './cats-list.component.html',
  styleUrl: './cats-list.component.scss',
})
export class CatsListComponent implements OnInit {
  protected readonly title = TITLE;
  protected readonly button = BUTTON;
  protected readonly formLabel = FORM_LABEL;

  protected isEdit = false;

  protected catForm!: FormGroup;

  protected cats$: Observable<Cat[]> = of([]);

  constructor(
    private readonly catsFacadeService: CatsFacadeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllCats();
    this.initForm();
  }

  protected onSubmitClick(): void {
    if (this.catForm.valid) {
      if (this.isEdit) {
        this.updateCat();
      } else {
        this.addCat();
      }
    }
  }

  protected onDeleteClick(id: number): void {
    this.deleteCat(id);
  }

  protected onUpdateClick(updatedCat: Cat): void {
    this.isEdit = true;
    this.catForm.patchValue(updatedCat);
  }

  private getAllCats(): void {
    this.catsFacadeService.actions.findAll();
    this.cats$ = this.catsFacadeService.cats$;
  }

  private initForm(): void {
    this.catForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(0)]],
      breed: ['', [Validators.required]],
    });
  }

  private deleteCat(id: number): void {
    this.catsFacadeService.actions.delete({ id });
  }

  private addCat(): void {
    this.catsFacadeService.actions.create(this.getFormValue());
    this.catForm.reset();
  }

  private updateCat(): void {
    this.catsFacadeService.actions.update(this.getFormValue());
    this.catForm.reset();
    this.isEdit = false;
  }

  private getFormValue(): { cat: Cat } {
    return { cat: this.catForm.getRawValue() };
  }
}
