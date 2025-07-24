import { createAction, props } from '@ngrx/store';
import { Notification } from '../../web/shared/interface/notification.interface';
import { AccountUser } from '../../web/shared/interface/account.interface';
import { PaymentDetails } from '../../web/shared/interface/payment-details.interface';
import { Order } from '../../web/shared/interface/order.interface';
import { OrderStatus } from '../../web/shared/interface/order-status.interface';
import { Point } from '../../web/shared/interface/point.interface';
import { Values } from '../../web/shared/interface/setting.interface';
import { Refund } from '../../web/shared/interface/refund.interface';
import { Wallet } from '../../web/shared/interface/wallet.interface';
import { Currency } from '../../web/shared/interface/currency.interface';
import { States } from '../../web/shared/interface/state.interface';
import { Country } from '../../web/shared/interface/country.interface';
import { Faq } from '../../web/shared/interface/page.interface';
import { Blog } from '../../web/shared/interface/blog.interface';

export const GetUser = createAction('[NXT] Get User');
export const GetUserSuccess = createAction(
  '[NXT] Get User Success',
  props<{ user: AccountUser }>()
);
export const GetUserFailure = createAction(
  '[NXT] Get User Failure',
  props<{ error: { message: string } }>()
);

export const GetNotifications = createAction('[NXT] Get Notifications');
export const GetNotificationsSuccess = createAction(
  '[NXT] Get Notifications Success',
  props<{ notifications: Notification[] }>()
);
export const GetNotificationsFailure = createAction(
  '[NXT] Get Notifications Failure',
  props<{ error: { message: string } }>()
);

export const GetBankDetails = createAction('[NXT] Get Bank Details');
export const GetBankDetailsSuccess = createAction(
  '[NXT] Get Bank Details Success',
  props<{ bankDetails: PaymentDetails }>()
);
export const GetBankDetailsFailure = createAction(
  '[NXT] Get Bank Details Failure',
  props<{ error: { message: string } }>()
);

export const GetOrders = createAction(
  '[NXT] Get Orders',
  props<{ page?: number; paginate?: number }>()
);
export const GetOrdersSuccess = createAction(
  '[NXT] Get Orders Success',
  props<{ orders: Order[] }>()
);
export const GetOrdersFailure = createAction(
  '[NXT] Get Orders Failure',
  props<{ error: { message: string } }>()
);

export const SetSelectedOrder = createAction(
  '[NXT] Set Selected Order',
  props<{ order: Order }>()
);

export const GetOrderStatus = createAction('[NXT] Get Order Status');
export const GetOrderStatusSuccess = createAction(
  '[NXT] Get Order Status Success',
  props<{ orderStatus: OrderStatus[] }>()
);
export const GetOrderStatusFailure = createAction(
  '[NXT] Get Order Status Failure',
  props<{ error: { message: string } }>()
);

export const GetSettings = createAction('[NXT] Get Settings');
export const GetSettingsSuccess = createAction(
  '[NXT] Get Settings Success',
  props<{ settings: Values }>()
);
export const GetSettingsFailure = createAction(
  '[NXT] Get Settings Failure',
  props<{ error: { message: string } }>()
);

export const GetPoint = createAction('[NXT] Get Point');
export const GetPointSuccess = createAction(
  '[NXT] Get Point Success',
  props<{ point: Point }>()
);
export const GetPointFailure = createAction(
  '[NXT] Get Point Failure',
  props<{ error: { message: string } }>()
);

export const GetRefunds = createAction('[NXT] Get Refunds');
export const GetRefundsSuccess = createAction(
  '[NXT] Get Refunds Success',
  props<{ refunds: Refund[] }>()
);
export const GetRefundsFailure = createAction(
  '[NXT] Get Refunds Failure',
  props<{ error: { message: string } }>()
);

export const GetWallet = createAction('[NXT] Get Wallet');
export const GetWalletSuccess = createAction(
  '[NXT] Get Wallet Success',
  props<{ wallet: Wallet }>()
);
export const GetWalletFailure = createAction(
  '[NXT] Get Wallet Failure',
  props<{ error: { message: string } }>()
);

export const GetCurrency = createAction('[NXT] Get Currency');
export const GetCurrencySuccess = createAction(
  '[NXT] Get Currency Success',
  props<{ currencies: Currency[] }>()
);
export const GetCurrencyFailure = createAction(
  '[NXT] Get Currency Failure',
  props<{ error: { message: string } }>()
);

export const GetStates = createAction('[NXT] Get States');
export const GetStatesSuccess = createAction(
  '[NXT] Get States Success',
  props<{ states: States[] }>()
);
export const GetStatesFailure = createAction(
  '[NXT] Get States Failure',
  props<{ error: { message: string } }>()
);

export const GetCountries = createAction('[NXT] Get Countries');
export const GetCountriesSuccess = createAction(
  '[NXT] Get Countries Success',
  props<{ countries: Country[] }>()
);
export const GetCountriesFailure = createAction(
  '[NXT] Get Countries Failure',
  props<{ error: { message: string } }>()
);

export const GetFaqs = createAction('[NXT] Get Faqs');
export const GetFaqsSuccess = createAction(
  '[NXT] Get Faqs Success',
  props<{ faqs: Faq[] }>()
);
export const GetFaqsFailure = createAction(
  '[NXT] Get Faqs Failure',
  props<{ error: { message: string } }>()
);

// TODO: Update the interface for ContactUsModel
export const ContactUs = createAction(
  '[NXT] Contact Us',
  props<{ payload: { name: string; email: string; message: string } }>()
);

export const GetBlogs = createAction('[NXT] Get Blogs');
export const GetBlogsSuccess = createAction(
  '[NXT] Get Blogs Success',
  props<{ blogs: Blog[] }>()
);
export const GetBlogsFailure = createAction(
  '[NXT] Get Blogs Failure',
  props<{ error: { message: string } }>()
);
