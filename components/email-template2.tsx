type PropTypes = {
  firstName: string;
  lastName: string;
  description: string;
  phone: string;
  email: string;
};

export function EmailTemplate({ description, firstName, lastName, email, phone }: PropTypes) {
  return (
    <>
      <p>
        New email from {firstName} {lastName}:
      </p>
      <p>{description}</p>
      <p>Contact information:</p>
      <ul>
        <li>Email: {email}</li>
        <li>Phone number: {phone}</li>
      </ul>
    </>
  );
}
