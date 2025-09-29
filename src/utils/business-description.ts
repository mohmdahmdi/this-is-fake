import business_description from "../constants/business_description.json";

export type BusinessTypes = keyof typeof business_description;

export default function businessDescription(
  businessType?: BusinessTypes
): string | null {
  const descriptions = businessType
    ? business_description[businessType]
    : Object.values(business_description).flat();

  if (!descriptions || descriptions.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * descriptions.length);
  return descriptions[randomIndex];
}
