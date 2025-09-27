import { fakerFA as faker } from "@faker-js/faker";
import jalaali from "jalaali-js";

// Persian Email Generator
export function toPersianEmail(name: string): string {
  const persianChars = [
    "ا",
    "ب",
    "پ",
    "ت",
    "ث",
    "ج",
    "چ",
    "ح",
    "خ",
    "د",
    "ذ",
    "ر",
    "ز",
    "ژ",
    "س",
    "ش",
    "ص",
    "ض",
    "ط",
    "ظ",
    "ع",
    "غ",
    "ف",
    "ق",
    "ک",
    "گ",
    "ل",
    "م",
    "ن",
    "و",
    "ه",
    "ی",
  ];
  const randomChar = () =>
    persianChars[Math.floor(Math.random() * persianChars.length)];
  const base = name.replace(/\s+/g, "").slice(0, 5);
  const pseudoUser = base
    .split("")
    .map(() => randomChar())
    .join("");
  const pseudoDomain = ["ایران", "وب", "آنلاین"][Math.floor(Math.random() * 3)];
  return `${pseudoUser}@${pseudoDomain}.ir`;
}

// Random Jalali date
export function randomJalaliDate() {
  const gYear = faker.date.past().getFullYear();
  const gMonth = faker.number.int({ min: 0, max: 11 });
  const gDay = faker.number.int({ min: 1, max: 28 });
  const { jy, jm, jd } = jalaali.toJalaali(gYear, gMonth + 1, gDay);
  return `${jy}/${jm}/${jd}`;
}

// CSV Writer
import fs from "fs";
export function writeCSV(data: any[], filePath: string) {
  if (data.length === 0) return;
  const header = Object.keys(data[0]).join(",") + "\n";
  const rows = data
    .map((row) =>
      Object.values(row)
        .map((val) => `"${val}"`)
        .join(",")
    )
    .join("\n");
  fs.writeFileSync(filePath, header + rows, "utf8");
  console.log(`✅ Wrote ${data.length} rows to ${filePath}`);
}
