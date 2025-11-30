import { fakerFA as faker } from "@faker-js/faker";
import { writeCSV } from "./utils/faker-helpers";
import { readCsv } from "./utils/read-csv";
import { Users } from "./user";
import persianTranslationMap from "./constants/persian-translation-map.json";
import { Business } from "./business";
import businessDescription from "./utils/business-description";

export type Beautician = {
  id: string;
  user_id: string;
  business_id: string | null;
  bio: string;
  experience_years: number;
  specialties: string[];
  is_freelancer: boolean;
  rating: string;
};

const serviceCategoriesTranslation = persianTranslationMap.ServiceCategories;
async function generateBeauticians(count: number): Promise<Beautician[]> {
  let users = await readCsv<Users>("../dist/csv/user.csv");

  const bussinesses = await readCsv<Business>("../dist/csv/business.csv");
  console.log(bussinesses);
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
      bio: businessDescription(),
      experience_years: Math.floor(Math.random() * 10),
 
      specialties: Array.from({ length: Math.floor(Math.random() * 4) }, () => {
        const spetialty = Object.keys(serviceCategoriesTranslation);
        return serviceCategoriesTranslation[
          spetialty[
            Math.floor(Math.random() * spetialty.length)
          ] as keyof typeof serviceCategoriesTranslation
        ];
      }),
      is_freelancer,
      rating: Math.floor(Math.random() * 5).toString(),
    };
  });
}


const beauticians = generateBeauticians(500).then((beautician) => {
  writeCSV(beautician, "dist/csv/beauticians.csv");
});
