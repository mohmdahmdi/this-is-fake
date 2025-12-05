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

export type Business = {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  logo: string;
  cover_image: string;
  location_id: string;
  business_type_id: string;
  phone: string;
  email: string | null;
  website: string | null;
  instagram: string | null;
  whatsapp: string | null;
  rating: string;
  is_verified: boolean;
  is_active: boolean;
};

async function generateBusinesses(count: number) {
  let users = await readCsv<Users>("../dist/csv/user.csv");
  let businessTypes = await readCsv<BusinessType>(
    "../dist/csv/business_types.csv"
  );

  const locations = await readCsv<Location>("../dist/csv/locations.csv");

  return Array.from({ length: count }, () => {
    const user_index = Math.floor(Math.random() * users.length) - 1;
    const user = users[user_index];
    const owner_id = user.id;
    const business_type =
      businessTypes[Math.floor(Math.random() * businessTypes.length)];
    const location_index = Math.floor(Math.random() * locations.length);
    const location_id = locations[location_index] as Location;
    locations.splice(location_index, 1);
    const phone = faker.phone.number({ style: "international" });
    const name = `${
      business_type.name
    } ${faker.person.firstName("female")}`;

    return {
      id: faker.string.uuid(),
      owner_id,
      name,
      description: businessDescription(business_type.id || undefined),
      logo: faker.internet.url(),
      cover_image: faker.internet.url(),
      location_id: location_id.id,
      business_type_id: business_type.id,
      phone,
      email: Math.random() > 0.33 ? faker.internet.email() : null,
      website:
        Math.random() > 0.9 ? faker.internet.url({ protocol: "http" }) : null,
      instagram:
        Math.random() > 0.6
          ? `@${faker.internet.username().toLowerCase()}`
          : null,
      whatsapp: Math.random() > 0.8 ? phone : null,
      rating: (Math.random() * 5).toPrecision(2),
      is_verified: Math.random() > 0.1,
      is_active: Math.random() > 0.2,
    };
  });
}

const businesses = generateBusinesses(100).then((businesses) => {
  writeCSV(businesses, "dist/csv/business.csv");
});
