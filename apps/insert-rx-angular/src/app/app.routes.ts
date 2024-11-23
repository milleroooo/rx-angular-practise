/**ANGULAR*/
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'dairies',
    loadComponent: () =>
      import('./dairies/dairies-list/dairies-list.component').then(
        (mod) => mod.DairiesListComponent
      ),
  },
  {
    path: 'beverages',
    loadComponent: () =>
      import('./beverages/beverages-view/beverages-view.component').then(
        (mod) => mod.BeveragesViewComponent
      ),
  },
    path: 'cats',
    loadComponent: () =>
      import('./cats/cats-list/cats-list.component').then(
        (mod) => mod.CatsListComponent
      ),
  },
  {
    path: 'fruits',
    loadComponent: () => 
      import('./fruits/fruits-list/fruits-list.component').then(
        (mod) => mod.FruitsListComponent)
  }
];
