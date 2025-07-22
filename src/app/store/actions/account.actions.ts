import { createAction, props } from '@ngrx/store';
import { Notification } from '../../web/shared/interface/notification.interface';
import { AccountUser } from '../../web/shared/interface/account.interface';
import { PaymentDetails } from '../../web/shared/interface/payment-details.interface';
import { Order } from '../../web/shared/interface/order.interface';
import { OrderStatus } from '../../web/shared/interface/order-status.interface';

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
