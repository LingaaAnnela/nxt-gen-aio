import { createReducer, on } from '@ngrx/store';
import { NxtAccountActions } from '../actions';
import { AccountUser } from '../../web/shared/interface/account.interface';
import { Permission } from '../../web/shared/interface/role.interface';
import { Notification } from '../../web/shared/interface/notification.interface';
import { PaymentDetails } from '../../web/shared/interface/payment-details.interface';
import { Order } from '../../web/shared/interface/order.interface';
import { OrderStatus } from '../../web/shared/interface/order-status.interface';

export interface NxtAccountState {
  user: AccountUser | null;
  permissions: Permission[];
  notifications: Notification[];
  bankDetails: PaymentDetails | null;
  orders: Order[];
  orderStatus: OrderStatus[];
  selectedOrder: Order | null;
  showSpinner: boolean;
}

export const initialState: NxtAccountState = {
  user: null,
  permissions: [],
  notifications: [],
  bankDetails: null,
  orders: [],
  orderStatus: [],
  selectedOrder: null,
  showSpinner: false,
};

export const accountReducer = createReducer(
  initialState,
  on(NxtAccountActions.GetUser, (state) => ({
    ...state,
    showSpinner: true,
  })),
  on(NxtAccountActions.GetUserSuccess, (state, { user }) => ({
    ...state,
    user,
    // permissions: response.permissions,
    showSpinner: false,
  })),
  on(NxtAccountActions.GetUserFailure, (state, { error }) => ({
    ...state,
    user: null,
    permissions: [],
    showSpinner: false,
  })),
  on(NxtAccountActions.GetNotifications, (state) => ({
    ...state,
    showSpinner: true,
  })),
  on(NxtAccountActions.GetNotificationsSuccess, (state, { notifications }) => ({
    ...state,
    notifications,
    showSpinner: false,
  })),
  on(NxtAccountActions.GetNotificationsFailure, (state, { error }) => ({
    ...state,
    notifications: [],
    showSpinner: false,
  })),
  on(NxtAccountActions.GetBankDetails, (state) => ({
    ...state,
    showSpinner: true,
  })),
  on(NxtAccountActions.GetBankDetailsSuccess, (state, { bankDetails }) => ({
    ...state,
    bankDetails,
    showSpinner: false,
  })),
  on(NxtAccountActions.GetBankDetailsFailure, (state, { error }) => ({
    ...state,
    bankDetails: null,
    showSpinner: false,
  })),
  on(NxtAccountActions.GetOrders, (state) => ({
    ...state,
    showSpinner: true,
  })),
  on(NxtAccountActions.GetOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    showSpinner: false,
  })),
  on(NxtAccountActions.GetBankDetailsFailure, (state, { error }) => ({
    ...state,
    orders: [],
    showSpinner: false,
  })),
  on(NxtAccountActions.SetSelectedOrder, (state, { order }) => ({
    ...state,
    selectedOrder: order,
    // showSpinner: false,
  })),
  on(NxtAccountActions.GetOrderStatus, (state) => ({
    ...state,
    showSpinner: true,
  })),
  on(NxtAccountActions.GetOrderStatusSuccess, (state, { orderStatus }) => ({
    ...state,
    orderStatus,
    showSpinner: false,
  })),
  on(NxtAccountActions.GetBankDetailsFailure, (state, { error }) => ({
    ...state,
    orderStatus: [],
    showSpinner: false,
  }))
);
