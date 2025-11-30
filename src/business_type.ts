import { writeCSV } from "./utils/faker-helpers";
import businessDescription from "./utils/business-description";
import categoriesTranslation from "./constants/categories_translation_map.json";
import business_types from "./constants/business_types";

// Define the type for your translation map
export interface CategoriesTranslation {
  businessCategories: Record<string, string>;
  serviceTypes: Record<string, string>;
  commonTerms: Record<string, string>;
}

function generateBusinessType() {
  return business_types.map((item) => {
    const translation = categoriesTranslation as CategoriesTranslation;

    return {
      id: item,
      name: translation.businessCategories[item],
      description: businessDescription(item),
    };
  });
}

const businessTypes = generateBusinessType();
writeCSV(businessTypes, "dist/csv/business_types.csv");
