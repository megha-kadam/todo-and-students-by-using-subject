import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StdudentService } from '../../services/std.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Istd } from '../../models/std.interface';

@Component({
  selector: 'app-std-form',
  templateUrl: './std-form.component.html',
  styleUrls: ['./std-form.component.scss']
})
export class StdFormComponent implements OnInit {
  stdForm !: FormGroup;
  isInEditMode : boolean = false;
  editStd !: Istd;

  constructor(private stdService : StdudentService,
            private snackbar : SnackbarService
  ) { }

  createStdForm(){
    this.stdForm = new FormGroup({
      fName : new FormControl(null, Validators.required),
      lName : new FormControl(null, Validators.required), 
      email : new FormControl(null, Validators.required),
      contact : new FormControl(null, Validators.required),
    })
  }

  onAddStd(){
    if(this.stdForm.valid){
      let stdObj = this.stdForm.value;
      console.log(stdObj);
      
      this.stdService.createStd(stdObj)
      .subscribe({
        next : data => {
          console.log(data);
          let newStdObj = {...stdObj, stdId : data.name};
          console.log(newStdObj);
          this.stdService.newStdSubEmitte(newStdObj)

          this.stdForm.reset()
          
          this.snackbar.openSnackbar(`New Student ${stdObj.fName} ${stdObj.lName} added successfully`)
        },
        error : err => this.snackbar.openSnackbar(err.error.error)
      })
    }
  }

  onUpdateStd(){
    if(this.stdForm.valid){
      let updateStd = this.stdForm.value;
      console.log(updateStd);
      
      this.stdService.updateStd(updateStd)
      .subscribe({
        next : data => {
          console.log(data);
          
          let updateObj = {...updateStd, stdId : this.editStd.stdId};
          console.log(updateObj);
          
          this.stdService.updateStdSubEmitter$(updateObj);
          this.stdForm.reset();
          this.isInEditMode = false;

          this.snackbar.openSnackbar(`Student ${updateObj.fName} ${updateObj.lName} updated successfully`)
        },
        error : err => this.snackbar.openSnackbar(err.error.error)
      })
    }
  }

  ngOnInit(): void {
    this.createStdForm()

    this.stdService.editStdSubObs$
    .subscribe(res => {
      this.editStd = res;
      this.isInEditMode = true;
      this.stdForm.patchValue(res);
    })
  }

}
