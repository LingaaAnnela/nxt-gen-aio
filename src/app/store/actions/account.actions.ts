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
