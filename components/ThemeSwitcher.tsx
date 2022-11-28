"use client";
export function ThemeSwitcher() {
  const onToggle = () => {
    const html = document.documentElement;
    if (html.className.includes("dark")) {
      html.className = "font-sans light-mode";
    } else {
      html.className = "font-sans dark dark-mode";
    }
  };
  return (
    <button onClick={onToggle} className="w-16 h-16 rounded-md font-semibold">
      Toggle
    </button>
  );
}
