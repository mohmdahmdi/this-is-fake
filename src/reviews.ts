import { fakerFA as faker } from "@faker-js/faker";
import { writeCSV } from "./utils/faker-helpers";
import { readCsv } from "./utils/read-csv";
import { Appointment } from "./appointments";
import reviews from "./constants/reviews.json";

export type Review = {
  rating: number;
  comment: string;
  appointment_id: string;
  customer_id: string;
};

async function generateReviews(): Promise<Review[]> {
  let appointments = await readCsv<Appointment>("../dist/csv/appointments.csv");

  return appointments.map((item, idx) => {
    const appointment_idx = Math.floor(Math.random() * appointments.length);
    const appointment = appointments[appointment_idx];
    return {
      rating: Math.floor(Math.random() * 10),
      comment: reviews[Math.floor(Math.random() * reviews.length)],
      appointment_id: item.id,
      customer_id: item.customer_id,
    };
  });
}

const review = generateReviews().then((rev) => {
  writeCSV(rev, "dist/csv/review.csv");
});
