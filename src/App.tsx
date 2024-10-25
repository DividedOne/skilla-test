import { Suspense, useEffect, useState } from "react";
import { CallTypeSelect } from "./components/controls/CallTypeSelect";
import { DateSelect } from "./components/controls/DateSelect";
import { CallsTable } from "./components/table/CallsTable";
import { API_URL, token } from "./data/constants";
import type { ApiResponse, Calls } from "./data/types";
import {
  appendMark,
  appendSource,
  formatPhoneNumber,
  getDatesQParams,
  getFilterQParams,
  getHoursAndMinutes,
} from "./utils/helpers";
import type { QParams } from "./utils/types";

function App() {
  const [calls, setCalls] = useState<Calls>();
  const [qParams, setQParams] = useState<QParams>({
    currentFilter: null,
    period: "3 дня",
    sortBy: "date",
    order: "DESC",
    manualStartDate: null,
    manualEndDate: null,
  });

  useEffect(() => {
    const { startDate, endDate } = getDatesQParams(
      qParams.period,
      qParams.manualStartDate,
      qParams.manualEndDate,
    );
    const filter = getFilterQParams(qParams.currentFilter);

    async function fetchCalls() {
      const apiResponse = await fetch(
        `${API_URL}?${startDate}&${endDate}${filter}&sort_by=${qParams.sortBy}&order=${qParams.order}&limit=150`,
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
      const calls = data.results.reduce<Calls>((acc, call) => {
        acc[call.date_notime] = [
          ...(acc[call.date_notime] || []),
          {
            id: call.id,
            callInOut: call.in_out === 1 ? "in" : "out",
            status: call.status === "Дозвонился" ? "answered" : "missed",
            date: getHoursAndMinutes(call.date),
            userAvatar: call.person_avatar,
            number: formatPhoneNumber(
              call.in_out === 1 ? call.from_number : call.to_number,
            ),
            name: "",
            company: "",
            source: appendSource(call.source),
            mark: appendMark(),
            duration: call.time,
            recordId: call.record,
            partnershipId: call.partnership_id,
          },
        ];

        return acc;
      }, {});

      setCalls(calls);
    });
  }, [qParams]);

  return (
    <main className="flex min-h-screen flex-col gap-[16px] bg-[#F1F4F9] px-60 pb-[120px] pt-20 font-sf">
      <div className="flex justify-between">
        <div>
          <CallTypeSelect
            currentFilter={qParams.currentFilter}
            setQParams={setQParams}
          />
        </div>
        <DateSelect
          manualStartDate={qParams.manualStartDate}
          manualEndDate={qParams.manualEndDate}
          period={qParams.period}
          setQParams={setQParams}
        />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="h-full w-full rounded-lg bg-white shadow-default">
          {calls && (
            <CallsTable
              calls={calls}
              sortBy={qParams.sortBy}
              order={qParams.order}
              setQParams={setQParams}
            />
          )}
        </div>
      </Suspense>
    </main>
  );
}

export default App;
