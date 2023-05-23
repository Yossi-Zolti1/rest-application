import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuDetailsService } from 'src/app/services/menu-details.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {

  constructor(public fb: FormBuilder, private menuService: MenuDetailsService, private route: Router) { }
  departmentForm = this.fb.group({
    name:[''],
    image:['']
  })
  ngOnInit(): void {
  }
  addDepartment(){
    
  }
}
