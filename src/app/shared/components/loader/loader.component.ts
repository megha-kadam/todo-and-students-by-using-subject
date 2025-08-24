import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoading : boolean = false;

  constructor(private loader : LoaderService) { }

  ngOnInit(): void {
    this.loader.loaderObs$
    .subscribe(res => {
      console.log(res);
      this.isLoading = res
    })
  }

}
