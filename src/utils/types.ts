export type CallFilter = "Входящие" | "Исходящие" | null;

export type Period = "3 дня" | "Неделя" | "Месяц" | "Год";

export type SortBy = "date" | "duration";

export type Order = "ASC" | "DESC";

export type QParams = {
  currentFilter: CallFilter;
  period: Period;
  sortBy: SortBy;
  order: Order;
  manualStartDate: string | null;
  manualEndDate: string | null;
};
