import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() text = '';
  @Input() buttonText = '';
  @Output() newItemEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
  open(){
    this.newItemEvent.emit(true);
  }
}
