const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

async function runAdmissionFormTest() {
  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
    .build();

  const logFilePath = path.join(__dirname, "admission_form_errors.log");
  fs.writeFileSync(logFilePath, "Admission Form Error Log\n\n", { flag: "w" });

  try {
    const workbook = xlsx.readFile(
      "src/components/NewSchoolRegistration/test-script.xlsx"
    );
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    for (const entry of data) {
      let isValid = true;
      let errorMessage = "";

      const {
        adminName,
        adminEmail,
        username,
        password,
        adminPasscode,
        adminContactNumber,
        schoolId,
        schoolName,
        schoolAdminId,
        schoolAddress,
        schoolCity,
        schoolState,
        schoolCountry,
        schoolRegNumber,
        schoolPasscode,
        schoolType,
        schoolLandline,
        schoolContactNumber,
        schoolPinCode,
        schoolLogo,
        schoolStreet,
        schoolBuildingNumber,
      } = entry;

      // Validations based on constraints
      if (!adminName || !/^[a-zA-Z\s]+$/.test(adminName)) {
        errorMessage += "Invalid Admin Name. ";
        isValid = false;
      }
      if (!adminEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)) {
        errorMessage += "Invalid Admin Email. ";
        isValid = false;
      }
      if (adminContactNumber && !/^\d{10}$/.test(adminContactNumber)) {
        errorMessage += "Invalid Admin Contact Number. ";
        isValid = false;
      }
      if (schoolContactNumber && !/^\d{10}$/.test(schoolContactNumber)) {
        errorMessage += "Invalid School Contact Number. ";
        isValid = false;
      }
      if (schoolCity && !/^[a-zA-Z\s]+$/.test(schoolCity)) {
        errorMessage += "Invalid City. ";
        isValid = false;
      }
      if (schoolState && !/^[a-zA-Z\s]+$/.test(schoolState)) {
        errorMessage += "Invalid State. ";
        isValid = false;
      }
      if (schoolCountry && !/^[a-zA-Z\s]+$/.test(schoolCountry)) {
        errorMessage += "Invalid Country. ";
        isValid = false;
      }

      // Log errors only if validation failed
      if (!isValid) {
        fs.appendFileSync(
          logFilePath,
          `Error for entry:\nAdmin Name: ${adminName}\nErrors: ${errorMessage}\n\n`,
          "utf8"
        );
        console.log(`Skipping ${adminName} due to validation errors.`);
        continue;
      }

      console.log(`Testing form submission for: ${adminName}`);

      await driver.get("http://localhost:3000/newreg");
      await driver.sleep(2000);

      // Populate all form fields with a delay for visibility
      const fields = {
        adminName,
        adminEmail,
        username,
        password,
        adminPasscode,
        adminContactNumber,
        schoolId,
        schoolName,
        schoolAdminId,
        schoolAddress,
        schoolCity,
        schoolState,
        schoolCountry,
        schoolRegNumber,
        schoolPasscode,
        schoolType,
        schoolLandline,
        schoolContactNumber,
        schoolPinCode,
        schoolLogo,
        schoolStreet,
        schoolBuildingNumber,
      };

      for (const [name, value] of Object.entries(fields)) {
        try {
          if (value === undefined) {
            console.warn(`Field ${name} is undefined for entry ${adminName}`);
            continue;
          }
          console.log(`Filling in ${name} with value: ${value}`);
          const element = await driver.findElement(By.name(name));
          await driver.wait(until.elementIsVisible(element), 5000);
          await element.sendKeys(value);
          await driver.sleep(500); // Short delay after each entry for visibility
        } catch (error) {
          console.error(`Error filling field ${name}: ${error}`);
          fs.appendFileSync(
            logFilePath,
            `Error filling field ${name} for ${adminName}:\n${error}\n\n`,
            "utf8"
          );
          break; // Break out of the loop if there's an error
        }
      }

      const submitButton = await driver.wait(
        until.elementLocated(By.css('button[type="submit"]')),
        10000
      );
      await driver.sleep(1000); // Wait before clicking the submit button for visibility
      await submitButton.click();

      // Check if dialog or error appears
      try {
        const dialog = await driver.wait(
          until.elementLocated(By.css(".MuiDialog-root")),
          5000
        );
        if (dialog) {
          console.log("Dialog opened, assuming submission was successful.");
          await driver.sleep(1000); // Wait before clicking the close button
          await driver
            .findElement(By.css(".MuiDialogActions-root button"))
            .click();
        }
      } catch (error) {
        console.error(`Submission failed for ${adminName}.`);
        fs.appendFileSync(
          logFilePath,
          `Submission failed for entry:\nAdmin Name: ${adminName}\nError: Dialog did not open as expected.\n\n`,
          "utf8"
        );
      }

      await driver.sleep(2000); // Pause at the end of each entry for visibility
    }

    console.log("Test completed. Check admission_form_errors.log for errors.");
  } catch (err) {
    console.error("Error during the Selenium test:", err);
  } finally {
    //await driver.quit();
  }
}

// Execute the test function
runAdmissionFormTest();
