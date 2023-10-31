type PropTypes = {
  firstName: string;
  lastName: string;
};
export function DeleteTemplate({ firstName, lastName }: PropTypes) {
  return (
    <p>
      Dear {firstName} {lastName}, <br /> We regret to inform you that your photoshoot reservation will need
      to be cancelled. We apologize for any inconvenience this may have caused, and we will be happy to assist
      you in rescheduling a new session at your convenience. <br /> If you have any questions or concerns,
      please do not hesitate to contact us. We apologize again for the inconvenience, and we hope to work with
      you in the future. <br /> Best regards, <br /> Yalograhpy
    </p>
  );
}
