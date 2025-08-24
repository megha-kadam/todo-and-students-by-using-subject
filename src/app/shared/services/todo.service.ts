import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Itodo } from "../models/todo.interface";
import { observableToBeFn } from "rxjs/internal/testing/TestScheduler";

@Injectable({
    providedIn : 'root'
})
export class TodoService {
    userName$ : Observable<string> = new Subject<string>();

   private newTodoSub$ : Subject<Itodo> = new Subject<Itodo>();

   public newTodoSubObservable : Observable<Itodo> = this.newTodoSub$.asObservable();

   public newTodoSubEmitter(todo : Itodo){
    return this.newTodoSub$.next(todo)
   }

  private editTodoSub$ : Subject<Itodo> = new Subject<Itodo>();

  public editTodoSubObs$ : Observable<Itodo> = this.editTodoSub$.asObservable();

  public editTodoSubEmitter(todo : Itodo) {
    return this.editTodoSub$.next(todo)
   }

   private updateTodoSub$ : Subject<Itodo> = new Subject<Itodo>;

   public updateTodoSubObs$ : Observable<Itodo> = this.updateTodoSub$.asObservable();

   public updateTodoSubEmitter$(todo : Itodo){
    this.updateTodoSub$.next(todo)
   }

    baseURL = `${environment.url}`;
    todoURL = `${this.baseURL}/todos.json`;

    constructor(private http : HttpClient){}

    fetchAllTodos() : Observable<Array<Itodo>> {
    return this.http.get<Array<Itodo>>(this.todoURL)
                .pipe(
                    map(data => {
                        let todosArr : Array<Itodo> = [];
                        for(const key in data){
                            todosArr.push({...data[key], todoId : key})
                        }
                        return todosArr
                    })
                )
    }

    createTodos(todo : Itodo) : Observable<any>{
        return this.http.post(this.todoURL, todo)
    }

    updateTodo(todo : Itodo) : Observable<Itodo>{
        let updateURL = `${this.baseURL}/todos/${todo.todoId}.json`;
        return this.http.patch<Itodo>(updateURL, todo)
    }

    removeTodo(todo : Itodo){
        let removeURL  = `${this.baseURL}/todos/${todo.todoId}.json`;
        return this.http.delete(removeURL)
    }
}