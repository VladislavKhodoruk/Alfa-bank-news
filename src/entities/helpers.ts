import { DATE_OPTIONS } from "./constants";

export function convertDate(date: string) {
  return new Date(date).toLocaleString("ru", DATE_OPTIONS);
}
