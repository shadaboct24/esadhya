import React from "react";

function Tables() {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <strong>Field Name</strong>
            </th>
            <th>
              <strong>Data Type</strong>
            </th>
            <th>
              <strong>Constraints</strong>
            </th>
            <th>
              <strong>Description</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>id</code>
            </td>
            <td>Varchar</td>
            <td>Primary Key</td>
            <td>Unique identifier for the country entry</td>
          </tr>
          <tr>
            <td>
              <code>country</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>Country name</td>
          </tr>
          <tr>
            <td>
              <code>state</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>State name</td>
          </tr>
          <tr>
            <td>
              <code>district</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>District name</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>
              <strong>Field Name</strong>
            </th>
            <th>
              <strong>Data Type</strong>
            </th>
            <th>
              <strong>Constraints</strong>
            </th>
            <th>
              <strong>Description</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>id</code>
            </td>
            <td>Varchar</td>
            <td>Primary Key</td>
            <td>Unique identifier for school registration</td>
          </tr>
          <tr>
            <td>
              <code>adminName</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>Name of the school administrator</td>
          </tr>
          <tr>
            <td>
              <code>adminEmail</code>
            </td>
            <td>Varchar</td>
            <td>Required, Unique</td>
            <td>Administrator's email</td>
          </tr>
          <tr>
            <td>
              <code>username</code>
            </td>
            <td>Varchar</td>
            <td>Required, Unique</td>
            <td>Username for admin login</td>
          </tr>
          <tr>
            <td>
              <code>password</code>
            </td>
            <td>Varchar</td>
            <td>Required, Encrypted</td>
            <td>Encrypted admin password</td>
          </tr>
          <tr>
            <td>
              <code>adminPasscode</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>Passcode for admin authentication</td>
          </tr>
          <tr>
            <td>
              <code>adminContactNumber</code>
            </td>
            <td>Varchar</td>
            <td>Required, Unique</td>
            <td>Administrator’s contact number</td>
          </tr>
          <tr>
            <td>
              <code>schoolId</code>
            </td>
            <td>Varchar</td>
            <td>Required, Unique</td>
            <td>Unique identifier for the school</td>
          </tr>
          <tr>
            <td>
              <code>schoolName</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>Name of the school</td>
          </tr>
          <tr>
            <td>
              <code>schoolAdminId</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>Admin ID of the school</td>
          </tr>
          <tr>
            <td>
              <code>schoolAddress</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>Complete address of the school</td>
          </tr>
          <tr>
            <td>
              <code>schoolDistrict</code>
            </td>
            <td>Varchar</td>
            <td>
              Foreign Key → <code>M_country.district</code>
            </td>
            <td>School district name</td>
          </tr>
          <tr>
            <td>
              <code>schoolState</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>State where the school is located</td>
          </tr>
          <tr>
            <td>
              <code>schoolCountry</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>Country where the school is located</td>
          </tr>
          <tr>
            <td>
              <code>schoolCityOrMandal</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>City or mandal where the school is located</td>
          </tr>
          <tr>
            <td>
              <code>schoolRegNumber</code>
            </td>
            <td>Varchar</td>
            <td>Unique, Required</td>
            <td>Unique school registration number</td>
          </tr>
          <tr>
            <td>
              <code>schoolPasscode</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>Security passcode for the school</td>
          </tr>
          <tr>
            <td>
              <code>schoolType</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>Type of school (public/private/etc.)</td>
          </tr>
          <tr>
            <td>
              <code>schoolLandline</code>
            </td>
            <td>Varchar</td>
            <td>Optional</td>
            <td>School’s landline number</td>
          </tr>
          <tr>
            <td>
              <code>schoolContactNumber</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>School’s contact number</td>
          </tr>
          <tr>
            <td>
              <code>schoolPincode</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>Postal pin code of the school</td>
          </tr>
          <tr>
            <td>
              <code>schoolLogo</code>
            </td>
            <td>Varchar</td>
            <td>Optional</td>
            <td>School's logo file path</td>
          </tr>
          <tr>
            <td>
              <code>schoolStreet</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>School's street address</td>
          </tr>
          <tr>
            <td>
              <code>schoolBuildingNumber</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>Building number of the school</td>
          </tr>
          <tr>
            <td>
              <code>schoolActiveStatus</code>
            </td>
            <td>Boolean</td>
            <td>Required</td>
            <td>Indicates if the school is active</td>
          </tr>
          <tr>
            <td>
              <code>dateOfCreation</code>
            </td>
            <td>Timestamp</td>
            <td>Required, Default: Current Timestamp</td>
            <td>School registration date</td>
          </tr>
          <tr>
            <td>
              <code>dateOfDeactivation</code>
            </td>
            <td>Timestamp</td>
            <td>Optional</td>
            <td>Deactivation date if applicable</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>
              <strong>Field Name</strong>
            </th>
            <th>
              <strong>Data Type</strong>
            </th>
            <th>
              <strong>Constraints</strong>
            </th>
            <th>
              <strong>Description</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>email</code>
            </td>
            <td>Varchar</td>
            <td>
              Foreign Key → <code>M_user_registration.email</code>
            </td>
            <td>Email for OTP verification</td>
          </tr>
          <tr>
            <td>
              <code>otp</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>One-time password (OTP) for verification</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>
              <strong>Field Name</strong>
            </th>
            <th>
              <strong>Data Type</strong>
            </th>
            <th>
              <strong>Constraints</strong>
            </th>
            <th>
              <strong>Description</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>otp_locking_time</code>
            </td>
            <td>Int</td>
            <td>
              Foreign Key → <code>M_user_registration.otp</code>
            </td>
            <td>Time in seconds before OTP locking</td>
          </tr>
          <tr>
            <td>
              <code>otp_resend_time</code>
            </td>
            <td>Int</td>
            <td>Required</td>
            <td>Time interval for OTP resend</td>
          </tr>
          <tr>
            <td>
              <code>otp_expiry_time</code>
            </td>
            <td>Int</td>
            <td>Required</td>
            <td>OTP expiration time</td>
          </tr>
          <tr>
            <td>
              <code>otp_max_attempt</code>
            </td>
            <td>Int</td>
            <td>Required</td>
            <td>Maximum OTP attempts allowed</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>
              <strong>Field Name</strong>
            </th>
            <th>
              <strong>Data Type</strong>
            </th>
            <th>
              <strong>Constraints</strong>
            </th>
            <th>
              <strong>Description</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>fullName</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>Child’s full name</td>
          </tr>
          <tr>
            <td>
              <code>username</code>
            </td>
            <td>Varchar</td>
            <td>Required, Unique</td>
            <td>Username for child’s login</td>
          </tr>
          <tr>
            <td>
              <code>password</code>
            </td>
            <td>Varchar</td>
            <td>Required, Encrypted</td>
            <td>Encrypted password for authentication</td>
          </tr>
          <tr>
            <td>
              <code>gender</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>Child’s gender</td>
          </tr>
          <tr>
            <td>
              <code>dateOfBirth</code>
            </td>
            <td>Date</td>
            <td>Required</td>
            <td>Child’s date of birth</td>
          </tr>
          <tr>
            <td>
              <code>registrationNo</code>
            </td>
            <td>Varchar</td>
            <td>Required, Unique</td>
            <td>Unique registration number</td>
          </tr>
          <tr>
            <td>
              <code>email</code>
            </td>
            <td>Varchar</td>
            <td>
              Foreign Key → <code>otp_details.email</code>
            </td>
            <td>Email for OTP verification</td>
          </tr>
          <tr>
            <td>
              <code>otp</code>
            </td>
            <td>Varchar</td>
            <td>
              Foreign Key → <code>otp_details.otp</code>
            </td>
            <td>OTP verification code</td>
          </tr>
          <tr>
            <td>
              <code>contactNo</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>Contact number of the child/guardian</td>
          </tr>
          <tr>
            <td>
              <code>address</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>Complete residential address</td>
          </tr>
          <tr>
            <td>
              <code>country</code>
            </td>
            <td>Varchar</td>
            <td>
              Foreign Key → <code>M_country.country</code>
            </td>
            <td>Country of residence</td>
          </tr>
          <tr>
            <td>
              <code>state</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>State of residence</td>
          </tr>
          <tr>
            <td>
              <code>district</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>District of residence</td>
          </tr>
          <tr>
            <td>
              <code>street</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>Street name</td>
          </tr>
          <tr>
            <td>
              <code>houseNo</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>House number</td>
          </tr>
          <tr>
            <td>
              <code>belonging</code>
            </td>
            <td>Varchar</td>
            <td>Optional</td>
            <td>Additional belonging information</td>
          </tr>
          <tr>
            <td>
              <code>cityOrMandal</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>City or mandal name</td>
          </tr>
          <tr>
            <td>
              <code>class_s</code>
            </td>
            <td>Varchar</td>
            <td>Required</td>
            <td>Class/grade child is enrolling in</td>
          </tr>
          <tr>
            <td>
              <code>academicYear</code>
            </td>
            <td>Year</td>
            <td>Required</td>
            <td>Academic year of admission</td>
          </tr>
          <tr>
            <td>
              <code>picture</code>
            </td>
            <td>File</td>
            <td>Optional</td>
            <td>Profile picture of the child</td>
          </tr>
          <tr>
            <td>
              <code>lastModifiedDate</code>
            </td>
            <td>Date</td>
            <td>Required</td>
            <td>Last modification date</td>
          </tr>
          <tr>
            <td>
              <code>lastModifiedBy</code>
            </td>
            <td>Varchar</td>
            <td>
              Foreign Key → <code>M_user_registration.role</code>
            </td>
            <td>User role who last modified the record</td>
          </tr>
          <tr>
            <td>
              <code>parentId</code>
            </td>
            <td>Varchar</td>
            <td>
              Foreign Key → <code>M_user_registration.role</code>
            </td>
            <td>Parent’s identifier in the system</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Tables;
