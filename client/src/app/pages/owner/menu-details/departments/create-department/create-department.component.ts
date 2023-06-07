import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuDetailsService } from 'src/app/services/menu-details.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {

  menuId!: string
  departmentId!:string
  imageUrl!:string | null
  isDepartmentExixst: boolean = false
  constructor(public fb: UntypedFormBuilder, private menuService: MenuDetailsService, private route: Router
    ,private routes: ActivatedRoute) { }
  departmentForm = this.fb.group({
    name:['']
  })
  formData: FormData = new FormData();
  ngOnInit(): void {
    this.menuId = this.routes.snapshot.paramMap.get('menuId')!;
    this.departmentId = this.routes.snapshot.paramMap.get('departmentId')!;

    if(this.departmentId != null){
      this.menuService.getSingleDepartment(+this.departmentId).subscribe(res => {
        this.departmentForm.patchValue({
          name: res.name
        })
        this.imageUrl = environment.baseUrl + res.image!
        this.isDepartmentExixst = true
      })
    }
  }
  addDepartment(){
    this.formData.append('name', this.departmentForm.controls['name'].value)
    this.formData.append('menuId', this.menuId)
    this.menuService.addDepartment(this.formData).subscribe(res => {
      if(res === 400 || res === 403){
        alert('ההוספה נכשלה')
      }
      else{
        this.route.navigate([`/departments-page/${this.menuId}`]);
      }
    })
  }
  updateDepartment(){
    this.formData.append('departmentId', this.departmentId)
    this.formData.append('name', this.departmentForm.controls['name'].value)
    this.formData.append('menuId', this.menuId)
    this.menuService.updateDepartment(this.formData).subscribe(res => {
      if(res === 400 || res === 403){
        alert('ההוספה נכשלה')
      }
      else{
        this.route.navigate([`/departments-page/${this.menuId}`]);
      }
    })
    
  }
  onFileSelected(e: any) {
    this.formData.append('my', e.target.files[0])
  }
}
