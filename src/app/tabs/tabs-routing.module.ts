import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './tabs.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'rent',
        loadChildren: () => import('../rent/rent.module').then(m => m.RentPageModule)
      },
      {
        path: 'buy',
        loadChildren: () => import('../buy/buy.module').then(m => m.BuyPageModule)
      },
      {
        path: 'favourites',
        loadChildren: () => import('../favourites/favourites.module').then(m => m.FavouritesPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/rent',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/rent',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {} 