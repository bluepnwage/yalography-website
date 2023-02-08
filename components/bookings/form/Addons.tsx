"use client";
import type { FeatureSpec } from "@lib/features";
import type { FormEvent } from "react";
import { useId } from "react";
import { Checkbox } from "@components/shared/Checkbox";
type PropTypes = {
  checked: boolean;
  value: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  feature: FeatureSpec;
};

export function Addon({ checked, onChange, value, feature }: PropTypes) {
  const inputID = useId();
  return (
    <label
      htmlFor={`${value}-checkbox`}
      className={`flex border duration-200 ease-out cursor-pointer p-4 items-center gap-4 rounded-md ${
        checked ? "border-red-600 dark:border-red-500" : "border-zinc-400 dark:border-zinc-700"
      }`}
    >
      <p className="flex items-center justify-center basis-1/12">
        <Checkbox
          id={`${value}-checkbox`}
          checked={checked}
          value={value}
          onChange={onChange}
          type={"checkbox"}
          name="features"
          aria-describedby={inputID}
        />
      </p>
      <div className="grow basis-11/12">
        <div className="flex justify-between">
          <span className="font-semibold">{feature.label}</span>
        </div>
        <p id={inputID} className="text-gray-400">
          {feature.description}
        </p>
      </div>
    </label>
  );
}
