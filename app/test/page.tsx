"use client";
import { Dialog } from "@components/shared/Dialog";
import { Button } from "@components/shared/Button";
import { useToggle } from "@lib/hooks/useToggle";
export default function DemoPage() {
  const [dialog, toggle] = useToggle();
  return (
    <>
      <p>Hello there</p>
      <Button onClick={toggle.on}>Test</Button>
      <Dialog title="Test dialog" open={dialog} onOpenChange={toggle.set} />
    </>
  );
}
