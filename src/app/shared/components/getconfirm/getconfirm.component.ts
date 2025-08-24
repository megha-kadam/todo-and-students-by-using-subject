import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-getconfirm',
  templateUrl: './getconfirm.component.html',
  styleUrls: ['./getconfirm.component.scss']
})
export class GetconfirmComponent implements OnInit {
  msg !: string;

  constructor(private matDialog : MatDialogRef<GetconfirmComponent>,
            @Inject(MAT_DIALOG_DATA) getmsg : string
  ) { this.msg = getmsg}

  onClose(flag : boolean){
    this.matDialog.close(flag);
  }

  ngOnInit(): void {
  }

}
