import React, { useState } from "react";

function LanguageSelector() {
  const [language, setLanguage] = useState("English");

  const languages = [
    "Assamese", "Bengali", "Bodo", "Dogri", "Gujarati", "Hindi", "Kashmiri", 
    "Kannada", "Konkani", "Maithili", "Malayalam", "Manipuri", "Marathi", 
    "Nepali", "Oriya", "Punjabi", "Sanskrit", "Santali", "Sindhi", 
    "Tamil", "Telugu", "Urdu"
  ];

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      <select 
        id="language" 
        value={language} 
        onChange={handleChange} 
        style={{ padding: "3px", fontSize: "14px", borderRadius: "4px" }}
      >
        <option value="English">English</option>
        {languages.map((lang, index) => (
          <option key={index} value={lang}>{lang}</option>
        ))}
      </select>
      
    </div>
  );
}

export default LanguageSelector;
