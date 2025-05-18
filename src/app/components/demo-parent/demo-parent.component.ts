import { Component, model, signal } from '@angular/core';
import { DemoChildComponent } from '../demo-child/demo-child.component';

@Component({
  selector: 'app-demo-parent',
  standalone: true,
  imports: [DemoChildComponent],
  templateUrl: './demo-parent.component.html',
  styleUrl: './demo-parent.component.css'
})
export class DemoParentComponent {

  parentValue = 'Hello from parent!';
  messageFromChild = signal<string>('No message from child yet');
  userName = signal<string>('John Doe from parent');

  onChildNotify(msg: string) {
    this.messageFromChild.update(() => msg);
  }
}
