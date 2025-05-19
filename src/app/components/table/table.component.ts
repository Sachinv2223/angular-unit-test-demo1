import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, computed, input, Input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgIf, UpperCasePipe, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  // @Input() data: any[] = [];

  // input() signals are designed to reflect the value passed from the parent.
  // They are immutable in the child; you cannot change the parent's data from the child component.
  data = input.required<any[]>();
  // localData = signal<any[]>([]);
  // modify the data to add a new property called "ACTION" and its value as "copy"
  localData = computed<any[]>(() => this.data().map(row => ({ ...row, ACTION: 'copy' })));
  columns = computed<string[]>(() => this.localData().length ? Object.keys(this.localData()[0]) : []);

  // searchTerm: string = '';
  searchTerm = signal<string>('');
  // currentPage: number = 1;
  currentPage = signal<number>(1);
  // pageSize: number = 5;
  pageSize = signal<number>(5);

  // function to get the filtered data based on the search term
  // get filteredData(): any[] {
  //   if (!this.searchTerm()) return this.localData();
  //   const term = this.searchTerm().toLowerCase();
  //   return this.localData().filter(row =>
  //     this.columns().some(col =>
  //       String(row[col]).toLowerCase().includes(term)
  //     )
  //   );
  // }
  filteredData = computed(() => {
    if (!this.searchTerm()) return this.localData();
    const term = this.searchTerm().toLowerCase();
    return this.localData().filter(row =>
      this.columns().some(col =>
        String(row[col]).toLowerCase().includes(term)
      )
    );
  });

  // function to get the paginated data based on the current page and page size
  // get pagedData(): any[] {
  //   const start = (this.currentPage() - 1) * this.pageSize();
  //   return this.filteredData.slice(start, start + this.pageSize());
  // }
  pagedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredData().slice(start, start + this.pageSize());
  });

  // function to get the total number of pages based on the filtered data and page size
  // get totalPages(): number {
  //   return Math.ceil(this.filteredData.length / this.pageSize()) || 1;
  // }
  totalPages = computed(() => {
    return Math.ceil(this.filteredData().length / this.pageSize()) || 1;
  });

  // function to copy the row data to clipboard
  copyRow(selectedRow: any) {
    const selectedRowData = JSON.stringify(selectedRow, null, 2);
    navigator.clipboard.writeText(selectedRowData)
      .then(() => {
        console.log('Row data copied to clipboard:', selectedRowData);
      })
      .catch(err => {
        console.error('Failed to copy row data:', err);
      });
  }

  // function to go to a specific page
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    // this.currentPage = page;
    this.currentPage.update(current => page);
  }

  // when we click on the search button, we will set the search term to the input value and reset the current page to 1
  // this will trigger the filteredData and pagedData getters to update the data displayed in the table
  onSearch(term: string) {
    this.searchTerm.update(current => term);
    // this.currentPage = 1;
    this.currentPage.update(current => 1);
  }
}