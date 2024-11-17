import type { Dayjs } from "dayjs";

// ----------------------------------------------------------------------

export type IPaymentCard = {
    id: string;
    cardType: string;
    primary?: boolean;
    cardNumber: string;
};

export type IAddressItem = {
    id?: string;
    name: string;
    company?: string;
    primary?: boolean;
    fullAddress: string;
    phoneNumber?: string;
    addressType?: string;
};

export type IDateValue = string | number | null;

export type IDatePickerControl = Dayjs | null;

export type ISocialLink = {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
};

export interface PageBaseData {
    pageSize: number;
    pageNum: number;
    total: number;
}
