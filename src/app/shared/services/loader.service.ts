import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class LoaderService{

    loader$ : Subject<boolean> = new Subject<boolean>();

    loaderObs$ : Observable<boolean> = this.loader$.asObservable();

    loaderEmitter(flag : boolean){
        this.loader$.next(flag)
    }
}