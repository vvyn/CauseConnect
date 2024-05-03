import React, { useState, useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
  FUNDING,
} from "@paypal/react-paypal-js";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";

const style = { layout: "vertical" };

function paypalDonate() {
  window.location.href =
    "https://www.sandbox.paypal.com/donate/?hosted_button_id=3FQKL4X289YBW";
}

export default function DonationDetails() {
  const [donationAmount, setDonationAmount] = useState(0);
  const [minHeight, setMinHeight] = useState("auto");

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (!user) {
          window.location.href = "/vd/login"; // Redirect to login page if not signed in
        } else {
          // User is signed in, continue with page functionality
          console.log("User is logged in:", user);
        }
      },
      []
    );
  }, []);

  useEffect(() => {
    // Set the minimum height to 100px
    setMinHeight("2000px");
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="App flex flex-col justify-center items-center min-h-screen">
      <div
        id="myDIV"
        style={{ minHeight: minHeight }} // Set the minHeight style dynamically
        className="container mx-auto flex flex-col justify-center items-center"
      >
        <h1 className="text-3xl justify-left mb-4">Donations</h1>
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
        <div className="mb-8"></div> {/* Additional space */}
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
        <div style={{ marginBottom: "40px" }}></div> {/* Additional space */}
      </div>
    </div>
  );
}
