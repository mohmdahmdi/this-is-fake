import { fakerFA as faker } from "@faker-js/faker";
import { randomJalaliDate, writeCSV } from "./utils/faker-helpers";

function generateUsers(count: number) {
  const gender = Math.random() < 0.5 ? "male" : "female";
  return Array.from({ length: count }, () => {
    const name = faker.person.fullName({ sex: gender });
    return {
      name,
      email: faker.internet.email(),
      phone: faker.phone.number({ style: "international" }),
      password_hash:
        "$2b$10$xXff.V6WPlDpSDGU9KO/GOi.RAvECHOOSztybqpcYehd037pF4yk6", // dont use in production
      city: faker.location.city(),
      gender,
      birthDate: randomJalaliDate(),
      profilePicture: faker.internet.url(),
      bio: faker.person.bio(),
    };
  });
}

const users = generateUsers(1000);
writeCSV(users, "dist/csv/user.csv");

