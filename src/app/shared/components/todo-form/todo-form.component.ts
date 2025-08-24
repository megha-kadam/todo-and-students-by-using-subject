import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Itodo } from '../../models/todo.interface';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  isInEditMode : boolean = false;
  todoForm !: FormGroup;
  editTodo !:Itodo

  constructor(private todoService : TodoService,
            private snackbar : SnackbarService
  ) { }

  createTodoForm(){
    this.todoForm = new FormGroup({
      todoItem : new FormControl(null, Validators.required)
    })
  }

  onAddTodo(){
    if(this.todoForm.valid){
      let todoObj = this.todoForm.value;
      console.log(todoObj);
      this.todoForm.reset();
      
      this.todoService.createTodos(todoObj)
      .subscribe({
        next : data => {
          console.log(data);
          
          let newTodoObj : Itodo = {
            ...todoObj,
            todoId : data.name
          }
          console.log(newTodoObj);
          
          //this.todoService.newTodoSub$.next(newTodoObj)
          this.todoService.newTodoSubEmitter(newTodoObj)
        },
        error : err => console.log(err)
        
      })
    }
  }

  onUpdateTodo(){
    if(this.todoForm.valid){
      let updateTodoObj = {...this.todoForm.value, todoId : this.editTodo.todoId};
      console.log(updateTodoObj);
      
      this.todoService.updateTodo(updateTodoObj)
      .subscribe({
        next : todo => {
          let updateObj = updateTodoObj
          console.log(updateObj);

          this.todoForm.reset();
          this.isInEditMode = false;
          
          this.todoService.updateTodoSubEmitter$(updateObj)
          
          this.snackbar.openSnackbar(`Todo ${updateTodoObj.todoItem} updated successfully`)
        },
        error : err => this.snackbar.openSnackbar(err)
      })
    }
  }

  editTodoItem(){
    this.todoService.editTodoSubObs$
    .subscribe(res => {
      console.log(res);
      if(res){
        this.isInEditMode = true;
        this.editTodo = res;
        this.todoForm.patchValue(res)
      }
    })
  }

  ngOnInit(): void {
    this.createTodoForm();
    this.editTodoItem()
  }

}
