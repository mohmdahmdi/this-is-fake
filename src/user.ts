import { fakerFA as faker } from "@faker-js/faker";
import { randomJalaliDate, writeCSV } from "./utils/faker-helpers";

export type Users = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  password_hash: string;
  city: string;
  gender: string;
  birth_date: string;
  profile_picture: string;
  bio: string;
};

function generateUsers(count: number) {
  return Array.from({ length: count }, () => {
    const gender = Math.random() < 0.5 ? "male" : "female";
    const name = faker.person.fullName({ sex: gender });
    return {
      id: faker.string.uuid(),
      full_name: name,
      email: faker.internet.email(),
      phone: faker.phone.number({ style: "international" }),
      password_hash:
        "$2b$10$xXff.V6WPlDpSDGU9KO/GOi.RAvECHOOSztybqpcYehd037pF4yk6", // dont use in production
      city: faker.location.city(),
      gender,
      birth_date: randomJalaliDate(),
      profile_picture: faker.internet.url(),
      bio: faker.person.bio(),
    };
  });
}

const users = generateUsers(1000);
writeCSV(users, "dist/csv/user.csv");
