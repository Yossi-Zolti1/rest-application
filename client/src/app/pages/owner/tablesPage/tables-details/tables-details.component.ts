import { Component } from '@angular/core';

@Component({
  selector: 'app-tables-details',
  templateUrl: './tables-details.component.html',
  styleUrls: ['./tables-details.component.css']
})
export class TablesDetailsComponent {
  items: { text: number, position: { x: number, y: number } }[] = [];

  tableNumber: number = 1;
  createNewItem() {
    const newItem = {
      text: this.tableNumber++,
      position: { x: 0, y: 0 } // Initial position
    };
    this.items.push(newItem);
  }

  updateItemPosition(item: any, event: any) {
    console.log(item.position);
    item.position = { x: event.source._dragRef._passiveTransform.x, y: event.source._dragRef._passiveTransform.y };
  }
}

