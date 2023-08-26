"use client";
import { cx } from "cva";
import { ActionIcon } from "@aomdev/ui";
import { IconSun, IconMoonStars, IconDeviceDesktop } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Dropdown } from "@aomdev/ui";
import { useState, useRef } from "react";

export function ThemeSwitcher() {
  const { setTheme } = useTheme();
  const top = useRef(0);
  const [open, setOpen] = useState(false);
  const onSelect = (value: Event) => {};

  const onChange = (val: boolean) => {
    if (val) {
      top.current = window.scrollY;
    }
    setOpen(val);
  };

  return (
    <Dropdown modal={false} open={open} onOpenChange={onChange}>
      <Dropdown.Trigger asChild>
        <ActionIcon size={"lg"}>
          <IconMoonStars size={"75%"} className="hidden dark:inline-block" />{" "}
          <IconSun className="dark:hidden inline-block" size={"75%"} />
        </ActionIcon>
      </Dropdown.Trigger>
      <Dropdown.Content className="z-[500]">
        <Dropdown.Item textValue="light" onSelect={onSelect} icon={<IconSun size={16} />}>
          Light
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setTheme("dark")} icon={<IconMoonStars size={16} />}>
          Dark
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setTheme("system")} icon={<IconDeviceDesktop size={16} />}>
          System
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
