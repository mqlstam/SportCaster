import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() onCircleClick = new EventEmitter<void>();

  triggerLogin() {
    this.onCircleClick.emit();
  }
}