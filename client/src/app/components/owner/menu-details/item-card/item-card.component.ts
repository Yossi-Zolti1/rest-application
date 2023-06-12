import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConfirmationDialogComponent } from 'src/app/components/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Item } from 'src/app/core/entities/menu';
import { MenuDetailsService } from 'src/app/services/menu-details.service';
import { DeleteItem } from 'src/app/state/restaurant.state';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() item!: Item;
  @Input() itemId!: number;
  @Input() departmentId!: string;
  @Output() onFunctionCall: EventEmitter<any> = new EventEmitter<any>();
  constructor(private menuService: MenuDetailsService, 
    private dialog: MatDialog, private route: Router, private store: Store) { }

  ngOnInit(): void {
  }
  openConfirmationDialog(): void {
    const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: 'האם אתה בטוח רוצה למחוק את המנה?' // Customize the message as per your requirement
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call the delete function here
        this.deleteItem();
      }
    });

   
  }
  deleteItem(){
    this.menuService.deleteItem(this.itemId).subscribe(res => {
      this.store.dispatch(new DeleteItem(this.itemId));
      this.onFunctionCall.emit();
    })
  }
  editDetails(){
    this.route.navigate([`/edit-item/${this.itemId}/${this.departmentId}`])
  }
}
