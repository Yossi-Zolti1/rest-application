import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/core/entities/menu';

@Component({
  selector: 'app-department-card',
  templateUrl: './department-card.component.html',
  styleUrls: ['./department-card.component.css']
})
export class DepartmentCardComponent implements OnInit {
  @Input() department!: Department;
  @Input() departmentId!: number;
  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  addItems(){
    this.route.navigate([`/items-page/${this.departmentId}`], { state: {name: this.department.name} });
  }
}