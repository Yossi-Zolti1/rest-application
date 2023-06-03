import { Component, OnInit, HostListener } from '@angular/core';
import { RestaurantDetailsService } from 'src/app/services/restaurant-details.service';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/core/entities/restaurant';
import { scan, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  page: number = 1;
  restaurants$!: Observable<Restaurant[]>;

  constructor(private restService: RestaurantDetailsService) { }

  ngOnInit(): void {
    this.restaurants$ = this.restService.getAllRestaurants(this.page);

    // this.restaurants$ = this.restaurants$.pipe(
    //   scan((acc, restaurants) => [...acc, ...restaurants]),
    //   switchMap((restaurants) => this.restaurants$),
    //   tap(res => console.log(res))
    // );
  }

  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll(): void {
  //   const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
  //   const body = document.body;
  //   const html = document.documentElement;
  //   const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  //   const windowBottom = windowHeight + window.pageYOffset;

  //   if (windowBottom >= docHeight) {
  //     this.page++;
  //     this.restaurants$ = this.restService.getAllRestaurants(this.page);
  //   }
  // }
}
