import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Itodo } from '../../models/todo.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todosArr : Array<Itodo> = [];

  constructor(private todoService : TodoService,
              private matdialog : MatDialog,
              private snackbar : SnackbarService
  ) { }

  getAllTodos(){
    this.todoService.fetchAllTodos()
    .subscribe({
      next : data => {
        console.log(data);
        this.todosArr = data
      },
      error : err => console.log(err)
      
    })
  }

  onRemoveTodo(todo : Itodo){
    let matConfig : MatDialogConfig = new MatDialogConfig();
    matConfig.data = `Are you sure, you want to remove this ${todo.todoItem}`;
    matConfig.width = '400px';

    let matDialog = this.matdialog.open(GetconfirmComponent, matConfig)
    matDialog.afterClosed()
    .subscribe(res => {
      if(res){
        this.todoService.removeTodo(todo)
        .subscribe({
          next : res => { 
            console.log(res);
            
            let getIndex = this.todosArr.findIndex(t => t.todoId === todo.todoId);
            this.todosArr.splice(getIndex, 1);

            this.snackbar.openSnackbar(`Todo ${todo.todoItem} removed successfully`)
          },
          error : err => this.snackbar.openSnackbar(err)
        })
      }
    })
  }

  onEditTodo(todo : Itodo){
    this.todoService.editTodoSubEmitter(todo)
  }

  ngOnInit(): void {
    this.getAllTodos();
    // this.todoService.newTodoSub$
    // .subscribe(res => {
    //   this.todosArr.push(res)
    // })
    this.todoService.newTodoSubObservable.subscribe(res => this.todosArr.push(res))

   this.todoService.updateTodoSubObs$
   .subscribe(updateObj => {
    let findIndex = this.todosArr.findIndex(todo => todo.todoId === updateObj.todoId);
    this.todosArr[findIndex] = updateObj
   })
  }

}
