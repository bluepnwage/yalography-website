type PropTypes = {
  firstName: string;
  lastName: string;
  date: string;
  time: string;
};
export function RescheduleTemplate({ firstName, lastName, date, time }: PropTypes) {
  return (
    <p>
      Dear {firstName} {lastName}, <br /> Your phototoshoot reservation for {date} {time} has been
      rescheduled. <br />
      Unfortunately, we&apos;re either over booked or unavailable on that day. <br /> We understand that this
      may be disappointing, and we apologize for any inconvenience this may have caused. <br /> <br /> Best
      regards, <br /> Yalography
    </p>
  );
}
