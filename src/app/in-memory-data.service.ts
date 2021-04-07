import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Flower} from './flower';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {
    createDb(){
    const flowers = [
      {id: 1, name: 'rosa', color: 'red'},
      {id: 2, name: 'lilia', color: 'yellow'},
      {id: 3, name: 'tulip', color: 'blue'},
      {id: 4, name: 'chamomile', color: 'white'}
    ];
    return {flowers};
  }

  getId(flowers: Flower[]): number{
    return flowers.length > 0 ? Math.max(...flowers.map(flower => flower.id)) + 1 : 1;
  }
}
