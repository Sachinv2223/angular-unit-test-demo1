import { Component } from '@angular/core';
import { DemoParentComponent } from '../components/demo-parent/demo-parent.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DemoParentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  title = "Home";

}
