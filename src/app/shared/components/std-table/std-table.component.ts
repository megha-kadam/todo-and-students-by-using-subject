import { Component, OnInit } from '@angular/core';
import { Istd } from '../../models/std.interface';
import { StdudentService } from '../../services/std.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';

@Component({
  selector: 'app-std-table',
  templateUrl: './std-table.component.html',
  styleUrls: ['./std-table.component.scss']
})
export class StdTableComponent implements OnInit {
  stdsArr : Array<Istd> = [];

  constructor(private stdService : StdudentService,
              private snackbar : SnackbarService,
            private matdialog : MatDialog) { }

    getAllStd(){
      this.stdService.fetchAllStd()
      .subscribe({
        next : data => {
          this.stdsArr = data

          this.stdService.newStdSubObs$
          .subscribe(res => {
            this.stdsArr.push(res)
          })
        },
        error : err => this.snackbar.openSnackbar(err.error.error)
      })
    }

    onEdit(std : Istd){
      this.stdService.editStdSubEmitter$(std)
    }

    onRemoveStd(std : Istd){
      let matConfig : MatDialogConfig = new MatDialogConfig()
      matConfig.data = `Are you sure, you want to remove ${std.fName} ${std.lName}`;
      matConfig.width = '400px';

      let matDialog = this.matdialog.open(GetconfirmComponent, matConfig);
      matDialog.afterClosed()
      .subscribe(res => {
        if(res){
          this.stdService.removeStd(std)
          .subscribe({
            next : res => {
              let getIndex = this.stdsArr.findIndex(s => std.stdId === s.stdId);
              this.stdsArr.splice(getIndex, 1);
            },
            error : err => this.snackbar.openSnackbar(err.error.error)
          })
        }
      })
    }

  ngOnInit(): void {
    this.getAllStd();

    this.stdService.updateStdSubObs$
    .subscribe(res => {
      let getIndex = this.stdsArr.findIndex(std => std.stdId === res.stdId);
      this.stdsArr[getIndex] = res;
    })
  }

}
