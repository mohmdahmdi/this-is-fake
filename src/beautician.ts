import { fakerFA as faker } from "@faker-js/faker";
import { writeCSV } from "./utils/faker-helpers";
import { readCsv } from "./utils/read-csv";
import { Users } from "./user";
import { Business } from "./business";
import businessDescription from "./utils/business-description";
import mainGraph from "./constants/main-graph.json";

export function toPgArray(arr: string[]) {
  if (!arr || arr.length === 0) return "{}";
  const escaped = arr
    .map((item) => item.replace(/\\/g, "\\\\").replace(/"/g, '\\"')) // escape برای JSON-like
    .join(",");
  return `{${escaped}}`;
}

export type Beautician = {
  id: string;
  user_id: string;
  business_id: string | null;
  bio: string;
  experience_years: number;
  specialties: string;
  is_freelancer: boolean;
  rating: string;
};

let serviceCategories: string[] = [];
Object.values(mainGraph).forEach((item) => {
  serviceCategories = [
    ...serviceCategories,
    ...Object.values(item.subCategories).map((item) => item.translation),
  ];
});
async function generateBeauticians(count: number): Promise<Beautician[]> {
  let users = await readCsv<Users>("../dist/csv/user.csv");
  const bussinesses = await readCsv<Business>("../dist/csv/business.csv");

  return Array.from({ length: count }, () => {
    const user_index = Math.floor(Math.random() * users.length);
    const user = users[user_index];
    const user_id = user.id;

    const business_index = Math.floor(Math.random() * bussinesses.length);
    const business = bussinesses[business_index];
    const business_id = business.id;

    users.splice(user_index, 1);

    const is_freelancer = Math.random() < 0.1;

    return {
      id: faker.string.uuid(),
      user_id,
      business_id: is_freelancer ? null : business_id,
      bio: businessDescription(business.business_type_id),
      experience_years: Math.floor(Math.random() * 10),

      specialties: toPgArray(Array.from({ length: Math.floor(Math.random() * 4) }, () => {
        return serviceCategories[
          Math.floor(Math.random() * serviceCategories.length)
        ];
      })),
      is_freelancer,
      rating: Math.floor(Math.random() * 5).toString(),
    };
  });
}

const beauticians = generateBeauticians(500).then((beautician) => {
  writeCSV(beautician, "dist/csv/beauticians.csv");
});
