import { createReducer, on } from '@ngrx/store';
import { NxtAccountActions } from '../actions';
import { AccountUser } from '../../web/shared/interface/account.interface';
import { Permission } from '../../web/shared/interface/role.interface';
import { Notification } from '../../web/shared/interface/notification.interface';
import { PaymentDetails } from '../../web/shared/interface/payment-details.interface';
import { Order } from '../../web/shared/interface/order.interface';
import { OrderStatus } from '../../web/shared/interface/order-status.interface';
import { Values } from '../../web/shared/interface/setting.interface';
import { Point } from '../../web/shared/interface/point.interface';
import { Refund } from '../../web/shared/interface/refund.interface';
import { Wallet } from '../../web/shared/interface/wallet.interface';
import { Currency } from '../../web/shared/interface/currency.interface';
import { States } from '../../web/shared/interface/state.interface';
import { Country } from '../../web/shared/interface/country.interface';
import { Faq } from '../../web/shared/interface/page.interface';
import { Blog } from '../../web/shared/interface/blog.interface';

export interface NxtAccountState {
  user: AccountUser | null;
  settings: Values | null;
  permissions: Permission[];
  notifications: Notification[];
  bankDetails: PaymentDetails | null;
  orders: Order[];
  orderStatus: OrderStatus[];
  selectedOrder: Order | null;
  point: Point | null;
  refunds: Refund[] | null;
  wallet: Wallet | null;
  currencies: Currency[];
  selectedCurrency: Currency | null;
  states: States[];
  countries: Country[];
  faqs: {
    data: Faq[];
    isLoading: boolean;
  } | null;
  blogs: {
    data: Blog[];
    isLoading: boolean;
  } | null;
  showSpinner: boolean;
}

export const initialState: NxtAccountState = {
  user: null,
  settings: null,
  permissions: [],
  notifications: [],
  orders: [],
  bankDetails: null,
  orderStatus: [],
  selectedOrder: null,
  point: null,
  refunds: null,
  wallet: null,
  currencies: [],
  selectedCurrency: null,
  states: [],
  countries: [],
  faqs: null,
  blogs: null,
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
  on(NxtAccountActions.GetSettings, (state) => ({
    ...state,
    showSpinner: true,
  })),
  on(NxtAccountActions.GetSettingsSuccess, (state, { settings }) => ({
    ...state,
    settings,
    selectedCurrency: settings?.general?.default_currency || null,
    showSpinner: false,
  })),
  on(NxtAccountActions.GetSettingsFailure, (state, { error }) => ({
    ...state,
    settings: null,
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
  })),
  on(NxtAccountActions.GetPoint, (state) => ({
    ...state,
    showSpinner: true,
  })),
  on(NxtAccountActions.GetPointSuccess, (state, { point }) => ({
    ...state,
    point,
    showSpinner: false,
  })),
  on(NxtAccountActions.GetPointFailure, (state, { error }) => ({
    ...state,
    point: null,
    showSpinner: false,
  })),
  on(NxtAccountActions.GetRefunds, (state) => ({
    ...state,
    showSpinner: true,
  })),
  on(NxtAccountActions.GetRefundsSuccess, (state, { refunds }) => ({
    ...state,
    refunds,
    showSpinner: false,
  })),
  on(NxtAccountActions.GetRefundsFailure, (state, { error }) => ({
    ...state,
    refunds: null,
    showSpinner: false,
  })),
  on(NxtAccountActions.GetWallet, (state) => ({
    ...state,
    showSpinner: true,
  })),
  on(NxtAccountActions.GetWalletSuccess, (state, { wallet }) => ({
    ...state,
    wallet,
    showSpinner: false,
  })),
  on(NxtAccountActions.GetWalletFailure, (state, { error }) => ({
    ...state,
    refunds: null,
    showSpinner: false,
  })),
  on(NxtAccountActions.GetCurrency, (state) => ({
    ...state,
  })),
  on(NxtAccountActions.GetCurrencySuccess, (state, { currencies }) => ({
    ...state,
    currencies,
  })),
  on(NxtAccountActions.GetCurrencyFailure, (state, { error }) => ({
    ...state,
    currencies: [],
  })),
  on(NxtAccountActions.GetStates, (state) => ({
    ...state,
  })),
  on(NxtAccountActions.GetStatesSuccess, (state, { states }) => ({
    ...state,
    states,
  })),
  on(NxtAccountActions.GetStatesFailure, (state, { error }) => ({
    ...state,
    states: [],
  })),
  on(NxtAccountActions.GetCountries, (state) => ({
    ...state,
  })),
  on(NxtAccountActions.GetCountriesSuccess, (state, { countries }) => ({
    ...state,
    countries,
  })),
  on(NxtAccountActions.GetCountriesFailure, (state, { error }) => ({
    ...state,
    countries: [],
  })),
  on(NxtAccountActions.GetFaqs, (state) => ({
    ...state,
    faqs: { data: [], isLoading: true },
  })),
  on(NxtAccountActions.GetFaqsSuccess, (state, { faqs }) => ({
    ...state,
    faqs: { data: faqs, isLoading: false },
  })),
  on(NxtAccountActions.GetFaqsFailure, (state, { error }) => ({
    ...state,
    faqs: { data: [], isLoading: false },
  })),
  on(NxtAccountActions.GetBlogs, (state) => ({
    ...state,
    blogs: { data: [], isLoading: true },
  })),
  on(NxtAccountActions.GetBlogsSuccess, (state, { blogs }) => ({
    ...state,
    blogs: { data: blogs, isLoading: false },
  })),
  on(NxtAccountActions.GetBlogsFailure, (state, { error }) => ({
    ...state,
    blogs: { data: [], isLoading: false },
  }))
);
