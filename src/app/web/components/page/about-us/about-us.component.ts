import { Component, inject } from '@angular/core';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as data from '../../../shared/data/owl-carousel';
import { Blog } from '../../../shared/interface/blog.interface';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { NxtAccountSelectors } from '../../../../store/selectors';
import { NxtAccountActions } from '../../../../store/actions';

export interface Clients {
  title: string;
  count: string;
  imageIcon: string;
  description: string;
}

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  imports: [
    BreadcrumbComponent,
    CarouselModule,
    RouterLink,
    AsyncPipe,
    TranslateModule,
  ],
})
export class AboutUsComponent {
  blogs$: Observable<{ data: Blog[]; isLoading: boolean }> = inject(
    Store
  ).select(NxtAccountSelectors.blogs);

  public breadcrumb: Breadcrumb = {
    title: 'About Us',
    items: [{ label: 'About Us', active: true }],
  };

  public productSlider = data.productSliderMargin;

  public clients: Clients[] = [
    {
      title: 'Business Years',
      count: '10',
      imageIcon: 'assets/svg/3/work.svg',
      description:
        'A coffee shop is a small business that sells coffee, pastries, and other morning goods. There are many different types of coffee shops around the world.',
    },
    {
      title: 'Products Sales',
      count: '80 K+',
      imageIcon: 'assets/svg/3/buy.svg',
      description:
        'Some coffee shops have a seating area, while some just have a spot to order and then go somewhere else to sit down. The coffee shop that I am going to.',
    },
    {
      title: 'Happy Customers',
      count: '90%',
      imageIcon: 'assets/svg/3/user.svg',
      description:
        "My goal for this coffee shop is to be able to get a coffee and get on with my day. It's a Thursday morning and I am rushing between meetings.",
    },
  ];

  public teamMembers = [
    {
      profile_image: 'assets/images/inner-page/user/3.jpg',
      name: 'Anwar Jethu',
      designation: 'CEO, Nxt Gen',
      description:
        'camembert de normandie. Bocconcini rubber cheese fromage frais port-salut.',
    },
    {
      profile_image: 'assets/images/nxt/linga-annela.jpeg',
      name: 'Linga Annela',
      designation: 'CTO, Nxt Gen',
      description: 'cheeseburger airedale mozzarella the big cheese fondue.',
    },
    {
      profile_image: 'assets/images/inner-page/user/2.jpg',
      name: 'Bala Nadella',
      designation: 'CFO, Nxt Gen',
      description:
        'cheese on toast mozzarella bavarian bergkase smelly cheese cheesy feet.',
    },
  ];

  public testimonials = [
    {
      name: 'Betty J. Turner',
      designation: 'CTO, Company',
      short_description: 'Top Quality, Beautiful Location',
      description:
        "I usually try to keep my sadness pent up inside where it can fester quietly as a mental illness. There, now he's trapped in a book I wrote: a crummy world of plot holes and spelling errors! As an interesting side note.",
      profile_image: 'assets/images/inner-page/user/4.jpg',
    },
    {
      name: 'Alfredo S. Rocha',
      designation: 'Project Manager',
      short_description: 'Top Quality, Beautiful Location',
      description:
        'My busy schedule leaves little, if any, time for blogging and social media. The Lorem Ipsum Company has been a huge part of helping me grow my business through organic search and content marketing.',
      profile_image: 'assets/images/inner-page/user/6.jpg',
    },
    {
      name: 'Donald C. Spurr',
      designation: 'Sale Agents',
      short_description: 'Top Quality, Beautiful Location',
      description:
        "Professional, responsive, and able to keep up with ever-changing demand and tight deadlines: That's how I would describe Jeramy and his team at The Lorem Ipsum Company. When it comes to content marketing.",
      profile_image: 'assets/images/inner-page/user/2.jpg',
    },
    {
      name: 'Terry G. Fain',
      designation: 'Photographer',
      short_description: 'Top Quality, Beautiful Location',
      description:
        'After being forced to move twice within five years, our customers had a hard time finding us and our sales plummeted. The Lorem Ipsum Co. not only revitalized our brand.',
      profile_image: 'assets/images/inner-page/user/1.jpg',
    },
    {
      name: 'Gwen J. Geiger',
      designation: 'Designer',
      short_description: 'Top Quality, Beautiful Location',
      description:
        "Professional, responsive, and able to keep up with ever-changing demand and tight deadlines: That's how I would describe Jeramy and his team at The Lorem Ipsum Company. When it comes to content marketing.",
      profile_image: 'assets/images/inner-page/user/1.jpg',
    },
    {
      name: 'Constance K. Whang',
      designation: 'CEO, Company',
      short_description: 'Top Quality, Beautiful Location',
      description:
        'Jeramy and his team at the Lorem Ipsum Company whipped my website into shape just in time for tax season. I was excited by the results and am proud to direct clients to my website once again.',
      profile_image: 'assets/images/inner-page/user/1.jpg',
    },
    {
      name: 'Constance K. Whang',
      designation: 'CEO, Company',
      short_description: 'Top Quality, Beautiful Location',
      description: `Yeah, and if you were the pope they'd be all, "Straighten your pope hat." And "Put on your good vestments." What are their names? Yep, I remember. They came in last at the Olympics!`,
      profile_image: 'assets/images/inner-page/user/3.jpg',
    },
  ];

  public clientsOptions: OwlOptions = {
    loop: true,
    margin: 20,
    items: 3,
    autoplay: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
  };

  public teamOptions: OwlOptions = {
    loop: true,
    margin: 20,
    items: 4,
    autoplay: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
  };

  public testimonialsOptions: OwlOptions = {
    loop: true,
    margin: 20,
    items: 4,
    // autoplay:true,
    center: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
  };

  public blogOptions: OwlOptions = {
    loop: true,
    margin: 20,
    items: 5,
    autoplay: true,
    center: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 5,
      },
    },
  };

  constructor(private _store: Store) {
    this._store.dispatch(NxtAccountActions.GetBlogs());
  }
}
