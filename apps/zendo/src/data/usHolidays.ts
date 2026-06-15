import { addDays, getDay, startOfMonth, addMonths, getYear } from "date-fns";

// ─── Types ────────────────────────────────────────────────────

interface HolidayDef {
  name: string;
  // Fixed date (month is 1-indexed) or rule-based
  type: "fixed" | "nthWeekday" | "lastWeekday";
  month: number;       // 1–12
  day?: number;        // For "fixed"
  weekday?: number;    // 0=Sun, 1=Mon … 6=Sat. For nth/last weekday
  nth?: number;        // 1,2,3,4 for nthWeekday
}

const HOLIDAY_DEFS: HolidayDef[] = [
  { name: "New Year's Day",        type: "fixed",       month: 1,  day: 1 },
  { name: "Martin Luther King Jr. Day", type: "nthWeekday", month: 1, weekday: 1, nth: 3 },
  { name: "Presidents' Day",       type: "nthWeekday",  month: 2,  weekday: 1, nth: 3 },
  { name: "Memorial Day",          type: "lastWeekday", month: 5,  weekday: 1 },
  { name: "Juneteenth",            type: "fixed",       month: 6,  day: 19 },
  { name: "Independence Day",      type: "fixed",       month: 7,  day: 4 },
  { name: "Labor Day",             type: "nthWeekday",  month: 9,  weekday: 1, nth: 1 },
  { name: "Columbus Day",          type: "nthWeekday",  month: 10, weekday: 1, nth: 2 },
  { name: "Veterans Day",          type: "fixed",       month: 11, day: 11 },
  { name: "Thanksgiving Day",      type: "nthWeekday",  month: 11, weekday: 4, nth: 4 },
  { name: "Christmas Day",         type: "fixed",       month: 12, day: 25 },
];

function getNthWeekday(year: number, month: number, weekday: number, nth: number): Date {
  const first = startOfMonth(new Date(year, month - 1, 1));
  const firstWd = getDay(first);
  const diff = (weekday - firstWd + 7) % 7;
  return addDays(first, diff + (nth - 1) * 7);
}

function getLastWeekday(year: number, month: number, weekday: number): Date {
  // Start from 1st of next month, go back
  const nextMonth = startOfMonth(addMonths(new Date(year, month - 1, 1), 1));
  const lastDay = addDays(nextMonth, -1);
  const lastWd = getDay(lastDay);
  const diff = (lastWd - weekday + 7) % 7;
  return addDays(lastDay, -diff);
}

function resolveDate(def: HolidayDef, year: number): Date {
  if (def.type === "fixed") {
    return new Date(year, def.month - 1, def.day!);
  }
  if (def.type === "nthWeekday") {
    return getNthWeekday(year, def.month, def.weekday!, def.nth!);
  }
  return getLastWeekday(year, def.month, def.weekday!);
}

export interface USHoliday {
  id: string;
  title: string;
  date: string;       // ISO date "YYYY-MM-DD"
  year: number;
}

// Generate holidays for a range of years (inclusive)
export function getUSHolidays(fromYear: number, toYear: number): USHoliday[] {
  const result: USHoliday[] = [];
  for (let year = fromYear; year <= toYear; year++) {
    for (const def of HOLIDAY_DEFS) {
      const d = resolveDate(def, year);
      result.push({
        id: `holiday-${year}-${def.name.replace(/\s+/g, "-")}`,
        title: def.name,
        date: d.toISOString().split("T")[0],
        year,
      });
    }
  }
  return result;
}

// Get holidays for current year ± 1
export function getCurrentHolidays(): USHoliday[] {
  const year = getYear(new Date());
  return getUSHolidays(year - 1, year + 1);
}
