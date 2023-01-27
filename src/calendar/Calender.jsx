import { useState } from "react";
// import veggie from "../../data/veggie";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DateTime } from "luxon";

export default function Calendar() {
  const frostDate = "2023-04-11";
  console.log(frostDate);
  let dt = DateTime.fromObject({ year: 2023, month: 4, day: 11 })
    .minus({ days: 35 })
    .toISODate();
  // dt.minus({ days: 35 });
  console.log(dt, "check");
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = (selected) => {
    const title = prompt("please enter new title for event");
    const calendarApi = selected.veiew.calendar;
    calendarApi.unselected();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };
  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };
  return (
    <div className="">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        initialView="dayGridWeek"
        editable={true}
        selectable={true}
        dayMaxEvent={true}
        select={handleDateClick}
        eventClick={handleEventClick}
        eventsSet={(events) => setCurrentEvents(events)}
        initialEvents={[{ id: "1a", title: "seed spinach", date: dt }]}
      />
    </div>
  );
}
