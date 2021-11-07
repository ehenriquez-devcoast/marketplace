import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { IndexComponent } from './routes/index/index.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { MarketplaceComponent } from './routes/marketplace/marketplace.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { LandComponent } from './routes/land/land.component';
import { ItemComponent } from './routes/item/item.component';
import { BundleComponent } from './routes/bundle/bundle.component';
import { DetailsComponent } from './routes/details/details.component';
import { RecentlyListedComponent } from './components/recently-listed/recently-listed.component';
import { RecentlySoldComponent } from './components/recently-sold/recently-sold.component';
import { LandDetailsComponent } from './routes/land-details/land-details.component';
import { ItemDetailsComponent } from './routes/item-details/item-details.component';
import { BundleDetailsComponent } from './routes/bundle-details/bundle-details.component';
import { InfoVolumeComponent } from './components/info-volume/info-volume.component';


@NgModule({
  declarations: [IndexComponent, DashboardComponent, MarketplaceComponent, ProfileComponent, LandComponent, ItemComponent, BundleComponent, DetailsComponent, RecentlyListedComponent, RecentlySoldComponent, LandDetailsComponent, ItemDetailsComponent, BundleDetailsComponent, InfoVolumeComponent],
  imports: [
    CommonModule,
    WebsiteRoutingModule
  ]
})
export class WebsiteModule { }
