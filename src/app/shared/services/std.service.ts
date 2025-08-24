import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Istd } from "../models/std.interface";
import { map, Observable, Subject } from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class StdudentService{
    newStdSub$ : Subject<Istd> = new Subject<Istd>();
    newStdSubObs$ : Observable<Istd> = this.newStdSub$.asObservable();
    newStdSubEmitte(std : Istd){
        this.newStdSub$.next(std)
    }

    editStdSub$ : Subject<Istd> = new Subject<Istd>();
    editStdSubObs$ : Observable<Istd> = this.editStdSub$.asObservable();
    editStdSubEmitter$(std : Istd){
        this.editStdSub$.next(std)
    }

     updateStdSub$ : Subject<Istd> = new Subject<Istd>();
    updateStdSubObs$ : Observable<Istd> = this.updateStdSub$.asObservable();
    updateStdSubEmitter$(std : Istd){
        this.updateStdSub$.next(std)
    }


    baseURL = `${environment.url}`;
    stdURL = `${this.baseURL}/students.json`;

    constructor(private http : HttpClient){}

    fetchAllStd() : Observable<Array<Istd>>{
        return this.http.get<Istd[]>(this.stdURL)
                .pipe(
                    map(std => {
                        let arr : Array<Istd> = [];
                        for (const key in std) {
                            arr.push({...std[key], stdId : key})
                        }
                        return arr
                    })
                )
    }

    createStd(std : Istd) : Observable<any>{
        return this.http.post<any>(this.stdURL, std)
    }

    updateStd(std : Istd){
        let updateURL = `${this.baseURL}/students/${std.stdId}.json`;
        return this.http.patch(updateURL, std)
    }

    removeStd(std : Istd){
        let removeURL = `${this.baseURL}/students/${std.stdId}.json`
        return this.http.delete(removeURL)
    };

}