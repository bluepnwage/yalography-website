type PropTypes = {
  firstName: string;
  lastName: string;
  dates: string[];
  time: string;
  date: string;
};
export function RescheduleTemplate({ firstName, lastName, dates, date, time }: PropTypes) {
  return (
    <p>
      Dear {firstName} {lastName}, <br /> We apologize for the inconvenience, but we regret to inform you that
      your photoshoot reservation for {date}, {time} will need to be rescheduled. Unfortunately, we are either
      over booked or unavailable on that day.
      <br /> We understand that this may be disappointing, and we apologize for any inconvenience this may
      have caused. <br /> <span className="block mb-1">Available dates:</span>
      <ul>
        {dates.map(date => {
          return <li key={date}>{date}</li>;
        })}
      </ul>{" "}
      <br /> <br /> Best regards, <br /> Yalography
    </p>
  );
}
