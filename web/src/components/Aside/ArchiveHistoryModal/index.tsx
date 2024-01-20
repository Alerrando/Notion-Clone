import { Key } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../../context";
import { EventLog } from "../../../context/types";

export function ArchiveHistoryModal() {
  const { user, eventLog } = useAuth();

  console.log(eventLog);

  return (
    <div className="h-2/4 w-2/4 fixed top-[30%] left-[18.8%] border border-zinc-200 bg-white shadow-lg rounded-2xl">
      <header className="w-full h-auto py-2 px-6 flex items-center justify-start border-b border-zinc-200">
        <span className="text-md text-black relative cursor-pointer hover:bg-zinc-200 after:block after:w-full after:h-[2px] after:absolute after:-bottom-2 after:bg-black">
          Todos
        </span>
      </header>

      <section className="w-full h-full flex flex-col items-center divide-y-2">
        {eventLog.length > 0 &&
          eventLog
            .filter((event: EventLog) => event.userId === user.id)
            .map((event: EventLog, index: Key) => (
              <div
                className="w-full h-auto flex flex-row gap-2 items-center justify-start p-4 border-b border-zinc-200"
                key={index}
              >
                <FaUserCircle className="w-7 h-7 text-white md:text-[#2e2e2f] dark:text-zinc-200" />

                <div className="h-full flex flex-col items-start justify-start gap-1">
                  <span className="text-black text-sm">{event.eventType}</span>

                  <span className="text-black text-sm opacity-60">Há alguns minutos</span>
                </div>
              </div>
            ))}
      </section>
    </div>
  );
}
