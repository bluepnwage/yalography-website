import { capitalize } from "@util/capitalize";

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
  features: string[];
  maxPictures: number;
  private _time: PhotoShootTime;
  constructor(
    type: ShootTypes,
    indoorPricing: number | string,
    outdoorPricing: number | string,
    pictureAmount: number,
    time: PhotoShootTime,
    ...features: string[]
  ) {
    this.type = type;
    this.indoor = indoorPricing;
    this.outdoor = outdoorPricing;
    this.pictures = pictureAmount;
    this.features = features;
    this._time = time;
    this.maxPictures = this.pictures < 100 ? this.pictures + (100 - this.pictures) : this.pictures + 100;
  }
  get time() {
    return typeof this._time === "number" ? `${this._time / 3600}h` : capitalize(this._time);
  }
  total(environment: "outdoor" | "indoor", pictureAmount: number, hours: number) {
    let environmentPricing = this[environment];
    if (this._time === "hourly" && typeof environmentPricing === "string") {
      return this.hourlyTotal(hours, environmentPricing);
    }
    if (typeof environmentPricing === "string") return environmentPricing;
    if (this.pictures === pictureAmount) return environmentPricing;
    let addedPictures = pictureAmount - this.pictures;
    for (let i = 0; i < addedPictures; i++) {
      environmentPricing += 15;
    }
    return environmentPricing;
  }
  private hourlyTotal(hours: number, environmentPricing: string) {
    return parseInt(environmentPricing) * hours;
  }
}

const adShoot = new Photoshoot("Ad shoot", "200/h", "200/h", 50, "hourly");
const babyshoot = new Photoshoot("Babyshoot", 150, 200, 8, 60 * 60 * 2);
const familyShoot = new Photoshoot("Family", 300, 400, 8, 60 * 60);
const eventShoot = new Photoshoot("Event", "200/h", "200/h", 100, "hourly");
const pregnancyShoot = new Photoshoot("Pregnancy", 200, 225, 8, 60 * 60 * 1.5);
const sweetSixTeenShoot = new Photoshoot("Sweet 16", 150, 200, 8, 60 * 60);
const regularShoot = new Photoshoot("Regular shoot", 200, 250, 8, 60 * 60);
const kidsParty = new Photoshoot("Kids party shoot", "150/h", "150/h", 100, "hourly");
const weddingBronze = new Photoshoot("Wedding Bronze", 1500, 1500, 200, "day");
const weddingSilver = new Photoshoot("Wedding Silver", 2000, 2000, 250, "day");
const weddingGold = new Photoshoot("Wedding Gold", 2500, 2500, 300, "day");
const weddingSignin = new Photoshoot("Wedding Signing", 400, 400, 50, "day");

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
