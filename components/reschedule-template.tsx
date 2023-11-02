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
      Dear {firstName} {lastName}, <br /> Your phototoshoot reservation for {date} {time} has to be
      rescheduled. <br />
      Unfortunately, we&apos;re either over booked or unavailable on that day. <br /> We understand that this
      may be disappointing, and we apologize for any inconvenience this may have caused. <br />{" "}
      <span className="block mb-1">Available dates</span>
      <ul>
        {dates.map(date => {
          return <li key={date}>{date}</li>;
        })}
      </ul>{" "}
      <br /> <br /> Best regards, <br /> Yalography
    </p>
  );
}
