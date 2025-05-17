import { Component, input } from '@angular/core';
import { signal, output, InputSignal } from '@angular/core';

@Component({
  selector: 'app-demo-child',
  standalone: true,
  imports: [],
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

  notifyParent() {
    this.notify.emit('Hello from child!');
  }
}
