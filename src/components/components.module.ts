import { NgModule } from '@angular/core';
import { CapacityGaugeComponent } from './capacity-gauge/capacity-gauge';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [CapacityGaugeComponent],
	imports: [IonicModule],
	exports: [CapacityGaugeComponent]
})
export class ComponentsModule {}
