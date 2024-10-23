import { Suspense, useEffect, useState } from "react";
import { CallTypeSelect } from "./components/controls/CallTypeSelect";
import { DateSelect } from "./components/controls/DateSelect";
import { CallsTable } from "./components/table/CallsTable";
import { API_URL, token } from "./data/constants";

export interface Root {
  total_rows: number;
  results: Result[];
}

export interface Result {
  id: number;
  partnership_id: string;
  partner_data: PartnerData;
  date: string;
  date_notime: string;
  time: number;
  from_number: string;
  from_extension: string;
  to_number: string;
  to_extension: string;
  is_skilla: number;
  status: string;
  record: string;
  line_number: string;
  line_name: string;
  in_out: number;
  from_site: number;
  source: string;
  errors: any[];
  disconnect_reason: string;
  results: any[];
  stages: any[];
  abuse: Abuse;
  contact_name: string;
  contact_company: string;
  person_id: number;
  person_name: string;
  person_surname: string;
  person_avatar: string;
}

export interface PartnerData {
  id: string;
  name: string;
  phone: string;
}

export interface Abuse {
  date: string;
  person_name: string;
  message: string;
  support_read_status: number;
  support_answer_status: number;
  answers: Answer[];
}

export interface Answer {
  message: string;
  from_support: number;
  support_read_status: number;
  person_read_status: number;
}

export type CallInOut = "in" | "out";

export type CallStatus = "answered" | "missed";

export type CallFilter = "Входящие" | "Исходящие" | null;

export type MappedData = {
  id: number;
  callInOut: CallInOut;
  status: CallStatus;
  date: string;
  userAvatar: string;
  number: string;
  source: string;
  mark: string;
  duration: string;
}[];

function getHoursAndMinutes(date: string) {
  const dateObject = new Date(date);
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}`;
}

function getTimeFromSeconds(seconds: number) {
  if (seconds === 0) return "";

  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

  return `${formattedMinutes}:${formattedSeconds}`;
}

function formatPhoneNumber(phoneNumber: string) {
  if (phoneNumber.length !== 11) return phoneNumber;

  const digits = phoneNumber.split("");
  return `+${digits[0]} (${digits[1]}${digits[2]}${digits[3]}) ${digits[4]}${digits[5]}${digits[6]}-${digits[7]}${digits[8]}-${digits[9]}${digits[10]}`;
}

function appendMark() {
  const marks = ["", "Скрипт не использован", "Плохо", "Хорошо", "Отлично"];

  return marks[Math.floor(Math.random() * marks.length)];
}

function getFilteredCalls(
  calls: MappedData | undefined,
  filter: CallFilter | null,
) {
  if (!calls) return;

  if (!filter) return calls;

  if (filter === "Входящие")
    return calls.filter((call) => call.callInOut === "in");

  return calls.filter((call) => call.callInOut === "out");
}

function App() {
  const [data, setData] = useState<MappedData>();
  const [currentFilter, setCurrentFilter] = useState<CallFilter | null>(null);

  useEffect(() => {
    async function fetchCalls() {
      const apiResponse = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await apiResponse.json();
      return data as Root;
    }
    fetchCalls().then((data) => {
      const mappedData: MappedData = data.results.map((call) => ({
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
      setData(mappedData);
    });
  }, []);

  const filteredCalls = getFilteredCalls(data, currentFilter);

  return (
    <main className="font-sf flex min-h-screen flex-col gap-[16px] bg-[#F1F4F9] px-60 pb-[120px] pt-20">
      <div className="flex justify-between">
        <CallTypeSelect
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
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
