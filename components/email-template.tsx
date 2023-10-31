"use client";

type PropTypes = {
  firstName: string;
  lastName: string;
  type: string;
  date: string;
  location: string;
  time: string;
  email: string;
  bookingId: string;
  url: string;
};

export function EmailTemplate({ firstName, lastName, email, bookingId, url }: PropTypes) {
  return (
    <>
      <p>
        Dear {firstName} {lastName},<br /> We are pleased to confirm that your reservation has been
        successfully submitted. An email confirming your booking date will be sent as soon as possible. Thank
        you for choosing Yalography. <br /> If, for any reason, you wish to cancel your reservation, please
        click the following link: <a href={`${url}/bookings/cancel?id=${bookingId}`}>Cancel Reservation</a>
        <br />
        <br />
        Best regards, <br />
        Yalography
      </p>
    </>
  );
}
