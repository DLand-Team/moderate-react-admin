// ----------------------------------------------------------------------

export const ORDER_STATUS_OPTIONS = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "refunded", label: "Refunded" },
];

const ITEMS = [...Array(3)].map((_, index) => ({}));

export const _orders = [...Array(20)].map((_, index) => {
    const shipping = 10;

    const discount = 10;

    const taxes = 10;

    const items =
        (index % 2 && ITEMS.slice(0, 1)) ||
        (index % 3 && ITEMS.slice(1, 3)) ||
        ITEMS;

    const totalQuantity = items.reduce(
        (accumulator, item) => accumulator + item.quantity,
        0
    );

    const delivery = {
        shipBy: "DHL",
        speedy: "Standard",
        trackingNumber: "SPX037739199373",
    };

    return {
        orderNumber: `#601${index}`,
        taxes,
        items,
        shipping,
        discount,
        shippingAddress: {
            fullAddress: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
            phoneNumber: "365-374-4961",
        },
        payment: { cardType: "mastercard", cardNumber: "**** **** **** 5678" },
        status:
            (index % 2 && "completed") ||
            (index % 3 && "pending") ||
            (index % 4 && "cancelled") ||
            "refunded",
    };
});
