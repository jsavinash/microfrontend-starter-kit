import { describe, it, expect } from "vitest";
import {
    formatDate,
    formatNumber,
    formatCurrency,
    truncate,
    generateId,
    debounce,
    cn,
} from "./index";

describe("formatDate", () => {
    it("formats a Date object", () => {
        const date = new Date("2024-01-15");
        expect(formatDate(date)).toBe("January 15, 2024");
    });

    it("formats a date string", () => {
        expect(formatDate("2024-01-15")).toBe("January 15, 2024");
    });
});

describe("formatNumber", () => {
    it("formats a number with commas", () => {
        expect(formatNumber(1234567)).toBe("1,234,567");
    });

    it("formats zero", () => {
        expect(formatNumber(0)).toBe("0");
    });
});

describe("formatCurrency", () => {
    it("formats USD by default", () => {
        expect(formatCurrency(1234.56)).toBe("$1,234.56");
    });

    it("formats EUR currency", () => {
        expect(formatCurrency(100, "EUR")).toBe("€100.00");
    });
});

describe("truncate", () => {
    it("returns the original string if shorter than maxLength", () => {
        expect(truncate("Hello", 10)).toBe("Hello");
    });

    it("truncates and adds ellipsis", () => {
        expect(truncate("Hello World", 5)).toBe("Hello...");
    });
});

describe("generateId", () => {
    it("generates a string ID", () => {
        expect(generateId()).toBeTypeOf("string");
    });

    it("generates unique IDs", () => {
        const id1 = generateId();
        const id2 = generateId();
        expect(id1).not.toBe(id2);
    });
});

describe("debounce", () => {
    it("creates a function", () => {
        const fn = debounce(() => {}, 100);
        expect(fn).toBeTypeOf("function");
    });
});

describe("cn", () => {
    it("joins class names", () => {
        expect(cn("foo", "bar")).toBe("foo bar");
    });

    it("filters falsy values", () => {
        expect(cn("foo", false, null, undefined, "bar")).toBe("foo bar");
    });

    it("returns empty string for no classes", () => {
        expect(cn()).toBe("");
    });
});