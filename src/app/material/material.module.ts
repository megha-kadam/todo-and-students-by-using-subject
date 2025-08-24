import { NgModule } from "@angular/core";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';

const mat = [
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule
]

@NgModule({
    declarations : [],
    imports : [...mat],
    exports : [...mat]
})
export class MaterialModule{

}