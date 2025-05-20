import { MonthsPtBrAbbreviated } from "./monthsPtBr";

export function formatDateToCustomPtBr(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const monthName = Object.keys(MonthsPtBrAbbreviated).find(
    (key) =>
      MonthsPtBrAbbreviated[key as keyof typeof MonthsPtBrAbbreviated] ===
      monthIndex
  );

  return `${day} de ${monthName} de ${year}`;
}
