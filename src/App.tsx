import { Suspense, useEffect, useState } from "react";
import { CallTypeSelect } from "./components/controls/CallTypeSelect";
import { DateSelect } from "./components/controls/DateSelect";
import { CallsTable } from "./components/table/CallsTable";
import { API_URL, token } from "./data/constants";
import type { ApiResponse, Calls } from "./data/types";
import {
  appendMark,
  formatPhoneNumber,
  getFilteredCalls,
  getHoursAndMinutes,
  getTimeFromSeconds,
} from "./utils/helpers";
import { startOfMonth, startOfWeek, startOfYear, subDays } from "date-fns";

export type CallFilter = "Входящие" | "Исходящие" | null;

export type Dates = { startDate: string; endDate: string };

type Period = "3 дня" | "Неделя" | "Месяц" | "Год";

function getDates(period: Period): Dates {
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

  const startDateString = `${startDate.getFullYear()}-${correctStartMonth}-${correctStartDay}`;
  const endDateString = `${endDate.getFullYear()}-${correctEndMonth}-${correctEndDay}`;

  return {
    startDate: startDateString,
    endDate: endDateString,
  };
}

function App() {
  const [calls, setCalls] = useState<Calls>();
  const [currentFilter, setCurrentFilter] = useState<CallFilter | null>(null);
  const [period, setPeriod] = useState<Period>("3 дня");

  useEffect(() => {
    const { startDate, endDate } = getDates(period);

    async function fetchCalls() {
      const apiResponse = await fetch(
        `${API_URL}?date_start=${startDate}&date_end=${endDate}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await apiResponse.json();
      return data as ApiResponse;
    }
    fetchCalls().then((data) => {
      const calls: Calls = data.results.map((call) => ({
        id: call.id,
        callInOut: call.in_out === 1 ? "in" : "out",
        status: call.status === "Дозвонился" ? "answered" : "missed",
        date: getHoursAndMinutes(call.date),
        userAvatar: call.person_avatar,
        number: formatPhoneNumber(call.partner_data.phone),
        source: call.source ?? "",
        mark: appendMark(),
        duration: getTimeFromSeconds(call.time),
      }));
      setCalls(calls);
    });
  }, []);

  const filteredCalls = getFilteredCalls(calls, currentFilter);

  return (
    <main className="flex min-h-screen flex-col gap-[16px] bg-[#F1F4F9] px-60 pb-[120px] pt-20 font-sf">
      <div className="flex justify-between">
        <div>
          <CallTypeSelect
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />
        </div>
        <DateSelect />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="h-full w-full rounded-lg bg-white shadow-default">
          {filteredCalls && <CallsTable calls={filteredCalls} />}
        </div>
      </Suspense>
    </main>
  );
}

export default App;
