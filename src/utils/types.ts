export type CallFilter = "Входящие" | "Исходящие" | null;

export type Period = "3 дня" | "Неделя" | "Месяц" | "Год";

export type QParams = {
  currentFilter: CallFilter;
  period: Period;
};
