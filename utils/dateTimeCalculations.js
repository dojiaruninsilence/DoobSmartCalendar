import moment from "moment";

// format date from separate integers into a string
export const formatDateTime = (month, day, year, hours, minutes) => {
    // ensure that the components are two digits
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // need to add some formatting for the year

    // format to string
    return `${formattedMonth}/${formattedDay}/${year} ${formattedHours}:${formattedMinutes}`;
};

// format date from a string into separate integers
export const separateDateTime = (dateTimeString) => {
    const [datePart, timePart] = dateTimeString.split(' ');
    const [month, day, year] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);

    return { month, day, year, hours, minutes };
};

export const separateDate = (dateString) => {
    const dateStr = moment(dateString).format('YYYY-MM-DD');
    const [year, month, day] = dateStr.split('-').map(Number);

    return { year, month, day }
}

// function to calculate the difference between two date-time values
export const calculateDifference = (start, end) => {
    const startDate = moment(start, 'MM/DD/YYYY HH:mm');
    const endDate = moment(end, 'MM/DD/YYYY HH:mm');

    const duration = moment.duration(endDate.diff(startDate));

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();

    return { days, hours, minutes }
};

// function to add or subtract days, hours, and minutes to a given date-time value
export const modifyDateTime = (dateTime, days, hours, minutes) => {
    let date = moment(dateTime, 'MM/DD/YYYY HH:mm');

    date = date.add(days, 'days').add(hours, 'hours').add(minutes, 'minutes');

    return date.format('MM/DD/YYYY HH:mm');
};