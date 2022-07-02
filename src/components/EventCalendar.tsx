import { Calendar } from "antd";
import { Moment } from "moment";
import { FC } from "react";
import { IEvent } from "../models/IEvent";
import { formatDate } from "../utils/date";

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
    const dateCellRender = (value: Moment) => {
        const formatedDate = formatDate(value.toDate());
        const currentDayEvents = props.events.filter(e => e.date === formatedDate);
        return (
            <ul className="events">
                {currentDayEvents.map((event, index) => (
                    <li key={index}>
                        {event.description}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <Calendar dateCellRender={dateCellRender} />
    );
};

export default EventCalendar;