const xlsx = require("xlsx");
const fs = require("fs");
const axios = require("axios");

// Read Excel file and parse data
const readExcelFile = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  return xlsx.utils.sheet_to_json(worksheet);
};

// Validate data function (adjust based on your requirements)
const validateData = (data) => {
  const errors = [];

  data.forEach((entry, index) => {
    const errorMessages = [];

    // Add validation rules here
    if (
      !entry.adminEmail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.adminEmail)
    ) {
      errorMessages.push("Invalid admin email format.");
    }
    if (
      !entry.adminContactNumber ||
      !/^\d{10}$/.test(entry.adminContactNumber)
    ) {
      errorMessages.push("Admin contact number should be 10 digits.");
    }
    if (
      !entry.schoolContactNumber ||
      !/^\d{10}$/.test(entry.schoolContactNumber)
    ) {
      errorMessages.push("School contact number should be 10 digits.");
    }

    // If there are errors, log them with row info
    if (errorMessages.length > 0) {
      errors.push({
        row: index + 2, // Row number in Excel (adjust if there's a header)
        errors: errorMessages,
      });
    }
  });

  return errors;
};

// Log errors to a file
const logErrors = (errors) => {
  const logContent = errors
    .map((error) => `Row ${error.row}: ${error.errors.join(", ")}`)
    .join("\n");

  fs.writeFileSync("error_log.txt", logContent);
  console.log("Errors logged to error_log.txt");
};

// Submit valid data to the backend
const submitData = async (data) => {
  for (const entry of data) {
    try {
      await axios.post("https://false-url.com/api/newAdmission", entry);
      console.log(`Data submitted successfully for ${entry.adminEmail}`);
    } catch (error) {
      console.error(`Error submitting data for ${entry.adminEmail}:`, error);
    }
  }
};

// Main function to process the file
const processFile = async (filePath) => {
  const data = readExcelFile(filePath);
  const errors = validateData(data);

  if (errors.length > 0) {
    logErrors(errors);
  } else {
    await submitData(data);
  }
};

// Path to your Excel file
const filePath = "data.xlsx";
processFile(filePath);
