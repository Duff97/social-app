import { Component, Injectable, signal, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  displayedComponent = signal<Type<Component> | null>(null)

  display(c : Type<Component>) {
    this.displayedComponent.set(c)
  }

  hide(){
    this.displayedComponent.set(null)
  }
}
