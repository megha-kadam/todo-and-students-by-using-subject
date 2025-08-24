import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
    providedIn : 'root'
})
export class SnackbarService{
constructor(private matsnack : MatSnackBar){}

openSnackbar(msg : string){
   let matConfig : MatSnackBarConfig = {
    duration : 3000,
    horizontalPosition : 'left',
    verticalPosition : 'top'
   }
    this.matsnack.open(msg, 'Close', matConfig)
}
}