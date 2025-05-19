import { Component } from '@angular/core';
import { DemoParentComponent } from '../components/demo-parent/demo-parent.component';
import { TableComponent } from '../components/table/table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DemoParentComponent, TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  title = "Home";

  // Example for your parent component TypeScript file
  myData = [
    { id: 1, name: 'Alice', age: 28, email: 'alice@example.com' },
    { id: 2, name: 'Bob', age: 34, email: 'bob@example.com' },
    { id: 3, name: 'Charlie', age: 25, email: 'charlie@example.com' },
    { id: 4, name: 'David', age: 30, email: 'david@example.com' },
    { id: 5, name: 'Eve', age: 22, email: 'eve@example.com' },
    { id: 6, name: 'Frank', age: 29, email: 'frank@example.com' },
    { id: 7, name: 'Grace', age: 31, email: 'grace@example.com' },
  ];

}
