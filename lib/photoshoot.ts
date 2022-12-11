import { capitalize } from "@util/capitalize";
import { photoshootFeatures } from "./features";
import type { FeatureType, FeatureSpec } from "./features";

type ShootTypes =
  | "Sweet 16"
  | "Babyshoot"
  | "Engagement shoot"
  | "Pregnancy"
  | "Family"
  | "Event"
  | "Ad shoot"
  | WeddingTypes
  | "Regular shoot"
  | "Kids party shoot";

type WeddingTypes = "Wedding Bronze" | "Wedding Silver" | "Wedding Gold" | "Wedding Signing" | "Destination Wedding";
type PhotoShootTime = number | "hourly" | "day";

export class Photoshoot {
  type: ShootTypes;
  indoor: number | string;
  outdoor: number | string;
  pictures: number;
  private _features: FeatureSpec[];
  maxPictures: number;
  private _time: PhotoShootTime;
  constructor(
    type: ShootTypes,
    indoorPricing: number | string,
    outdoorPricing: number | string,
    pictureAmount: number,
    time: PhotoShootTime,
    ...features: FeatureType[]
  ) {
    this.type = type;
    this.indoor = indoorPricing;
    this.outdoor = outdoorPricing;
    this.pictures = pictureAmount;
    this._features = features.map((feature) => photoshootFeatures.get(feature)!);
    this._time = time;
    this.maxPictures = this.pictures < 100 ? this.pictures + (100 - this.pictures) : this.pictures + 100;
  }
  get time() {
    return typeof this._time === "number" ? `${this._time / 3600}h` : capitalize(this._time);
  }
  get features() {
    const included: FeatureSpec[] = [];
    const paid: FeatureSpec[] = [];

    for (const feature of this._features) {
      if (feature.price === 0) {
        included.push(feature);
      } else {
        paid.push(feature);
      }
    }
    return { included, paid };
  }
}

const adShoot = new Photoshoot("Ad shoot", "200/h", "200/h", 50, "hourly");
const babyshoot = new Photoshoot("Babyshoot", 150, 200, 8, 60 * 60 * 2, "decor");
const familyShoot = new Photoshoot("Family", 300, 400, 8, 60 * 60, "added_person");
const eventShoot = new Photoshoot("Event", "200/h", "200/h", 100, "hourly", "flash_drive");
const pregnancyShoot = new Photoshoot(
  "Pregnancy",
  200,
  225,
  8,
  60 * 60 * 1.5,
  "decor",
  "headpiece",
  "soft_glam_makeup",
  "quick_hairstyles",
  "spouse",
  "wig_rental"
);
const sweetSixTeenShoot = new Photoshoot("Sweet 16", 150, 200, 8, 60 * 60, "decor");
const regularShoot = new Photoshoot("Regular shoot", 200, 250, 8, 60 * 60);
const kidsParty = new Photoshoot("Kids party shoot", "150/h", "150/h", 100, "hourly", "flash_drive");
const weddingBronze = new Photoshoot(
  "Wedding Bronze",
  1500,
  1500,
  200,
  "day",
  "flash_drive",
  "quick_hairstyles",
  "assistant"
);
const weddingSilver = new Photoshoot(
  "Wedding Silver",
  2000,
  2000,
  250,
  "day",
  "flash_drive",
  "quick_hairstyles",
  "assistant"
);
const weddingGold = new Photoshoot(
  "Wedding Gold",
  2500,
  2500,
  300,
  "day",
  "flash_drive",
  "quick_hairstyles",
  "assistant"
);
const weddingSignin = new Photoshoot(
  "Wedding Signing",
  400,
  400,
  50,
  "day",
  "flash_drive",
  "quick_hairstyles",
  "assistant"
);

export const photoshootPricing = [
  adShoot,
  babyshoot,
  familyShoot,
  eventShoot,
  pregnancyShoot,
  sweetSixTeenShoot,
  regularShoot,
  kidsParty,
  weddingBronze,
  weddingSilver,
  weddingGold,
  weddingSignin
];
