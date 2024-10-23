import { startOfMonth, startOfWeek, startOfYear, subDays } from "date-fns";
import type { CallFilter, Period } from "./types";

export function getHoursAndMinutes(date: string) {
  const dateObject = new Date(date);
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}`;
}

export function getTimeFromSeconds(seconds: number) {
  if (seconds === 0) return "";

  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

  return `${formattedMinutes}:${formattedSeconds}`;
}

export function formatPhoneNumber(phoneNumber: string) {
  if (phoneNumber.length !== 11) return phoneNumber;

  const digits = phoneNumber.split("");
  return `+${digits[0]} (${digits[1]}${digits[2]}${digits[3]}) ${digits[4]}${digits[5]}${digits[6]}-${digits[7]}${digits[8]}-${digits[9]}${digits[10]}`;
}

export function appendMark() {
  const marks = ["", "Скрипт не использован", "Плохо", "Хорошо", "Отлично"];

  return marks[Math.floor(Math.random() * marks.length)];
}

export function getDatesQParams(period: Period) {
  const endDate = new Date();
  let startDate: Date;

  switch (period) {
    case "Неделя":
      startDate = startOfWeek(endDate, { weekStartsOn: 1 });
      break;
    case "Месяц":
      startDate = startOfMonth(endDate);
      break;
    case "Год":
      startDate = startOfYear(endDate);
      break;
    default: {
      startDate = subDays(endDate, 2);
    }
  }

  const correctStartMonth =
    startDate.getMonth() + 1 < 10
      ? `0${startDate.getMonth() + 1}`
      : `${startDate.getMonth() + 1}`;

  const correctEndMonth =
    endDate.getMonth() + 1 < 10
      ? `0${endDate.getMonth() + 1}`
      : `${endDate.getMonth() + 1}`;

  const correctEndDay =
    endDate.getDate() < 10 ? `0${endDate.getDate()}` : `${endDate.getDate()}`;
  const correctStartDay =
    startDate.getDate() < 10
      ? `0${startDate.getDate()}`
      : `${startDate.getDate()}`;

  const startDateString = `date_start=${startDate.getFullYear()}-${correctStartMonth}-${correctStartDay}`;
  const endDateString = `date_end=${endDate.getFullYear()}-${correctEndMonth}-${correctEndDay}`;

  return {
    startDate: startDateString,
    endDate: endDateString,
  };
}

export function getFilterQParams(filter: CallFilter) {
  if (!filter) {
    return "";
  }

  const convertedFilter = filter === "Входящие" ? "1" : "0";

  return `&in_out=${convertedFilter}`;
}
