import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private filterText = new BehaviorSubject<string>('');
  filterText$ = this.filterText.asObservable();
  constructor() {}

  getSearchText() {
    return this.filterText.getValue();
  }

  setSearchText(value: string) {
    this.filterText.next(value);
  }

  updateSearchText(text: any) {
    this.filterText = text;
  }

  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.matDataTable.filter = filterValue;
  // }
}
