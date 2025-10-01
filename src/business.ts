import { fakerFA as faker } from "@faker-js/faker";
import { writeCSV } from "./utils/faker-helpers";
import districts from "./constants/districts";
import { readCsv } from "./utils/read-csv";
import { Users } from "./user";

async function generateBusinesses(count: number) {
  const users = await readCsv<Users>("../dist/csv/user.csv", [
    "id",
    "full_name",
    "email",
    "phone",
    "password_hash",
    "city",
    "gender",
    "birth_date",
    "profile_picture",
    "bio",
  ] as (keyof Users)[]);

  const locations = await readCsv<Location>("../dist/csv/location.csv", [
    "id",
    "country",
    "city",
    "district",
    "address",
    "latitude",
    "longitude",
  ]);

  const owner_id = ''
  const name= ''
    return Array.from({ length: count }, () => ({
      id: faker.string.uuid(),
      owner_id,
      name,
      description: '',
      city: faker.location.city(),
      district: faker.helpers.arrayElement(districts),
      address: `کوچه ${Math.floor(Math.random() * 50)}`,
      latitude: faker.location.latitude({ min: 25, max: 40 }),
      longitude: faker.location.longitude({ min: 44, max: 63 }),
    }));
}

const businesses = generateBusinesses(100).then((businesses) => {
  console.log(businesses);
});
// writeCSV(businesses, "dist/csv/locations.csv");
