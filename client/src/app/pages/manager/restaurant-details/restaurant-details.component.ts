import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Restaurant } from 'src/app/core/restaurant';
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
    , private updateFileService: UploadFileService) { }
  restaurant!: Restaurant;
  logoUrl!: string;
  isLoading: boolean = false;
  isRestaurantExixst: boolean = false;
  restForm = this.fb.group({
    name: [''],
    street: [''],
    city: [''],
    phone: [''],
    kashrut: [''],
    type: [''],
    logo: [''],
  });
  get logo() {
    return this.restForm.get('logo')
  }
  ngOnInit(): void {
    this.restDetailsService.getRestaurantDetails().subscribe(res => {
      if (res != 400) {
        this.restaurant = res;
        this.isRestaurantExixst = true;
        this.restForm.patchValue({
          name: res.name,
          street: res.street,
          city: res.city,
          phone: res.phone,
          kashrut: res.kashrut,
          type: res.type,
          logo: res.logo
        });
        this.logoUrl = environment.baseUrl + res.logo;
      }
    })
  }
  addRest() {
    this.restDetailsService.addRestaurant(this.restForm.value).subscribe(res => {
    })
  }
  updateRest(){
    this.restDetailsService.updateRestaurant(this.restForm.value).subscribe(res => {
    });
  }
  onFileSelected(e: any) {
    this.isLoading = true;
    let formData:FormData = new FormData();
    formData.append('my', e.target.files[0])
    this.updateFileService.updateLogo(formData).subscribe(res => {
      this.isLoading = false;
      this.logoUrl = environment.baseUrl + res.link1
    })
  }
}
