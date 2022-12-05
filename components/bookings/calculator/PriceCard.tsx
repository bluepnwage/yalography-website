"use client";
import type { Photoshoot } from "@lib/photoshoot";
import { useState } from "react";
import type { ChangeEventHandler, ComponentPropsWithoutRef } from "react";
import { capitalize } from "@util/capitalize";
import type { FeatureSpec, FeatureType } from "@lib/features";
type PropTypes = {
  environment: "outdoor" | "indoor";
  children?: React.ReactNode;
  photoshoot: Omit<Photoshoot, "_time">;
};

export function PriceCard({ photoshoot, environment, children }: PropTypes) {
  const [numOfPictures, setPictures] = useState(photoshoot.pictures);
  const [hours, setHours] = useState(1);
  const [features, setFeatures] = useState<{ [name: string]: boolean }>({});
  const totalPrice = photoshoot.total(environment, numOfPictures, hours, features);
  const environmentLabel = capitalize(environment);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.currentTarget.name);
    if (e.currentTarget.name === "pictures") {
      setPictures(parseInt(e.currentTarget.value));
    } else {
      setHours(parseInt(e.currentTarget.value));
    }
  };

  const addFeatures: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, checked } = e.currentTarget;
    setFeatures((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="bg-white ring-1 ring-black ring-opacity-5 dark:ring-0 dark:bg-zinc-800 rounded-md p-4 space-y-4">
      <p className="font-semibold text-xl text-center">{photoshoot.type}</p>
      {typeof photoshoot[environment] === "number" && (
        <RangeInput
          label={`Pictures: ${numOfPictures}`}
          id="pictures"
          min={photoshoot.pictures}
          max={photoshoot.maxPictures}
          defaultValue={photoshoot.pictures}
          onChange={handleChange}
          name={"pictures"}
          className="accent-red-500 w-full"
        />
      )}

      <p>Time: {photoshoot.time}</p>
      {photoshoot.time === "Hourly" && (
        <RangeInput
          label={`Hours: ${hours}`}
          id="hours"
          min={1}
          max={6}
          defaultValue={1}
          name={"hours"}
          onChange={handleChange}
        />
      )}

      <p>{`${environmentLabel} price: $${photoshoot[environment]}`}</p>
      <fieldset className="space-y-5">
        <legend className="font-semibold text-xl">Features:</legend>
        {photoshoot.features.map((feature, key) => {
          const inputId = feature.label.toLowerCase().replaceAll(" ", "_");
          return (
            <p key={key}>
              <label htmlFor={inputId}>{feature.label}</label>
              <input
                onChange={addFeatures}
                aria-describedby={`${inputId}-description`}
                id={inputId}
                name={inputId}
                value={feature.price}
                className="accent-red-600 w-7 h-7"
                type={"checkbox"}
              />
              <span id={`${inputId}-description`}>{feature.description}</span>
            </p>
          );
        })}
      </fieldset>
      <p>Total: ${totalPrice}</p>
      {children}
    </div>
  );
}

type InputPropTypes = Omit<ComponentPropsWithoutRef<"input">, "type"> & { label: string };

function RangeInput({ ...props }: InputPropTypes) {
  return (
    <p>
      <label htmlFor={props.id}>{props.label}</label>
      <input {...props} type={"range"} className="accent-red-500 w-full" />
    </p>
  );
}
