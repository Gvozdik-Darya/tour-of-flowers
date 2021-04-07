import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {Flower} from '../flower';
import {FloversService} from '../flovers.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  flowers: Flower[] = [];
  constructor(private flowerService: FloversService) { }

  ngOnInit(): void {
    this.getFlowers();
  }
  getFlowers():void{
    this.flowerService.getFlowers().subscribe(flowers=>this.flowers = flowers.slice(1,3))
  }

}
