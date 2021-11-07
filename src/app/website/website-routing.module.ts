import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandDetailsComponent } from './routes/land-details/land-details.component';
import { ItemDetailsComponent } from './routes/item-details/item-details.component';
import { BundleDetailsComponent } from './routes/bundle-details/bundle-details.component';

import { LandComponent } from './routes/land/land.component';
import { ItemComponent } from './routes/item/item.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { BundleComponent } from './routes/bundle/bundle.component';
import { DetailsComponent } from './routes/details/details.component';
import { MarketplaceComponent } from './routes/marketplace/marketplace.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { IndexComponent } from './routes/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'marketplace',
        component: MarketplaceComponent,
      },
      {
        path: 'marketplace/:id',
        component: DetailsComponent,
      },
      {
        path: 'bundle',
        component: BundleComponent,
      },
      {
        path: 'bundle/:id',
        component: BundleDetailsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'item',
        component: ItemComponent,
      },
      {
        path: 'item/:id',
        component: ItemDetailsComponent,
      },
      {
        path: 'land',
        component: LandComponent,
      },
      {
        path: 'land/:id',
        component: LandDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}
