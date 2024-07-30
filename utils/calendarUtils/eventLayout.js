import { separateDate } from "../dateTimeCalculations";

export const calculateEventLayout = (events, startHour, totalHours) => {
    const endHour = startHour + totalHours;

    // filter events based on start and end hour
    events = events.filter(event =>
        (event.start_time_hour >= startHour && event.start_time_hour < endHour) ||
        (event.end_time_hour > startHour && event.end_time_hour <= endHour) ||
        (event.start_time_hour < startHour && event.end_time_hour > endHour)
    );

    // adjust event times to fit within the scope
    events = events.map(event => {
        const adjustedEvent = { ...event };
        if (adjustedEvent.start_time_hour < startHour) {
            adjustedEvent.start_time_hour = startHour;
            adjustedEvent.start_time_minute = 0;
        }
        if (adjustedEvent.end_time_hour > endHour) {
            adjustedEvent.end_time_hour = endHour;
            adjustedEvent.end_time_minute = 0;
        }
        return adjustedEvent;
    });

    // sort event by start time
    events.sort((a, b) => {
        if (a.start_time_hour !== b.start_time_hour) {
            return a.start_time_hour - b.start_time_hour;
        }
        return a.start_time_minute - b.start_time_minute;
    });

    const columns = [];
    const eventLayouts = events.map(event => ({
        ...event,
        top: ((event.start_time_hour * 60 + event.start_time_minute) - (startHour * 60)) / (totalHours * 60) * 100,
        height: ((event.end_time_hour * 60 + event.end_time_minute) - (event.start_time_hour * 60 + event.start_time_minute)) / (totalHours * 60) * 100,
    }));

    eventLayouts.forEach(event => {
        let placed = false;

        for (let i = 0; i < columns.length; i++) {
            if (columns[i].every(colEvent => event.end_time_hour < colEvent.start_time_hour || event.start_time_hour >= colEvent.end_time_hour)) {
                columns[i].push(event);
                event.column = i;
                placed = true;
                break;
            }
        }

        if (!placed) {
            columns.push([event]);
            event.column = columns.length - 1;
        }
    });

    const numberOfColumns = columns.length;

    return { eventLayouts, numberOfColumns };
};

export const calculateEventLayoutThreeDay = (events, currentDate) => {
    const { year, month, day } = separateDate(currentDate);

    const prevEvents = events.filter(event => (
        event.start_date_year === year &&
        event.start_date_month === month &&
        event.start_date_day === (day - 1)
    ));

    const currentEvents = events.filter(event => (
        event.start_date_year === year &&
        event.start_date_month === month &&
        event.start_date_day === (day)
    ));

    const nextEvents = events.filter(event => (
        event.start_date_year === year &&
        event.start_date_month === month &&
        event.start_date_day === (day + 1)
    ));

    const {
        eventLayouts: prevEventLayouts,
        numberOfColumns: prevNumberOfColumns
    } = calculateEventLayout(prevEvents, 0, 24);
    
    const {
        eventLayouts: currentEventLayouts,
        numberOfColumns: currentNumberOfColumns
    } = calculateEventLayout(currentEvents, 0, 24);

    const {
        eventLayouts: nextEventLayouts,
        numberOfColumns: nextNumberOfColumns
    } = calculateEventLayout(nextEvents, 0, 24);

    return {
        prevEventLayouts, prevNumberOfColumns,
        currentEventLayouts, currentNumberOfColumns,
        nextEventLayouts, nextNumberOfColumns
    };
};

export const calculateEventLayoutWeek = (events, date) => {
    const { year, month, day } = separateDate(date);
    const startHour = 0;
    const totalHours = 24; // Total hours in a day
    const endHour = startHour + totalHours;

    // filter events based on date
    events = events.filter(event => (
        event.start_date_year === year &&
        event.start_date_month === month &&
        event.start_date_day === day
    ));

    // adjust event times to fit within the scope
    events = events.map(event => {
        const adjustedEvent = { ...event };
        if (adjustedEvent.start_time_hour < startHour) {
            adjustedEvent.start_time_hour = startHour;
            adjustedEvent.start_time_minute = 0;
        }
        if (adjustedEvent.end_time_hour > endHour) {
            adjustedEvent.end_time_hour = endHour;
            adjustedEvent.end_time_minute = 0;
        }
        return adjustedEvent;
    });

    // sort event by start time
    events.sort((a, b) => {
        if (a.start_time_hour !== b.start_time_hour) {
            return a.start_time_hour - b.start_time_hour;
        }
        return a.start_time_minute - b.start_time_minute;
    });

    const eventLayouts = events.map(event => ({
        ...event,
        left: ((event.start_time_hour * 60 + event.start_time_minute) - (startHour * 60)) / (totalHours * 60) * 100,
        width: ((event.end_time_hour * 60 + event.end_time_minute) - (event.start_time_hour * 60 + event.start_time_minute)) / (totalHours * 60) * 100,
    }));

    return eventLayouts;
};

export const calculateEventLayoutMonthDay = (events, date) => {
    const { year, month, day } = separateDate(date);

    // filter events based on date
    const dayEvents = events.filter(event => (
        event.start_date_year === year &&
        event.start_date_month === month &&
        event.start_date_day === day
    ));

    return dayEvents;
};

export const calculateEventLayoutMonthHour = (dayEvents, hour) => {
    const startHour = hour;
    const endHour = hour + 1;

    const eventLayouts = dayEvents.filter(event =>
        (event.start_time_hour >= startHour && event.start_time_hour < endHour) || // Event starts within the hour range
        (event.end_time_hour > startHour && event.end_time_hour <= endHour) || // Event ends within the hour range
        (event.start_time_hour < startHour && event.end_time_hour > endHour) || // Event spans across the hour range
        (event.start_time_hour < endHour && event.end_time_hour > startHour) // Event spans across multiple hours    
    );

    return eventLayouts;
};

// new function for sorting and limiting events
const compareEvents = (a, b) => {
    // sort by priority (importance)
    if (a.importance !== b.importance) {
        return a.importance - b.importance;
    }
    // sort by date and time
    if (a.start_date_year !== b.start_date_year) {
        return a.start_date_year - b.start_date_year;
    }
    if (a.start_date_month !== b.start_date_month) {
        return a.start_date_month - b.start_date_month;
    }
    if (a.start_date_day !== b.start_date_day) {
        return a.start_date_day - b.start_date_day;
    }
    if (a.start_time_hour !== b.start_time_hour) {
        return a.start_time_hour - b.start_time_hour;
    }
    if (a.start_time_minute !== b.start_time_minute) {
        return a.start_time_minute - b.start_time_minute;
    }
    // sort alphabetically by title
    return a.title.localeCompare(b.title);
};

export const sortAndLimitEvents = (events, limit) => {
    const sortedEvents = [...events].sort(compareEvents);
    return sortedEvents.slice(0, limit);
};