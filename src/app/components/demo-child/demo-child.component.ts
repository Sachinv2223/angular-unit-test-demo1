import { Component, input } from '@angular/core';
import { signal, output, InputSignal } from '@angular/core';

@Component({
  selector: 'app-demo-child',
  standalone: true,
  imports: [],
  templateUrl: './demo-child.component.html',
  styleUrl: './demo-child.component.css'
})
export class DemoChildComponent {
  
  value = input<string>('');
  notify = output<string>();

  notifyParent() {
    this.notify.emit('Hello from child!');
  }
}
