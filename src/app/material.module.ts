import { NgModule } from '@angular/core';
import { MatToolbarModule,
         MatIconModule,
         MatCardModule,
         MatButtonModule,
         MatInputModule,
         MatOptionModule,
         MatSelectModule,
         MatProgressSpinnerModule,
         MatMenuModule,
         MatGridListModule,
         MatListModule,
         MatDialogModule
        } from '@angular/material';

const modules = [
   MatToolbarModule,
   MatIconModule,
   MatCardModule,
   MatButtonModule,
   MatInputModule,
   MatOptionModule,
   MatSelectModule,
   MatProgressSpinnerModule,
   MatMenuModule,
   MatGridListModule,
   MatListModule,
   MatDialogModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule { }
