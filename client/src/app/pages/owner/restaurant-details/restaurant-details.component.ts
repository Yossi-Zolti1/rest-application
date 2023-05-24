import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/core/entities/restaurant';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantDetailsService } from 'src/app/services/restaurant-details.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  constructor(private restDetailsService: RestaurantDetailsService, public fb: FormBuilder
    , private route: Router, private auth: AuthService) { }
  restaurant!: Restaurant;
  logoUrl!: string;
  isRestaurantExixst: boolean = false;
  formData: FormData = new FormData();
  restForm = this.fb.group({
    name: [''],
    street: [''],
    city: [''],
    phone: [''],
    kashrut: [''],
    type: [''],
    logo: [''],
    my: FormData
  });
  get logo() {
    return this.restForm.get('logo')
  }
  ngOnInit(): void {
    this.restDetailsService.getRestaurantDetails(+this.auth.getUserId()).subscribe(res => {
      if (res != 400) {
        this.restaurant = res;
        this.isRestaurantExixst = true;
        this.restForm.patchValue({
          name: res[0].name,
          street: res[0].street,
          city: res[0].city,
          phone: res[0].phone,
          kashrut: res[0].kashrut,
          type: res[0].type,
          logo: res[0].logo
        });
        this.logoUrl = environment.baseUrl + res[0].logo;
      }
    })
  }
  addRest() {
    this.formData.append('name', this.restForm.controls['name'].value)
    this.formData.append('street', this.restForm.controls['street'].value)
    this.formData.append('city', this.restForm.controls['city'].value)
    this.formData.append('phone', this.restForm.controls['phone'].value)
    this.formData.append('kashrut', this.restForm.controls['kashrut'].value)
    this.formData.append('type', this.restForm.controls['type'].value)
    this.formData.append('logo', this.restForm.controls['logo'].value)
    this.restDetailsService.addRestaurant(this.restForm.value).subscribe(res => {
    })
  }
  updateRest(){
    this.formData.append('name', this.restForm.controls['name'].value)
    this.formData.append('street', this.restForm.controls['street'].value)
    this.formData.append('city', this.restForm.controls['city'].value)
    this.formData.append('phone', this.restForm.controls['phone'].value)
    this.formData.append('kashrut', this.restForm.controls['kashrut'].value)
    this.formData.append('type', this.restForm.controls['type'].value)
    this.formData.append('logo', this.restForm.controls['logo'].value)
    this.restDetailsService.updateRestaurant(this.formData).subscribe(res => {
      if(res!=405 && res!=400)this.route.navigate(['owner'])
    });
  }
  onFileSelected(e: any) {
    this.formData.append('my', e.target.files[0])
  }
}
