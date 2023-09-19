"use client";
import { ActionIcon } from "@aomdev/ui";
import { IconSun, IconMoonStars, IconDeviceDesktop } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Dropdown } from "@aomdev/ui";

export function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <Dropdown modal={false}>
      <Dropdown.Trigger asChild>
        <ActionIcon size={"lg"} aria-label="Change theme">
          <IconMoonStars size={"75%"} className="hidden dark:inline-block" />{" "}
          <IconSun className="dark:hidden inline-block" size={"75%"} />
        </ActionIcon>
      </Dropdown.Trigger>
      <Dropdown.Content className="z-[500]">
        <Dropdown.Item textValue="light" onSelect={() => setTheme("light")} icon={<IconSun size={16} />}>
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
