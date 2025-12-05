import mainGraph from "./constants/main-graph.json";
import { writeCSV } from "./utils/faker-helpers";

export type ServiceType = {
  id: string;
  name: string;
  icon: string;
};

type BusinessType = string;

type Service = {
  serviceName: string;
  price: number;
};

type SubCategory = {
  translation: string;
  services: Service[];
};

type Category = {
  translation: string;
  subCategories: Record<string, SubCategory>;
};

export type CategoryMapMain = Record<BusinessType, Category>;

const graphData = mainGraph as CategoryMapMain;

let serviceCategories: ServiceType[] = [];

Object.entries(graphData).forEach(([businessType, category]) => {
  Object.entries(category.subCategories).forEach(
    ([subCategoryKey, subCategory]) => {
      serviceCategories.push({
        id: `${subCategoryKey}`, 
        name: subCategory.translation, 
        icon: "", 
      });
    }
  );
});


async function generateServiceTypes(): Promise<ServiceType[]> {
  const categories: ServiceType[] = [];

  Object.entries(graphData).forEach(([businessType, category]) => {
    Object.entries(category.subCategories).forEach(
      ([subCategoryKey, subCategory]) => {
        categories.push({
          id: `${subCategoryKey}`,
          name: subCategory.translation,
          icon: "",
        });
      }
    );
  });

  return categories;
}

generateServiceTypes().then((serviceTypes) => {
  writeCSV(serviceTypes, "dist/csv/service_type.csv");
});
