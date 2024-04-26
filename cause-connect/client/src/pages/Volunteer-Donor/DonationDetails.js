import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const DonationDetails = () => {
  const [donationAmount, setDonationAmount] = useState("");

  const handleDonationSubmit = () => {
    
  };

  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  return (
    <div className="pt-20 w-full">
      <Stack
        className="relative"
        direction="column"
        alignItems="center"
        spacing={2}
      >
        <div className="w-1/3">
          <h1 className="text-3xl justify-left">Make a Donation</h1>
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
            style={{ color: "black" , marginBottom: "50px" }}
          />
          
        </div>
      </Stack>


      <div className="flex justify-center items-center">
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons style={{ layout: "vertical" }} />
        </PayPalScriptProvider>
      </div>



      
      <div className="flex justify-center items-center">
        <button
          className="bg-orange-400 p-2 rounded-3xl text-white w-1/3"
          onClick={handleDonationSubmit}
          style={{ marginTop: "20px" }} // Adjust margin to position the button
          > Save
        </button>

  </div>

    </div>
  );
};

export default DonationDetails;