import { Component, Input, OnInit } from '@angular/core';
import { Department } from 'src/app/core/entities/menu';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-department-details-card',
  templateUrl: './department-details-card.component.html',
  styleUrls: ['./department-details-card.component.css']
})
export class DepartmentDetailsCardComponent implements OnInit {
  @Input() department!: Department
  @Input() departmentId!: number
  @Input() restId!: string
  image!: string
  constructor() { }

  ngOnInit(): void {
    this.image = environment.baseUrl + this.department.image!
  }

}
