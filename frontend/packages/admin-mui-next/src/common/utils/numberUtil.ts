// ----------------------------------------------------------------------
import numeral from "numeral";

export type InputNumberValue = string | number | null | undefined;

type Options = Intl.NumberFormatOptions | undefined;

const DEFAULT_LOCALE = { code: "en-US", currency: "USD" };

function processInput(inputValue: InputNumberValue): number | null {
    if (inputValue == null || Number.isNaN(inputValue)) return null;
    return Number(inputValue);
}

// ----------------------------------------------------------------------

export function toNumber(inputValue: InputNumberValue, options?: Options) {
    const locale = DEFAULT_LOCALE;

    const number = processInput(inputValue);
    if (number === null) return "";

    const fm = new Intl.NumberFormat(locale.code, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        ...options,
    }).format(number);

    return fm;
}

// ----------------------------------------------------------------------

export function toCurrency(inputValue: InputNumberValue, options?: Options) {
    const locale = DEFAULT_LOCALE;

    const number = processInput(inputValue);
    if (number === null) return "";

    const fm = new Intl.NumberFormat(locale.code, {
        style: "currency",
        currency: locale.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        ...options,
    }).format(number);

    return fm;
}

// ----------------------------------------------------------------------

export function toPercent(inputValue: InputNumberValue, options?: Options) {
    const locale = DEFAULT_LOCALE;

    const number = processInput(inputValue);
    if (number === null) return "";

    const fm = new Intl.NumberFormat(locale.code, {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
        ...options,
    }).format(number / 100);

    return fm;
}

// ----------------------------------------------------------------------

export function toShortenNumber(
    inputValue: InputNumberValue,
    options?: Options
) {
    const locale = DEFAULT_LOCALE;

    const number = processInput(inputValue);
    if (number === null) return "";

    const fm = new Intl.NumberFormat(locale.code, {
        notation: "compact",
        maximumFractionDigits: 2,
        ...options,
    }).format(number);

    return fm.replace(/[A-Z]/g, (match) => match.toLowerCase());
}

// ----------------------------------------------------------------------

export function fData(inputValue: InputNumberValue) {
    const number = processInput(inputValue);
    if (number === null || number === 0) return "0 bytes";

    const units = ["bytes", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"];
    const decimal = 2;
    const baseValue = 1024;

    const index = Math.floor(Math.log(number) / Math.log(baseValue));
    const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${
        units[index]
    }`;

    return fm;
}

export function cumulativeSum(arr: number[]): number[] {
    return arr.reduce((acc, curr, index) => {
        if (index === 0) {
            acc.push(curr);
        } else {
            acc.push(acc[index - 1] + curr);
        }
        return acc;
    }, [] as number[]);
}

export function fCurrencyWithout(number: InputNumberValue) {
    const format = number ? numeral(number).format("0,0.00") : "";

    return result(format, ".00");
}
