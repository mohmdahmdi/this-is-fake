import { fakerFA as faker, fakerEN } from "@faker-js/faker";
import { randomJalaliDate, writeCSV } from "./utils/faker-helpers";

export type Users = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  password_hash: string;
  gender: string;
  birth_date: string;
  profile_picture: string;
  bio: string;
};

function generateUsers(count: number) {
  return Array.from({ length: count }, () => {
    const gender = Math.random() < 0.5 ? "male" : "female";
    const name = faker.person.fullName({ sex: gender });
    const birthDate = fakerEN.date
      .birthdate({
        min: 18,
        max: 65,
        mode: "age",
      })
      .toISOString()
      .split("T")[0];
    return {
      id: faker.string.uuid(),
      full_name: name,
      email: faker.internet.email(),
      phone: faker.phone.number({ style: "international" }),
      password_hash:
        "$2b$10$xXff.V6WPlDpSDGU9KO/GOi.RAvECHOOSztybqpcYehd037pF4yk6", // dont use in production
      gender,
      birth_date: birthDate,
      profile_picture: faker.internet.url(),
      bio: faker.person.bio(),
    };
  });
}

const users = generateUsers(1000);
writeCSV(users, "dist/csv/user.csv");
