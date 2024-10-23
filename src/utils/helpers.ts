import type { CallFilter } from "../App";
import type { Calls } from "../data/types";

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

export function getFilteredCalls(
  calls: Calls | undefined,
  filter: CallFilter | null,
) {
  if (!calls) return;

  if (!filter) return calls;

  if (filter === "Входящие")
    return calls.filter((call) => call.callInOut === "in");

  return calls.filter((call) => call.callInOut === "out");
}
