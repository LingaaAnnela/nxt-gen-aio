import { Menu } from '../interface/menu.interface';

export const menu: Menu[] = [
  {
    id: 1,
    title: 'home',
    type: 'sub',
    megaMenu: true,
    megaMenuType: 'image',
    active: false,
    children: [
      {
        title: 'paris',
        path: 'theme/paris',
        type: 'link',
        image: 'assets/images/themes/01.png',
      },
      {
        title: 'tokyo',
        path: 'theme/tokyo',
        type: 'link',
        image: 'assets/images/themes/02.png',
      },
      {
        title: 'osaka',
        path: 'theme/osaka',
        type: 'link',
        image: 'assets/images/themes/03.png',
      },
      {
        title: 'rome',
        path: 'theme/rome',
        type: 'link',
        image: 'assets/images/themes/04.png',
      },
      {
        title: 'madrid',
        path: 'theme/madrid',
        type: 'link',
        image: 'assets/images/themes/05.png',
      },
      {
        title: 'berlin',
        path: 'theme/berlin',
        type: 'link',
        image: 'assets/images/themes/06.png',
      },
      {
        title: 'denver',
        path: 'theme/denver',
        type: 'link',
        image: 'assets/images/themes/07.png',
      },
      {
        title: 'Coming Soon',
        path: '',
        type: 'link',
        image: 'assets/images/themes/08.png',
      },
    ],
  },
  {
    id: 5,
    title: 'pages',
    active: false,
    type: 'sub',
    children: [
      {
        title: 'Authentication',
        type: 'sub',
        children: [
          {
            title: 'sign_in',
            path: 'auth/login',
            type: 'link',
          },
          {
            title: 'sign_up',
            path: 'auth/register',
            type: 'link',
          },
          {
            title: 'forgot_password',
            path: 'auth/forgot-password',
            type: 'link',
          },
          {
            title: 'verify_otp',
            path: 'auth/otp',
            type: 'link',
          },
          {
            title: 'update_password',
            path: 'auth/update-password',
            type: 'link',
          },
        ],
      },
      {
        title: 'account',
        type: 'sub',
        children: [
          {
            title: 'my_dashboard',
            path: 'account/dashboard',
            type: 'link',
          },
          {
            title: 'my_notifications',
            path: 'account/notifications',
            type: 'link',
          },
          {
            title: 'my_addresses',
            path: 'account/addresses',
            type: 'link',
          },
          {
            title: 'my_wallet',
            path: 'account/wallet',
            type: 'link',
          },
          {
            title: 'my_points',
            path: 'account/point',
            type: 'link',
          },
          {
            title: 'my_orders',
            path: 'account/order',
            type: 'link',
          },
          {
            title: 'order_details',
            path: 'account/order/details/1000',
            type: 'link',
          },
          {
            title: 'refund_history',
            path: 'account/refund',
            type: 'link',
          },
          {
            title: 'payout_details',
            path: 'account/bank-details',
            type: 'link',
          },
        ],
      },
      {
        title: 'about_us',
        type: 'link',
        path: 'about-us',
      },
      {
        title: 'browse_faqs',
        type: 'link',
        path: 'faq',
        label: 'hot',
        labelClass: 'warning-label',
      },
      {
        title: 'cart',
        type: 'link',
        path: 'cart',
      },
      {
        title: 'checkout',
        type: 'link',
        path: 'checkout',
      },
      {
        title: 'compare',
        type: 'link',
        path: 'compare',
      },
      {
        title: 'contact_us',
        path: 'contact-us',
        type: 'link',
      },
      {
        title: 'maintenance',
        type: 'link',
        path: 'maintenance',
      },
      {
        title: 'offers',
        type: 'link',
        path: 'offer',
        label: 'new',
      },
      {
        title: 'search',
        type: 'link',
        path: 'search',
        label: 'hot',
        labelClass: 'warning-label',
      },
      {
        title: 'wishlist',
        type: 'link',
        path: 'wishlist',
      },
      {
        title: '404',
        type: 'link',
        path: '404',
      },
    ],
  },
];
