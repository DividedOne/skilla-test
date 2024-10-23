import { useEffect, useState } from "react";
import { CallTypeSelect } from "./components/controls/CallTypeSelect";
import { DateSelect } from "./components/controls/DateSelect";
import { CallsTable } from "./components/table/CallsTable";

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

const mockCalls = [
  {
    id: "1",
    callType: "inc",
    time: "10:00",
    employeeAvatar: "",
    fromUser: "alo",
    source: "call",
    mark: "mark",
    duration: "10",
  },
  {
    id: "2",
    callType: "inc",
    time: "10:00",
    employeeAvatar: "",
    fromUser: "alo",
    source: "call",
    mark: "mark",
    duration: "10",
  },
  {
    id: "3",
    callType: "inc",
    time: "10:00",
    employeeAvatar: "",
    fromUser: "alo",
    source: "call",
    mark: "mark",
    duration: "10",
  },
  {
    id: "4",
    callType: "inc",
    time: "10:00",
    employeeAvatar: "",
    fromUser: "alo",
    source: "call",
    mark: "mark",
    duration: "10",
  },
  {
    id: "5",
    callType: "inc",
    time: "10:00",
    employeeAvatar: "",
    fromUser: "alo",
    source: "call",
    mark: "mark",
    duration: "10",
  },
  {
    id: "6",
    callType: "inc",
    time: "10:00",
    employeeAvatar: "",
    fromUser: "alo",
    source: "call",
    mark: "mark",
    duration: "10",
  },
  {
    id: "7",
    callType: "inc",
    time: "10:00",
    employeeAvatar: "",
    fromUser: "alo",
    source: "call",
    mark: "mark",
    duration: "10",
  },
];

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
    <main className="flex min-h-screen flex-col gap-[16px] bg-[#F1F4F9] px-60 pb-[120px] pt-20">
      <div className="flex justify-between">
        <CallTypeSelect />
        <DateSelect />
      </div>
      <div className="h-full w-full rounded-lg bg-white shadow-default">
        <CallsTable calls={mockCalls} />
      </div>
    </main>
  );
}

export default App;
