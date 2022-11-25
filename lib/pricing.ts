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

class Pricing {
  type: ShootTypes;
  indoor: number | string;
  outdoor: number | string;
  pictures: number;
  constructor(
    type: ShootTypes,
    indoorPricing: number | string,
    outdoorPricing: number | string,
    pictureAmount: number
  ) {
    this.type = type;
    this.indoor = indoorPricing;
    this.outdoor = outdoorPricing;
    this.pictures = pictureAmount;
  }
}

const adShoot = new Pricing("Ad shoot", "200/h", "200/h", 50);
const babyshoot = new Pricing("Babyshoot", 150, 200, 8);
const familyShoot = new Pricing("Family", 300, 400, 8);
const eventShoot = new Pricing("Event", "200/h", "200/h", 100);
const pregnancyShoot = new Pricing("Pregnancy", 200, 225, 8);
const sweetSixTeenShoot = new Pricing("Sweet 16", 150, 200, 8);
const regularShoot = new Pricing("Regular shoot", 200, 250, 8);
const kidsParty = new Pricing("Kids party shoot", "150/h", "150/h", 100);
const weddingBronze = new Pricing("Wedding Bronze", 1500, 1500, 200);
const weddingSilver = new Pricing("Wedding Silver", 2000, 2000, 250);
const weddingGold = new Pricing("Wedding Gold", 2500, 2500, 300);
const weddingSignin = new Pricing("Wedding Signing", 400, 400, 50);

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
