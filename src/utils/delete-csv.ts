import fs from "fs";
import path from "path";
import inquirer from "inquirer";

const folder = path.join(__dirname, "..", "..", "dist", "csv");

const csvFiles = fs.readdirSync(folder).filter(f => f.endsWith(".csv"));

if (csvFiles.length === 0) {
  console.log("No CSV files found in dist/");
  process.exit(0);
}

async function deleteCsvFiles() {
  const answers = await inquirer.prompt([
    {
      type: "checkbox",
      name: "filesToDelete",
      message: "Select CSV files to delete (use ↑/↓ and space to select):",
      choices: csvFiles
    }
  ]);

  if (answers.filesToDelete.length === 0) {
    console.log("No files selected. Exiting.");
    return;
  }

  for (const file of answers.filesToDelete) {
    const filePath = path.join(folder, file);
    fs.unlinkSync(filePath);
    console.log("Deleted:", file);
  }

  console.log("✅ Done!");
}

deleteCsvFiles();
