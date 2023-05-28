import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuDetailsService } from 'src/app/services/menu-details.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {

  menuId!: string
  constructor(public fb: FormBuilder, private menuService: MenuDetailsService, private route: Router
    ,private routes: ActivatedRoute) { }
  departmentForm = this.fb.group({
    name:['']
  })
  formData: FormData = new FormData();
  ngOnInit(): void {
    this.menuId = this.routes.snapshot.paramMap.get('menuId')!;
  }
  addDepartment(){
    this.formData.append('name', this.departmentForm.controls['name'].value)
    this.formData.append('menuId', this.menuId)
    this.menuService.addDepartment(this.formData).subscribe(res => {
    })
  }
  onFileSelected(e: any) {
    this.formData.append('my', e.target.files[0])
  }
}
