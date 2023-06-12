import { Component, Input, OnInit, EventEmitter, Output  } from '@angular/core';
import { Menu } from 'src/app/core/entities/menu';
import { Router } from '@angular/router';
import { MenuDetailsService } from 'src/app/services/menu-details.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { DeleteMenu } from 'src/app/state/restaurant.state';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent implements OnInit {

  constructor(private menuService: MenuDetailsService, private route: Router, 
    private dialog: MatDialog, private store: Store) { }
  @Input() menu!: Menu;
  @Input() menuId!: number;
  @Output() onFunctionCall: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }

  openConfirmationDialog(menuId: number): void {
    const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: 'האם אתה בטוח רוצה למחוק את התפריט?' // Customize the message as per your requirement
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call the delete function here
        this.deleteMenu(menuId);
      }
    });

   
  }
 
 deleteMenu(menuId: number){
 this.menuService.deleteMenu(menuId).subscribe(res => {
      if(res === 400 || res === 403){
        alert('המחיקה נכשלה')
      }
      else{
        this.store.dispatch(new DeleteMenu(menuId));
        this.onFunctionCall.emit();
      }
    })
  }
  addDepartment(){
    this.route.navigate([`/departments-page/${this.menuId}`], {state: {name: this.menu.name}})
  }
  editDetails(){
    this.route.navigate([`/create-menu/${this.menuId}`])
  }
  }


