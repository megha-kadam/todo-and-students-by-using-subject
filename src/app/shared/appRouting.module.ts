import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { StdDashboardComponent } from './components/std-dashboard/std-dashboard.component';
import { TodoDashboardComponent } from "./components/todo-dashboard/todo-dashboard.component";

const route : Routes = [
    {
        path : 'todos',
        component : TodoDashboardComponent,
        title : 'Todos'
    },
]

@NgModule({
    declarations : [],
    imports : [RouterModule.forRoot(route)],
    exports : [RouterModule]
})
export class AppRoutingModule{

}