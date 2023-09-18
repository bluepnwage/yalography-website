"use client";

type PropTypes = {
  firstName: string;
  lastName: string;
  type: string;
  date: string;
  location: string;
  time: string;
  email: string;
};

export function EmailTemplate({ type, date, location, time, firstName, lastName, email }: PropTypes) {
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
    </>
  );
}
