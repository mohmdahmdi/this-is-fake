import { fakerFA as faker } from "@faker-js/faker";
import { writeCSV } from "./utils/faker-helpers";
import districts from "./constants/districts";
import { readCsv } from "./utils/read-csv";
import { Users } from "./user";

async function generateBusinesses(count: number) {
  let users = await readCsv<Users>("../dist/csv/user.csv");

  // const locations = await readCsv<Location>("../dist/csv/location.csv");

  return Array.from({ length: count }, () => {
    const owner_id = users[Math.floor(Math.random() * users.length)].id;
    users.length > 5 && users.splice(users.findIndex(predicate => predicate.id === owner_id))
    const name = "";
    console.log(users);
    return {
      id: faker.string.uuid(),
      owner_id,
      name,
      description: "",
      city: faker.location.city(),
      district: faker.helpers.arrayElement(districts),
      address: `کوچه ${Math.floor(Math.random() * 50)}`,
      latitude: faker.location.latitude({ min: 25, max: 40 }),
      longitude: faker.location.longitude({ min: 44, max: 63 }),
    };
  });
}

const businesses = generateBusinesses(100).then((businesses) => {
});
// writeCSV(businesses, "dist/csv/locations.csv");
