import { fakerFA as faker } from "@faker-js/faker";
import { writeCSV } from "./utils/faker-helpers";
import districts from "./constants/districts";
import { readCsv } from "./utils/read-csv";
import { Users } from "./user";
import businessDescription from "./utils/business-description";
import categories from "./constants/categories.json";

async function generateBusinesses(count: number) {
  let users = await readCsv<Users>("../dist/csv/user.csv");

  const locations = await readCsv<Location>("../dist/csv/location.csv");

  return Array.from({ length: count }, () => {
    const user = users[Math.floor(Math.random() * users.length) - 1];
    const owner_id = user.id;
    const business_type =
      Object.keys(categories)[
        Math.floor(Math.random() * Object.keys(categories).length)
      ];
    const name = ``;
    const location_index = Math.floor(Math.random() * locations.length);
    const location_id = locations[location_index];
    locations.splice(location_index, 1);
    const phone = faker.phone.number({ style: "international" });

    return {
      id: faker.string.uuid(),
      owner_id,
      name,
      description: businessDescription((business_type as keyof B) || undefined),
      logo: faker.internet.url(),
      cover_image: faker.internet.url(),
      location_id,
      business_type_id: business_type,
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
});
// writeCSV(businesses, "dist/csv/locations.csv");
