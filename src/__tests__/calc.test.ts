import * as calc from "@/ts/calc";
import { vi } from "vitest";

describe('marginBottomFromViewHeight', () => {
    it('should return correct marginBottom for height within data points', () => {
        expect(calc.marginBottomFromViewHeight(90)).toBe(-5);
        expect(calc.marginBottomFromViewHeight(97)).toBe(-1);
        expect(calc.marginBottomFromViewHeight(100)).toBe(0);
    });

    it('should interpolate correctly between data points', () => {
        expect(calc.marginBottomFromViewHeight(95)).toBeCloseTo(-2.1, 0);
        expect(calc.marginBottomFromViewHeight(98)).toBeCloseTo(-0.6, 0);
    });

    it('should extrapolate correctly below the smallest data point', () => {
        expect(calc.marginBottomFromViewHeight(80)).toBeCloseTo(-10.5, 0);
    });

    it('should extrapolate correctly above the largest data point', () => {
        expect(calc.marginBottomFromViewHeight(110)).toBeCloseTo(5.2, 0);
    });

    it('should return 0 for height exactly at the smallest data point', () => {
        expect(calc.marginBottomFromViewHeight(121)).toBe(11);
    });

    it('should return 0 for height exactly at the largest data point', () => {
        expect(calc.marginBottomFromViewHeight(100)).toBe(0);
    });
});

describe('age function', () => {
    const fixedDate = new Date('2024-10-04');

    beforeAll(() => {
        vi.useFakeTimers({
            now: fixedDate
        });
        vi.setSystemTime(fixedDate);
    });

    afterAll(() => {
        vi.useRealTimers();
    });

    test('calculates age correctly', () => {
        expect(calc.age(new Date('2000-10-04'))).toBe(24);
        expect(calc.age(new Date('2000-10-03'))).toBe(24);
        expect(calc.age(new Date('2000-10-05'))).toBe(23);
        expect(calc.age(new Date('1995-01-01'))).toBe(29);
    });
});