import { Component, Input, OnInit } from '@angular/core';
import { Department } from 'src/app/core/entities/menu';

@Component({
  selector: 'app-department-card',
  templateUrl: './department-card.component.html',
  styleUrls: ['./department-card.component.css']
})
export class DepartmentCardComponent implements OnInit {
  @Input() department!: Department;
  @Input() departmentId!: number;
  constructor() { }

  ngOnInit(): void {
  }

}