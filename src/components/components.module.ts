import { NgModule } from '@angular/core';
import { CapacityGaugeComponent } from './capacity-gauge/capacity-gauge';
import { IonicModule } from 'ionic-angular';
import { FavoriteButtonComponent } from './favorite-button/favorite-button';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
	declarations: [CapacityGaugeComponent,
    FavoriteButtonComponent],
	imports: [IonicModule, IonicStorageModule],
	exports: [CapacityGaugeComponent,
    FavoriteButtonComponent]
})
export class ComponentsModule {}
