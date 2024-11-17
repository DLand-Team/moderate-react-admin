// ----------------------------------------------------------------------

import { IDatePickerControl, IDateValue } from "@/types/common";

export type IOrderTableFilters = {
    name: string;
    status: string;
    startDate: IDatePickerControl;
    endDate: IDatePickerControl;
};

export type IOrderHistory = {
    orderTime: IDateValue;
    paymentTime: IDateValue;
    deliveryTime: IDateValue;
    completionTime: IDateValue;
    timeline: { title: string; time: IDateValue }[];
};

export type IOrderShippingAddress = {
    fullAddress: string;
    phoneNumber: string;
};

export type IOrderPayment = {
    cardType: string;
    cardNumber: string;
};

export type IOrderDelivery = {
    shipBy: string;
    speedy: string;
    trackingNumber: string;
};

export type IOrderCustomer = {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    ipAddress: string;
};

export type IOrderProductItem = {
    id: string;
    sku: string;
    name: string;
    price: number;
    coverUrl: string;
    quantity: number;
};

export type IOrderItem = {
    id: string;
    taxes: number;
    status: string;
    shipping: number;
    discount: number;
    subtotal: number;
    orderNumber: string;
    totalAmount: number;
    totalQuantity: number;
    createdAt: IDateValue;
    history: IOrderHistory;
    payment: IOrderPayment;
    customer: IOrderCustomer;
    delivery: IOrderDelivery;
    items: IOrderProductItem[];
    shippingAddress: IOrderShippingAddress;
};
