import { getFeatures } from "./features";

export type ShootTypes =
  | "Sweet 16"
  | "Babyshoot"
  | "Engagement"
  | "Pregnancy"
  | "Family"
  | "Event"
  | "Ad shoot"
  | WeddingTypes
  | "Regular shoot"
  | "Kids party shoot";

type WeddingTypes =
  | "Wedding Bronze"
  | "Wedding Silver"
  | "Wedding Gold"
  | "Wedding Signing"
  | "Destination Wedding";
type PhotoShootTime = number | "hourly" | "day";

export type PhotoShootType = {
  label: ShootTypes;
  features: ReturnType<typeof getFeatures>;
  time: PhotoShootTime; //Time in seconds
  environmentPrice: {
    outdoor: number | "N/A";
    indoor: number | "N/A";
  };
};

function setEnvironmentPricing(indoor: number, outdoor: number) {
  return {
    indoor,
    outdoor
  };
}

export const photoshootTypes = new Map<Lowercase<ShootTypes>, PhotoShootType>();

photoshootTypes.set("ad shoot", {
  label: "Ad shoot",
  features: [],
  time: "hourly",
  environmentPrice: setEnvironmentPricing(200, 200)
});
photoshootTypes.set("babyshoot", {
  label: "Babyshoot",
  features: getFeatures("decor"),
  time: 60 * 60 * 2,
  environmentPrice: setEnvironmentPricing(150, 200)
});
photoshootTypes.set("engagement", {
  label: "Engagement",
  features: getFeatures("decor", "proposal_video", "quick_hairstyles"),
  time: 60 * 60,
  environmentPrice: setEnvironmentPricing(300, 300)
});
photoshootTypes.set("event", {
  label: "Event",
  features: getFeatures("flash_drive"),
  time: 0,
  environmentPrice: setEnvironmentPricing(200, 200)
});
photoshootTypes.set("family", {
  label: "Family",
  features: getFeatures("added_person"),
  time: 60 * 60,
  environmentPrice: setEnvironmentPricing(300, 400)
});
photoshootTypes.set("kids party shoot", {
  label: "Kids party shoot",
  features: getFeatures("flash_drive"),
  time: "hourly",
  environmentPrice: setEnvironmentPricing(150, 150)
});
photoshootTypes.set("pregnancy", {
  label: "Pregnancy",
  features: getFeatures(
    "dress_rental",
    "headpiece",
    "wig_rental",
    "quick_hairstyles",
    "spouse",
    "soft_glam_makeup"
  ),
  time: 60 * 60 * 1.5,
  environmentPrice: setEnvironmentPricing(200, 225)
});
photoshootTypes.set("regular shoot", {
  label: "Regular shoot",
  features: [],
  time: 60 * 60,
  environmentPrice: setEnvironmentPricing(200, 250)
});
photoshootTypes.set("sweet 16", {
  label: "Sweet 16",
  features: getFeatures("decor"),
  time: 60 * 60,
  environmentPrice: setEnvironmentPricing(150, 200)
});
photoshootTypes.set("wedding bronze", {
  label: "Wedding Bronze",
  features: getFeatures("assistant", "quick_hairstyles", "flash_drive"),
  time: "day",
  environmentPrice: setEnvironmentPricing(1500, 1500)
});
photoshootTypes.set("wedding silver", {
  label: "Wedding Silver",
  features: getFeatures("assistant", "quick_hairstyles", "flash_drive"),
  time: "day",
  environmentPrice: setEnvironmentPricing(2000, 2000)
});
photoshootTypes.set("wedding gold", {
  label: "Wedding Gold",
  features: getFeatures("assistant", "quick_hairstyles", "flash_drive"),
  time: "day",
  environmentPrice: setEnvironmentPricing(2500, 2500)
});
photoshootTypes.set("destination wedding", {
  label: "Destination Wedding",
  features: [],
  time: "day",
  environmentPrice: setEnvironmentPricing(5000, 5000)
});
