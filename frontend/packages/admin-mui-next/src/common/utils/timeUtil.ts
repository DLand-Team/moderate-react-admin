import type { Dayjs, OpUnitType } from "dayjs";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

// ----------------------------------------------------------------------

dayjs.extend(duration);
dayjs.extend(relativeTime);

// ----------------------------------------------------------------------

export type DatePickerFormat =
    | Dayjs
    | Date
    | string
    | number
    | null
    | undefined;

/**
 * Docs: https://day.js.org/docs/en/display/format
 */
export const formatStr = {
    dateTime: "DD MMM YYYY h:mm a", // 17 Apr 2022 12:00 am
    date: "DD MMM YYYY", // 17 Apr 2022
    time: "h:mm a", // 12:00 am
    split: {
        dateTime: "DD/MM/YYYY h:mm a", // 17/04/2022 12:00 am
        date: "DD/MM/YYYY", // 17/04/2022
    },
    paramCase: {
        dateTime: "DD-MM-YYYY h:mm a", // 17-04-2022 12:00 am
        date: "DD-MM-YYYY", // 17-04-2022
    },
};

export function today(format?: string) {
    return dayjs(new Date()).startOf("day").format(format);
}

// ----------------------------------------------------------------------

/** output: 17 Apr 2022 12:00 am
 */
export function toDateTime(date: DatePickerFormat, format?: string) {
    if (!date) {
        return null;
    }

    const isValid = dayjs(date).isValid();

    return isValid
        ? dayjs(date).format(format ?? formatStr.dateTime)
        : "Invalid time value";
}

// ----------------------------------------------------------------------

/** output: 17 Apr 2022
 */
export function toDate(date: DatePickerFormat, format?: string) {
    if (!date) {
        return null;
    }

    const isValid = dayjs(date).isValid();

    return isValid
        ? dayjs(date).format(format ?? formatStr.date)
        : "Invalid time value";
}

// ----------------------------------------------------------------------

/** output: 12:00 am
 */
export function toTime(date: DatePickerFormat, format?: string) {
    if (!date) {
        return null;
    }

    const isValid = dayjs(date).isValid();

    return isValid
        ? dayjs(date).format(format ?? formatStr.time)
        : "Invalid time value";
}

// ----------------------------------------------------------------------

/** output: 1713250100
 */
export function toTimestamp(date: DatePickerFormat) {
    if (!date) {
        return null;
    }

    const isValid = dayjs(date).isValid();

    return isValid ? dayjs(date).valueOf() : "Invalid time value";
}

// ----------------------------------------------------------------------

/** output: a few seconds, 2 years
 */
export function toNow(date: DatePickerFormat) {
    if (!date) {
        return null;
    }

    const isValid = dayjs(date).isValid();

    return isValid ? dayjs(date).toNow(true) : "Invalid time value";
}

// ----------------------------------------------------------------------

/** output: boolean
 */
export function judeIsBetween(
    inputDate: DatePickerFormat,
    startDate: DatePickerFormat,
    endDate: DatePickerFormat
) {
    if (!inputDate || !startDate || !endDate) {
        return false;
    }

    const formattedInputDate = toTimestamp(inputDate);
    const formattedStartDate = toTimestamp(startDate);
    const formattedEndDate = toTimestamp(endDate);

    if (formattedInputDate && formattedStartDate && formattedEndDate) {
        return (
            formattedInputDate >= formattedStartDate &&
            formattedInputDate <= formattedEndDate
        );
    }

    return false;
}

// ----------------------------------------------------------------------

/** output: boolean
 */
export function judeIsAfter(
    startDate: DatePickerFormat,
    endDate: DatePickerFormat
) {
    return dayjs(startDate).isAfter(endDate);
}

// ----------------------------------------------------------------------

/** output: boolean
 */
export function judeIsSame(
    startDate: DatePickerFormat,
    endDate: DatePickerFormat,
    units?: OpUnitType
) {
    if (!startDate || !endDate) {
        return false;
    }

    const isValid = dayjs(startDate).isValid() && dayjs(endDate).isValid();

    if (!isValid) {
        return "Invalid time value";
    }

    return dayjs(startDate).isSame(endDate, units ?? "year");
}

// ----------------------------------------------------------------------

/** output:
 * Same day: 26 Apr 2024
 * Same month: 25 - 26 Apr 2024
 * Same month: 25 - 26 Apr 2024
 * Same year: 25 Apr - 26 May 2024
 */
export function toDateRangeShortLabel(
    startDate: DatePickerFormat,
    endDate: DatePickerFormat,
    initial?: boolean
) {
    const isValid = dayjs(startDate).isValid() && dayjs(endDate).isValid();

    const isAfter = judeIsAfter(startDate, endDate);

    if (!isValid || isAfter) {
        return "Invalid time value";
    }

    let label = `${toDate(startDate)} - ${toDate(endDate)}`;

    if (initial) {
        return label;
    }

    const isSameYear = judeIsSame(startDate, endDate, "year");
    const isSameMonth = judeIsSame(startDate, endDate, "month");
    const isSameDay = judeIsSame(startDate, endDate, "day");

    if (isSameYear && !isSameMonth) {
        label = `${toDate(startDate, "DD MMM")} - ${toDate(endDate)}`;
    } else if (isSameYear && isSameMonth && !isSameDay) {
        label = `${toDate(startDate, "DD")} - ${toDate(endDate)}`;
    } else if (isSameYear && isSameMonth && isSameDay) {
        label = `${toDate(endDate)}`;
    }

    return label;
}

// ----------------------------------------------------------------------

export type DurationProps = {
    years?: number;
    months?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
};

/** output: '2024-05-28T05:55:31+00:00'
 */
export function fAdd({
    years = 0,
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
}: DurationProps) {
    const result = dayjs()
        .add(
            dayjs.duration({
                years,
                months,
                days,
                hours,
                minutes,
                seconds,
                milliseconds,
            })
        )
        .format();

    return result;
}

/** output: '2024-05-28T05:55:31+00:00'
 */
export function toSub({
    years = 0,
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
}: DurationProps) {
    const result = dayjs()
        .subtract(
            dayjs.duration({
                years,
                months,
                days,
                hours,
                minutes,
                seconds,
                milliseconds,
            })
        )
        .format();

    return result;
}
