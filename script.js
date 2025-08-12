// ====== Config ======
const corsProxy = "https://api.allorigins.win/raw?url=";

// ====== Calculator ======
async function calcOperation(op, intA, intB) {
  const url = corsProxy + encodeURIComponent("http://www.dneonline.com/calculator.asmx");
  const soapBody = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <${op} xmlns="http://tempuri.org/">
          <intA>${intA}</intA>
          <intB>${intB}</intB>
        </${op}>
      </soap:Body>
    </soap:Envelope>`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "SOAPAction": `http://tempuri.org/${op}`
    },
    body: soapBody
  });
  const text = await response.text();
  const xml = new DOMParser().parseFromString(text, "text/xml");
  return xml.getElementsByTagName(`${op}Result`)[0].textContent;
}

// ====== Country Info ======
async function getCountryInfo(name) {
  const url = corsProxy + encodeURIComponent("http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso");
  const soapBody = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <FullCountryInfo xmlns="http://www.oorsprong.org/websamples.countryinfo">
          <sCountryISOCode>${name}</sCountryISOCode>
        </FullCountryInfo>
      </soap:Body>
    </soap:Envelope>`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "SOAPAction": "http://www.oorsprong.org/websamples.countryinfo/FullCountryInfo"
    },
    body: soapBody
  });
  const text = await response.text();
  const xml = new DOMParser().parseFromString(text, "text/xml");
  return {
    name: xml.getElementsByTagName("sName")[0]?.textContent || "Unknown",
    capital: xml.getElementsByTagName("sCapitalCity")[0]?.textContent || "Unknown",
    currency: xml.getElementsByTagName("sCurrencyISOCode")[0]?.textContent || "Unknown",
    flag: xml.getElementsByTagName("sCountryFlag")[0]?.textContent || ""
  };
}

// ====== Temperature Conversion ======
async function convertTemp(direction, value) {
  const url = corsProxy + encodeURIComponent("https://www.w3schools.com/xml/tempconvert.asmx");
  const soapBody = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <${direction} xmlns="https://www.w3schools.com/xml/">
          <${direction === "CelsiusToFahrenheit" ? "Celsius" : "Fahrenheit"}>${value}</${direction === "CelsiusToFahrenheit" ? "Celsius" : "Fahrenheit"}>
        </${direction}>
      </soap:Body>
    </soap:Envelope>`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "SOAPAction": `https://www.w3schools.com/xml/${direction}`
    },
    body: soapBody
  });
  const text = await response.text();
  const xml = new DOMParser().parseFromString(text, "text/xml");
  return xml.getElementsByTagName(`${direction}Result`)[0].textContent;
}

// ====== Number to Words ======
async function numberToWords(mode, number) {
  const url = corsProxy + encodeURIComponent("https://www.dataaccess.com/webservicesserver/NumberConversion.wso");
  const soapBody = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <${mode} xmlns="http://www.dataaccess.com/webservicesserver/">
          <ubiNum>${number}</ubiNum>
        </${mode}>
      </soap:Body>
    </soap:Envelope>`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "SOAPAction": `http://www.dataaccess.com/webservicesserver/${mode}`
    },
    body: soapBody
  });
  const text = await response.text();
  const xml = new DOMParser().parseFromString(text, "text/xml");
  return xml.getElementsByTagName(`${mode}Result`)[0].textContent;
}

// ====== Event Listeners ======
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("calc-btn").addEventListener("click", async () => {
    const a = document.getElementById("calc-num1").value;
    const b = document.getElementById("calc-num2").value;
    const op = document.getElementById("calc-op").value;
    const result = await calcOperation(op, a, b);
    document.getElementById("calc-result").textContent = "Result: " + result;
  });

  document.getElementById("country-btn").addEventListener("click", async () => {
    const name = document.getElementById("country-name").value.trim();
    const info = await getCountryInfo(name);
    document.getElementById("country-output").innerHTML =
      `<p><strong>Country:</strong> ${info.name}</p>
       <p><strong>Capital:</strong> ${info.capital}</p>
       <p><strong>Currency:</strong> ${info.currency}</p>
       <img src="${info.flag}" alt="Flag" width="100">`;
  });

  document.getElementById("temp-btn").addEventListener("click", async () => {
    const value = document.getElementById("temp-val").value;
    const dir = document.getElementById("temp-dir").value === "CtoF" ? "CelsiusToFahrenheit" : "FahrenheitToCelsius";
    const result = await convertTemp(dir, value);
    document.getElementById("temp-result").textContent = "Result: " + result;
  });

  document.getElementById("num-btn").addEventListener("click", async () => {
    const number = document.getElementById("num-input").value;
    const mode = document.getElementById("num-mode").value;
    const result = await numberToWords(mode, number);
    document.getElementById("num-result").textContent = "Result: " + result;
  });
});
