# SOAP API Practice Project 🌐

This project is a **practice playground** for working with **SOAP APIs**.  
It demonstrates how to send SOAP requests, parse XML responses, and show results in a simple **frontend UI**.

---

## 📸 Screenshot
![SOAP Website UI](screenshot/soap%20website.png)

---

## 🚀 Live Demo
Project is hosted here:  
👉 [SOAP API Practice Website](https://fascinating-mousse-01e201.netlify.app/)

---

## 📚 APIs Used

### 1. Calculator API  
**WSDL:** `http://www.dneonline.com/calculator.asmx?WSDL`  
The Calculator SOAP API provides basic arithmetic operations.

**Use Cases:**
- Add two numbers.
- Subtract two numbers and handle negative results.
- Multiply and divide numbers.
- Simple UI calculator using SOAP.

---

### 2. Country Info Service  
**WSDL:** `http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL`  
Provides information about countries.

**Use Cases:**
- Fetch the capital of a given country.
- Display the currency and ISO codes.
- *(Optional)* Show the flag image in UI (removed here due to CORS issues on deploy).
- Search tool where a user enters a country code and gets detailed information.

---

### 3. Temperature Conversion Service  
**WSDL:** `https://www.w3schools.com/xml/tempconvert.asmx?WSDL`  
Converts between Celsius and Fahrenheit.

**Use Cases:**
- Convert Celsius → Fahrenheit.
- Convert Fahrenheit → Celsius.
- Weather app module for temperature conversions.

---

### 4. Number Conversion Service  
**WSDL:** `https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL`  
Converts numbers into words or currency format.

**Use Cases:**
- Convert integer to English words.
- Convert number into currency amount in words.
- Integration into invoice/finance tools.

---

## 🛠️ Features
- Clean responsive UI (HTML, CSS, JS).
- Error handling for failed API requests.
- Multiple CORS proxy fallback for SOAP APIs.
- Interactive sections:
  - Calculator
  - Country Info
  - Temperature Conversion
  - Number → Words

---

## 📂 Project Structure
```
project/
│── index.html
│── screenshot/
│    └── soap website.png
```

---

## ⚡ How to Run
1. Clone or download the project.
2. Open `index.html` in your browser.
3. Or visit the hosted Netlify link.

---

✍️ **Built for practice — exploring SOAP APIs**
