import business_description from "../constants/business_description.json";

export type BusinessType = { id: string; name: string; description: string };
export type BusinessDescriptions = keyof typeof business_description;

export default function businessDescription(businessType?: string): string {
  let descriptions: string[] = [];

  if (businessType !== undefined && businessType in business_description) {
    const desc = business_description[businessType as BusinessDescriptions];
    descriptions = Array.isArray(desc) ? desc : [desc];
  } else {
    descriptions = Object.values(business_description).flat();
  }

  const randomIndex = Math.floor(Math.random() * descriptions.length);
  return descriptions[randomIndex];
}
