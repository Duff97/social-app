import { Component, inject } from '@angular/core';
import { PopupService } from '../../services/popup/popup.service';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  popupService = inject(PopupService)

  getComponent() {
    return this.popupService.displayedComponent()
  }

  close(){
    this.popupService.hide()
  }
}
