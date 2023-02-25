"use client";
import { Dialog } from "@components/shared/Dialog";
import { Button } from "@components/shared/Button";
import { useToggle } from "@lib/hooks/useToggle";
import { Dropdown } from "@components/shared/Dropdown";
export default function DemoPage() {
  const [dialog, toggle] = useToggle();
  return (
    <>
      <p>Hello there</p>
      <Button onClick={toggle.on}>Test</Button>
      <Dialog title="Test dialog" open={dialog} onOpenChange={toggle.set} />
      <Dropdown>
        <Dropdown.Trigger>
          <button className="px-4 py-2 bg-red-500 rounded-md">Hello there</button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Hello there</Dropdown.Item>
          <Dropdown.Item>Hello there 2</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </>
  );
}
