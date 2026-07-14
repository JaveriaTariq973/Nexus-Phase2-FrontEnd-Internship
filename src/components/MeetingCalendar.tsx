import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Meeting {
  id: string;
  date: string;
  title: string;
  status: "pending" | "accepted" | "declined";
}

export default function MeetingCalendar() {
  const [date, setDate] = useState(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([
    { id: "1", date: new Date().toDateString(), title: "Investor Call - Ali", status: "pending" },
  ]);
  const [title, setTitle] = useState("");

  const addMeeting = () => {
    if (!title.trim()) return;
    setMeetings([...meetings, {
      id: Date.now().toString(),
      date: date.toDateString(),
      title,
      status: "pending",
    }]);
    setTitle("");
  };

  const updateStatus = (id: string, status: Meeting["status"]) => {
    setMeetings(meetings.map(m => m.id === id ? { ...m, status } : m));
  };

  const todaysMeetings = meetings.filter(m => m.date === date.toDateString());

  return (
    <div className="grid md:grid-cols-2 gap-6 p-4">
      <div>
        <Calendar onChange={(v) => setDate(v as Date)} value={date} className="rounded-lg shadow" />
        <div className="mt-4 flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Meeting title..."
            className="border rounded px-3 py-2 flex-1"
          />
          <button onClick={addMeeting} className="bg-blue-600 text-white px-4 py-2 rounded">
            Request Meeting
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Meetings on {date.toDateString()}</h3>
        {todaysMeetings.length === 0 && <p className="text-gray-400">No meetings scheduled.</p>}
        {todaysMeetings.map(m => (
          <div key={m.id} className="border rounded p-3 mb-2 flex justify-between items-center">
            <div>
              <p className="font-medium">{m.title}</p>
              <span className={`text-xs px-2 py-1 rounded ${
                m.status === "accepted" ? "bg-green-100 text-green-700" :
                m.status === "declined" ? "bg-red-100 text-red-700" :
                "bg-yellow-100 text-yellow-700"
              }`}>{m.status}</span>
            </div>
            {m.status === "pending" && (
              <div className="flex gap-2">
                <button onClick={() => updateStatus(m.id, "accepted")} className="text-green-600 text-sm">Accept</button>
                <button onClick={() => updateStatus(m.id, "declined")} className="text-red-600 text-sm">Decline</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}