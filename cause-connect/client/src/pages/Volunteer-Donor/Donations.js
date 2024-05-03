import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";

const Donations = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleCVVChange = (event) => {
    let inputCVV = event.target.value;
    // Remove non-numeric characters
    inputCVV = inputCVV.replace(/\D/g, "");
    setCVV(inputCVV);
  };

  const handleExpiryDateChange = (event) => {
    let inputExpiryDate = event.target.value;
    // Remove non-numeric characters
    inputExpiryDate = inputExpiryDate.replace(/\D/g, "");
    // Ensure MM is between 1 and 12
    let month = inputExpiryDate.slice(0, 2);
    if (parseInt(month, 10) > 12) {
      month = "12";
    }
    // Ensure YY is 23 or greater
    let year = inputExpiryDate.slice(2);
    if (year) {
      // If YY is less than 23, set it to 23
      year = parseInt(year, 10) < 23 ? "23" : year;
    }
    // Concatenate MM and YY with "/"
    let formattedExpiryDate = "";
    if (month) {
      formattedExpiryDate += month;
      if (year) {
        formattedExpiryDate += "/" + year;
      }
    }
    setExpiryDate(formattedExpiryDate);
  };

  const handleZipCodeChange = (event) => {
    let inputZipCode = event.target.value;
    // Remove non-numeric characters
    inputZipCode = inputZipCode.replace(/\D/g, "");
    // Limit the zip code to a maximum of 5 numerical characters
    inputZipCode = inputZipCode.slice(0, 5);
    setZipCode(inputZipCode);
  };

  const handleCreditCardNumberChange = (event) => {
    let inputCreditCardNumber = event.target.value;
    // Remove non-numeric characters
    inputCreditCardNumber = inputCreditCardNumber.replace(/\D/g, "");
    // Format credit card number
    let formattedCreditCardNumber = "";
    for (let i = 0; i < inputCreditCardNumber.length; i++) {
      if (
        (i + 1) % 5 === 0 &&
        i !== 0 &&
        i !== inputCreditCardNumber.length - 1
      ) {
        // Insert space after every 4 digits except for the first and last one
        formattedCreditCardNumber += " " + inputCreditCardNumber[i];
      } else if (i === inputCreditCardNumber.length - 1) {
        // Show the last digit as is
        formattedCreditCardNumber += inputCreditCardNumber[i];
      } else {
        // Replace other digits with dots
        formattedCreditCardNumber += "●";
      }
    }
    setCreditCardNumber(formattedCreditCardNumber);
  };

  // const handleDonationSubmit = () => {
  //   // Handle donation submission logic here
  // };

  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/vd/login"; // Redirect to login page if not signed in
      } else {
        // User is signed in, continue with page functionality
        console.log("User is logged in:", user);
      }
    });
  }, []);
  return (
    <div className="pt-20">
      <Stack
        className="relative"
        direction="column"
        alignItems="center"
        spacing={2}
      >
        <div className="w-1/3">
          <h1 className="text-3xl justify-left">Donations</h1>
        </div>

        <div className="w-1/3">
          <label className="text-sm justify-left">
            Enter donation amount *
          </label>
        </div>
        <div className="w-1/3">
          <input
            className="bg-orange-100 p-2 rounded-md text-white w-full"
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            placeholder="Enter donation amount"
            style={{ color: "black" }}
          />
        </div>

        <div className="w-1/3">
          <label className="text-sm justify-left">Country / Region *</label>
        </div>
        <div className="w-1/3">
          <select
            className="bg-orange-100 p-2 rounded-md text-black w-full"
            value={country}
            onChange={handleCountryChange}
          >
            <option value="">Select a country</option>
            <option value="USA">United States</option>
            <option value="CAN">Canada</option>
            <option value="MEX">Mexico</option>
          </select>
        </div>

        <div className="w-1/3">
          <label className="text-sm justify-left">Zip Code</label>
        </div>
        <div className="w-1/3">
          <input
            className="bg-orange-100 p-2 rounded-md text-white w-full"
            type="text"
            value={zipCode}
            onChange={handleZipCodeChange}
            maxLength={5} // Set maximum length to 5 characters
            placeholder="Enter Zip Code"
            style={{ color: "black" }}
          />
        </div>

        <div className="w-1/3">
          <label className="text-sm justify-left">Cardholder Name *</label>
        </div>
        <div className="w-1/3">
          <input
            className="bg-orange-100 p-2 rounded-md text-white w-full"
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="Enter cardholder name"
            style={{ color: "black" }}
          />
        </div>

        <div className="w-1/3">
          <label className="text-sm justify-left">
            Enter Credit Card number *
          </label>
        </div>
        <div className="w-1/3">
          <input
            className="bg-orange-100 p-2 rounded-md text-white w-full"
            type="text"
            value={creditCardNumber}
            onChange={handleCreditCardNumberChange}
            maxLength={19} // Set maximum length to 19 characters (including spaces)
            placeholder="xxxx xxxx xxxx xxxx"
            style={{ color: "black" }}
          />
        </div>

        <div className="w-1/3">
          <label className="text-sm justify-left">Expire date *</label>
        </div>
        <div className="w-1/3">
          <input
            className="bg-orange-100 p-2 rounded-md text-white w-full"
            type="text"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            maxLength={5} // Set maximum length to 5 characters (MM/YY format)
            pattern="(0[1-9]|1[0-2])\/(2[2-9]|[3-9][0-9])" // Pattern for MM/YY format validation
            placeholder="MM/YY"
            style={{ color: "black" }}
          />
        </div>

        <div className="w-1/3">
          <label className="text-sm justify-left">CVV / CVC *</label>
        </div>
        <div className="w-1/3">
          <input
            className="bg-orange-100 p-2 rounded-md text-white w-full"
            type="text"
            value={cvv}
            onChange={handleCVVChange}
            maxLength={3}
            pattern="[0-9]*" // Only allow numerical characters
            placeholder="Enter CVV/CVC"
            style={{ color: "black" }}
          />
        </div>

        {/* <button
          className="bg-orange-400 p-2 rounded-3xl text-white w-1/3"
          onClick={paypalDonation}
          style={{ marginBottom: "100px" }}
        >
          Make Payment
        </button> */}
      </Stack>
    </div>
  );
};

export default Donations;
