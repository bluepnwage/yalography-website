"use client";
import { useState } from "react";
import { photoshootPricing } from "@lib/photoshoot";
import { MantineProvider, Select, Radio } from "@mantine/core";
import { Button } from "@components/shared";
import { PriceCard } from "./PriceCard";

type EnvironmentTypes = "outdoor" | "indoor";

export function PriceCalculator() {
  const [selectedService, setService] = useState<string | null>(null);
  const [environment, setEnvironment] = useState<"outdoor" | "indoor">("indoor");
  // const [loading, setLoading] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const calculatePrice = async () => {
    if (!selectedService) return;
    try {
      setShowPrice(true);
    } catch (error) {
    } finally {
    }
  };

  const resetForm = () => {
    setService(null);
    setEnvironment("indoor");
    setShowPrice(false);
  };
  const service = photoshootPricing.find((s) => s.type === selectedService);
  return (
    <>
      <MantineProvider theme={{ colorScheme: "dark", primaryColor: "red" }}>
        {!showPrice && (
          <div className="bg-zinc-800 rounded-md p-5">
            <Select
              label={"Photoshoot type"}
              onChange={setService}
              data={photoshootPricing.map((price) => ({ value: price.type, label: price.type }))}
            />
            <Radio.Group
              label="Where will the photoshoot take place?"
              value={environment}
              onChange={(value) => setEnvironment(value as EnvironmentTypes)}
            >
              <Radio value={"outdoor"} label={"Outdoor"} />
              <Radio value={"indoor"} label={"Indoor"} />
            </Radio.Group>
            <Button disabled={!selectedService} onClick={calculatePrice}>
              Calculate price
            </Button>
          </div>
        )}
        {showPrice && service && (
          <PriceCard photoshoot={service} environment={environment}>
            <div className="flex">
              <Button className="grow" intent={"secondary"} onClick={resetForm}>
                Resert form
              </Button>
              <Button className="grow">Submit</Button>
            </div>
          </PriceCard>
        )}
      </MantineProvider>
    </>
  );
}
