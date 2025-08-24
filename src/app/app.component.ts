import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { TodoService } from './shared/services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'subject';

  constructor(){}

  private todoService = inject(TodoService);

  // @ViewChild('userName') userName !: ElementRef;

  // onSearchUser(){
  //  let userNameValue = this.userName.nativeElement.value;
  //   console.log(userNameValue);
  //  this.userName.nativeElement.value = '';
  // }

  ngOnInit(): void {
 
  }

}
