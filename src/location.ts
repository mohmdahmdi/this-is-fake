import { fakerFA as faker } from "@faker-js/faker";
import { writeCSV } from "./utils/faker-helpers";
import districts from "./constants/districts";

function generateLocations(count: number) {
  return Array.from({ length: count }, () => ({
    country: "iran",
    city: faker.location.city(),
    district: faker.helpers.arrayElement(districts),
    address: `کوچه ${Math.floor(Math.random() * 50)}`,
    latitude: faker.location.latitude({ min: 25, max: 40 }),
    longitude: faker.location.longitude({ min: 44, max: 63 }),
  }));
}

const locations = generateLocations(100);
writeCSV(locations, "dist/csv/locations.csv");
