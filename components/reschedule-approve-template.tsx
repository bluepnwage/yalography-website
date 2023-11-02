type PropTypes = {
  firstName: string;
  lastName: string;
  date: string;
  time: string;
};
export function RescheduleApproveTemplate({ date, firstName, lastName, time }: PropTypes) {
  return (
    <>
      <p>
        Dear {firstName} {lastName},
      </p>

      <p>
        We are pleased to inform you that your request to reschedule your booking has been approved. The new
        details for your reservation are as follows:
      </p>
      <ul>
        <li> Date: {date}</li>
        <li> Time: {time}</li>
      </ul>

      <p>
        We appreciate your understanding and cooperation in this matter. If you have any further questions or
        need assistance, please feel free to contact us.
      </p>

      <p>Best regards,</p>
      <p>Yalography</p>
    </>
  );
}
