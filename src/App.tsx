import { useEffect, useState } from "react";
import { ArrowUp } from "./components/icons/ArrowUp";

const API_URL = "https://api.skilla.ru/mango/getList";
const token = "testtoken";

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

function App() {
  const [data, setData] = useState<Root>();

  // useEffect(() => {
  //   async function fetchCalls() {
  //     const apiResponse = await fetch(API_URL, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data = await apiResponse.json();

  //     return data as Root;
  //   }

  //   fetchCalls().then((data) => setData(data));
  // }, []);

  return (
    <main className="flex min-h-screen flex-col gap-[10px] bg-[#F1F4F9] px-60 pb-[120px] pt-20">
      <div className="flex justify-between">
        <CallTypeSelect />
        <p className="text-secondary">world</p>
      </div>
      <div className="h-full w-full rounded-lg bg-white pt-5 shadow-default">
        {data?.results.map((r) => <div key={r.id}>{r.date}</div>)}
      </div>
    </main>
  );
}

export default App;

type CallType = "Все типы" | "Входящие" | "Исходящие";

const CallTypeSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCallType, setSelectedCallType] =
    useState<CallType>("Все типы");

  return (
    <div
      role="button"
      onClick={() => setIsOpen(!isOpen)}
      className="relative inline-flex min-w-[130px] items-center gap-1 rounded-lg bg-transparent text-sm/[14px] text-secondary"
    >
      {selectedCallType}
      <div
        className={`${isOpen ? "" : "rotate-180"} transition-all duration-150`}
      >
        <ArrowUp fillColor={isOpen ? "#002CFB" : "#ADBFDF"} />
      </div>
      {isOpen && (
        <div className="shadow-dropdown absolute left-0 top-[calc(100%+12px)] rounded-lg bg-white">
          <button
            className="hover:bg-hover focus-visible:bg-hover text-muted w-full px-3 py-[7px] text-left text-xs/[18px] transition-colors duration-150"
            onClick={() => {
              setSelectedCallType("Все типы");
              setIsOpen(false);
            }}
          >
            Все типы
          </button>
          <button
            className="hover:bg-hover focus-visible:bg-hover text-muted w-full px-3 py-[7px] text-left text-xs/[18px] transition-colors duration-150"
            onClick={() => {
              setSelectedCallType("Входящие");
              setIsOpen(false);
            }}
          >
            Входящие
          </button>
          <button
            className="hover:bg-hover focus-visible:bg-hover text-muted w-full px-3 py-[7px] text-left text-xs/[18px] transition-colors duration-150"
            onClick={() => {
              setSelectedCallType("Исходящие");
              setIsOpen(false);
            }}
          >
            Исходящие
          </button>
        </div>
      )}
    </div>
  );
};
