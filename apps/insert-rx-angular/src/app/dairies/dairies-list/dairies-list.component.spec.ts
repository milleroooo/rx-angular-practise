import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DairiesListComponent } from './dairies-list.component';

describe('DairiesListComponent', () => {
  let component: DairiesListComponent;
  let fixture: ComponentFixture<DairiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DairiesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DairiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
