import { writeCSV } from "./utils/faker-helpers";
import businessDescription from "./utils/business-description";
import mainGraph from './constants/main-graph.json'

function generateBusinessType() {
  return Object.keys(mainGraph).map((item) => {

    return {
      id: item,
      name: mainGraph[item as keyof typeof mainGraph].translation,
      description: businessDescription(item),
    };
  });
}

const businessTypes = generateBusinessType();
writeCSV(businessTypes, "dist/csv/business_types.csv");
