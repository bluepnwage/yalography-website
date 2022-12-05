export type FeatureType =
  | "extra_pictures"
  | "added_person"
  | "assistant"
  | "spouse"
  | "decor"
  | "dress_rental"
  | "flash_drive"
  | "headpiece"
  | "proposal_video"
  | "quick_hairstyles"
  | "soft_glam_makeup"
  | "wig_rental";

export type FeatureSpec = {
  description: string;
  price: number;
  label: string;
};

export const photoshootFeatures = new Map<FeatureType, FeatureSpec>();

photoshootFeatures.set("added_person", {
  price: 15,
  description: "Option to add more people for an additional charge",
  label: "Added Person"
});
photoshootFeatures.set("assistant", {
  price: 0,
  description: "Option to have someone assist you with the wedding",
  label: "Assistant"
});
photoshootFeatures.set("dress_rental", {
  price: 50,
  description: "Option to rent dress for photoshoot",
  label: "Dress rental"
});
photoshootFeatures.set("decor", {
  price: 50,
  description: "Option to request decorations for photoshoot",
  label: "Decor"
});
photoshootFeatures.set("extra_pictures", {
  price: 15,
  description: "Option to request additional pictures",
  label: "Extra pictures"
});
photoshootFeatures.set("flash_drive", {
  price: 0,
  description: "Pictures will be given to customer on flash drive",
  label: "Flash Drive"
});
photoshootFeatures.set("headpiece", {
  price: 10,
  description: "Option to rend headpiece for photoshoot",
  label: "Headpiece"
});
photoshootFeatures.set("proposal_video", {
  price: 150,
  description: "Option to request proposal to go along with photoshoot",
  label: "Propsal Video"
});
photoshootFeatures.set("quick_hairstyles", {
  price: 40,
  description: "Option to request simple hairtstyles on premise",
  label: "Quick Hairstyles"
});
photoshootFeatures.set("soft_glam_makeup", {
  price: 50,
  description: "Option to have light makeup done before photoshoot",
  label: "Soft Glam Makeup"
});
photoshootFeatures.set("spouse", {
  price: 50,
  description: "Option to include spouse in pregnancy pictures",
  label: "Spouse"
});
photoshootFeatures.set("wig_rental", {
  price: 50,
  description: "Option to rent wig for photoshoot",
  label: "Wig Rental"
});
