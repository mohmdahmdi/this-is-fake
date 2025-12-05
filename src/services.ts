import { fakerFA as faker } from "@faker-js/faker";
import { writeCSV } from "./utils/faker-helpers";
import { readCsv } from "./utils/read-csv";
import { Users } from "./user";
import businessDescription, {
  BusinessDescriptions,
  BusinessType,
} from "./utils/business-description";
import { Location } from "./location";
import mainGraph from "./constants/main-graph.json";
import { ServiceType } from "./service_category";
import { Business } from "./business";

export type Service = {
  id: string;
  business_id: string;
  category_id: string;
  title: string;
  description: string;
  price: number;
  duration_minutes: number;
  image: string;
  gender_target?: boolean;
  is_active: boolean;
  rating: number;
};

async function generateServices() {
  const businesses = await readCsv<Business>("../dist/csv/business.csv");

  const services: Service[] = [];

  for (const business of businesses) {
    const businessType = business.business_type_id as keyof typeof mainGraph;
    const businessNodes = mainGraph[businessType];

    if (!businessNodes?.subCategories) continue;

    for (const [subCategoryId, subCategory] of Object.entries(
      businessNodes.subCategories
    )) {
      if (Math.random() > 0.5) continue;

      const serviceList = (subCategory as any).services || [];

      for (const service of serviceList) {
        if (Math.random() <= 0.5) continue;

        if (!service?.serviceName || service.price == null) continue;

        services.push({
          id: faker.string.uuid(),
          business_id: business.id,
          category_id: subCategoryId,
          title: service.serviceName,
          description: businessDescription(
            business.business_type_id || undefined
          ),
          price: service.price,
          duration_minutes: Math.floor(Math.random() * 60) + 15,
          image: faker.image.url(),
          gender_target: true,
          is_active: Math.random() > 0.2,
          rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
        });
      }
    }
  }

  await writeCSV(services, "dist/csv/services.csv");
}

generateServices();
