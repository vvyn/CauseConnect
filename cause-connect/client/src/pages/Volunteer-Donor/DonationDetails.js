import React, { useState, useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
  FUNDING,
} from "@paypal/react-paypal-js";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";

// Define default style
const style = { layout: "vertical" };

// Function to handle PayPal donation
function paypalDonate() {
  window.location.href =
    "https://www.sandbox.paypal.com/donate/?hosted_button_id=3FQKL4X289YBW";
}

// DonationDetails component
export default function DonationDetails() {
  // State variables
  const [donationAmount, setDonationAmount] = useState(0);
  const [minHeight, setMinHeight] = useState("auto");

  // Check authentication status
  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (!user) {
          // Redirect to login page if not signed in
          window.location.href = "/vd/login"; 
        } else {
          // User is signed in, continue with page functionality
          console.log("User is logged in:", user);
        }
      },
      []
    );
  }, []);

  // Set minimum height dynamically
  useEffect(() => {
    setMinHeight("10000px");
  }, []);

  return (
    <div className="App flex flex-col justify-center items-center min-h-screen">
      {/* Donation container */}
      <div
        id="myDIV"
        style={{ minHeight: minHeight }}
        className="container mx-auto flex flex-col justify-center items-center"
      >
        {/* Donation title */}
        <h1 className="text-3xl justify-left mb-4">Donations</h1>
        
        {/* Donation form */}
        <div className="mb-4">
          <label className="text-sm justify-left block mb-2">
            Enter donation amount *
          </label>
          <input
            className="bg-orange-100 p-2 rounded-md text-white w-full"
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            placeholder="Enter donation amount"
            style={{ color: "black" }}
          />
        </div>
        
        {/* Space */}
        <div className="mb-8"></div>
        
        {/* PayPal donation buttons */}
        <PayPalScriptProvider
          options={{
            clientId:
              "Adr_2Smsx_jambx2RBQGnTXuqUmCSQXDgOOIESjkkeeybJ-9dDDlyLJm_JsRIU5MOvdk9OtBfmDohPKE",
            currency: "USD",
            intent: "capture",
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "50px", // Add some extra space below the PayPal buttons
          }}
        >
          <div style={{ position: "relative", top: "100px" }}>
            <PayPalButtons
              fundingSource={FUNDING.PAYPAL}
              style={{
                layout: "vertical",
                label: "donate",
                shape: "pill",
                tagline: false,
                paddingLeft: "500rem",
              }}
              onCancel={paypalDonate}
            />
            <PayPalButtons
              fundingSource={FUNDING.CARD}
              style={{
                layout: "vertical",
                label: "donate",
                shape: "pill",
                tagline: false,
                paddingLeft: "500rem"
              }}
            />
          </div>
        </PayPalScriptProvider>
        
        {/* Additional space */}
        <div style={{ marginBottom: "40px" }}></div>
      </div>
    </div>
  );
}
