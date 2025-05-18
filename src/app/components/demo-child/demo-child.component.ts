import { Component, input, model } from '@angular/core';
import { output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo-child',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './demo-child.component.html',
  styleUrls: ['./demo-child.component.css']
})
export class DemoChildComponent {

  // Optional input with default value
  // value = input<string>('');

  // Required input, must be set by parent
  value = input.required<string>();

  // output signal to notify parent
  notify = output<string>();

  userName = model<string>('John Doe from child');

  notifyParent() {
    this.notify.emit('Hello from child!');
  }
}
