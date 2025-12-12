import { fakerFA as faker } from "@faker-js/faker";
import { writeCSV } from "./utils/faker-helpers";
import { readCsv } from "./utils/read-csv";
import { Business } from "./business";
import { Service } from "./services";
import { Users } from "./user";

export type Appointment = {
  id: string;
  customer_id: string;
  beautician_id: string;
  service_id: string;
  scheduled_at: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  payment_status: "unpaid" | "paid" | "refunded";
  notes: string;
  created_at: string;
};

async function generateAppointments(count: number = 500) {
  const customers = await readCsv<Users>("../dist/csv/user.csv");
  const beauticians = await readCsv<{ id: string }>(
    "../dist/csv/beauticians.csv"
  );
  const services = await readCsv<Service>("../dist/csv/services.csv");

  if (
    customers.length === 0 ||
    beauticians.length === 0 ||
    services.length === 0
  ) {
    throw new Error("Missing required CSV data for appointments");
  }

  const appointments: Appointment[] = [];

  for (let i = 0; i < count; i++) {
    const customer = faker.helpers.arrayElement(customers);
    const beautician = faker.helpers.arrayElement(beauticians);
    const service = faker.helpers.arrayElement(services);

    const scheduledAt = faker.date.between({
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      to: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    });

    let status: Appointment["status"] = "pending";
    if (scheduledAt < new Date()) {
      status = faker.helpers.arrayElement(["completed", "cancelled"]);
    } else {
      status = faker.helpers.arrayElement(["pending", "confirmed"]);
    }

    const payment_status: Appointment["payment_status"] =
      status === "completed"
        ? faker.helpers.arrayElement(["paid", "paid", "paid", "unpaid"])
        : status === "cancelled"
        ? "refunded"
        : faker.helpers.arrayElement(["unpaid", "paid"]);

    appointments.push({
      id: faker.string.uuid(),
      customer_id: customer.id,
      beautician_id: beautician.id,
      service_id: service.id,
      scheduled_at: scheduledAt.toISOString(),
      status,
      payment_status,
      notes: faker.datatype.boolean(0.3) ? faker.lorem.sentence() : "",
      created_at: faker.date
        .between({
          from: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000),
          to: scheduledAt,
        })
        .toISOString(),
    });
  }

  await writeCSV(appointments, "dist/csv/appointments.csv");
}

generateAppointments(3000);
