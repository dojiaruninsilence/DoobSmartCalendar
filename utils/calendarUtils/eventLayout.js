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

    return eventLayouts;
};