import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Department } from 'src/app/core/entities/menu';
import { MenuDetailsService } from 'src/app/services/menu-details.service';

@Component({
  selector: 'app-department-card',
  templateUrl: './department-card.component.html',
  styleUrls: ['./department-card.component.css']
})
export class DepartmentCardComponent implements OnInit {
  @Input() department!: Department;
  @Input() departmentId!: number;
  @Input() menuId!: string
  @Output() onFunctionCall: EventEmitter<any> = new EventEmitter<any>();
  constructor(private route: Router, private menuService: MenuDetailsService, 
    private dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  addItems(){
    this.route.navigate([`/items-page/${this.departmentId}`], { state: {name: this.department.name} });
  }
  openConfirmationDialog(): void {
    const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: 'האם אתה בטוח רוצה למחוק את התפריט?' // Customize the message as per your requirement
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call the delete function here
        this.deleteDepartment();
      }
    });

   
  }
  deleteDepartment(){
    this.menuService.deleteDepartment(this.departmentId).subscribe(res => {
      
      this.onFunctionCall.emit();
    })
  }
  editDetails(){
    this.route.navigate([`/edit-department/${this.menuId}/${this.departmentId}`])
  }
}