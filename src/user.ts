import { fakerFA as faker } from "@faker-js/faker";
import {
  toPersianEmail,
  randomJalaliDate,
  writeCSV,
} from "./utils/faker-helpers.js";

function generateUsers(count: number) {
  return Array.from({ length: count }, () => {
    const name = faker.person.fullName();
    return {
      name,
      email: toPersianEmail(name),
      city: faker.location.city(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number({ style: "human" }),
      birthDate: randomJalaliDate(),
    };
  });
}

const users = generateUsers(100);
writeCSV(users, "dist/user.csv");
