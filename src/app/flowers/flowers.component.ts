import { Component, OnInit } from '@angular/core';
import {Flower} from '../flower';
import {FloversService} from '../flovers.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-flowers',
  templateUrl: './flowers.component.html',
  styleUrls: ['./flowers.component.css']
})
export class FlowersComponent implements OnInit {
  flowers: Flower[] = [];
  constructor(private flowerService: FloversService) { }

  ngOnInit(): void {
    this.getFlowers();
  }
  getFlowers(): void{
    this.flowerService.getFlowers().subscribe(flowers => this.flowers = flowers);
  }
  add(name: string, color: string): void{
    name = name.trim();
    color = color.trim();
    if (!name && !color){return; }
    this.flowerService.addFlower({name, color} as Flower)
      .subscribe(flower => this.flowers.push(flower));
  }
  delete(flower: Flower): void {
    this.flowers = this.flowers.filter(h => h !== flower);
    this.flowerService.deleteFlower(flower.id).subscribe();
  }

}
