import { Component, OnInit, Input } from '@angular/core';
import {Flower} from '../flower';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {FloversService} from '../flovers.service';

@Component({
  selector: 'app-details-of-flower',
  templateUrl: './details-of-flower.component.html',
  styleUrls: ['./details-of-flower.component.css']
})
export class DetailsOfFlowerComponent implements OnInit {
  flower: Flower;
  constructor(private route: ActivatedRoute, private flowerService: FloversService, private location: Location) { }

  ngOnInit(): void {
    this.getFlower();
  }
  getFlower(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.flowerService.getFlower(id).subscribe(flower => this.flower = flower);
  }
  goBack(): void{
    this.location.back();
  }
  save(): void{
    this.flowerService.updateFlower(this.flower)
      .subscribe(() => this.goBack());
  }
}
