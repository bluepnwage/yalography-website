"use client";

type PropTypes = {
  firstName: string;
  lastName: string;
  type: string;
  date: string;
  location: string;
  time: string;
  email: string;
  bookingId: number;
  url: string;
};

export function EmailTemplate({
  type,
  date,
  location,
  time,
  firstName,
  lastName,
  email,
  bookingId,
  url
}: PropTypes) {
  return (
    <>
      <p>You have a new {type} request. Below are the details:</p>
      <ul>
        <li>Date: {date}</li>
        <li>Time: {time}</li>
        <li>Location: {location}</li>
        <li>
          Customer: {firstName} {lastName}
        </li>
        <li>Customer email: {email}</li>
      </ul>
      <p>
        If you would like to cancel your booking request,{" "}
        <a href={`${url}/bookings/cancel?id=${bookingId}`}>click here</a>
      </p>
    </>
  );
}
