import { COUNT_FORMATS } from "../constants/app";

const formatCount = value => {
    const format = COUNT_FORMATS.find(format => value < format.limit);
    value = (1000 * value) / format.limit;
    value = Math.round(value * 100) / 100; // keep one decimal number, only if needed
    return value + format.letter;
};

export { formatCount };
