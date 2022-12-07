import { Anchor } from "@components/shared";

export default function Testing() {
  return (
    <>
      <Anchor href={"/admin/reservations/approved"}>← Go back</Anchor>
      <p>Agis Carty</p>
      <p>Email: email@gmail.com</p>
      <p>Phone number: 0690 555 55555</p>
      <p>Photoshoot type: Wedding</p>
      <p>Status: approved</p>
      <p>21/07/2022. 13:00h</p>
      <p>Selected features:</p>
      <ul className="list-disc pl-4">
        <li>Decor</li>
        <li>Assistant</li>
        <li>Makeup</li>
      </ul>
      <p>Total: $5075</p>
    </>
  );
}
