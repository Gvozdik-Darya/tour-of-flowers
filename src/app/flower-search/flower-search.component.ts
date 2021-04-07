import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Flower} from '../flower';
import {FloversService} from '../flovers.service';

@Component({
  selector: 'app-flower-search',
  templateUrl: './flower-search.component.html',
  styleUrls: ['./flower-search.component.css']
})
export class FlowerSearchComponent implements OnInit {
  flowers$: Observable<Flower[]>;
  private searchTerms = new Subject<string>();

  constructor(private flowerService: FloversService) { }
  // Вставляем поисковый запрос в наблюдаемый поток
  search(term: string): void{
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.flowers$ = this.searchTerms.pipe(
      // ждем 300 мс после каждого нажатия клавиши, прежде чем рассматривать термин
      debounceTime(300),
      // игнорировать новый термин, если он совпадает с предыдущим термином
      distinctUntilChanged(),
      // переключаемся на новый поиск, наблюдаемый при каждом изменении термина
      switchMap((term: string) => this.flowerService.searchFlowers(term)),
        );
  }

}
