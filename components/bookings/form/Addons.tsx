import type { FeatureSpec } from "@lib/features";
import type { FormEvent } from "react";

type PropTypes = {
  checked: boolean;
  value: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  feature: FeatureSpec;
};

export function Addon({ checked, onChange, value, feature }: PropTypes) {
  return (
    <div
      className={`flex border duration-200 ease-out p-4 items-center gap-4 rounded-md ${
        checked ? "border-red-600 dark:border-red-500" : "border-zinc-400 dark:border-zinc-700"
      }`}
    >
      <input
        checked={checked}
        value={value}
        onChange={onChange}
        type={"checkbox"}
        className="h-5 w-5 cursor-pointer accent-red-600"
      />
      <div className="grow">
        <div className="flex justify-between">
          <strong className="font-semibold">{feature.label}</strong>
          <p>+${feature.price}</p>
        </div>
        <p className="text-gray-400">{feature.description}</p>
      </div>
    </div>
  );
}
