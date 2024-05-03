import React, { useEffect } from "react";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function DonationSummary() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/vd/login"; // Redirect to login page if not signed in
      } else {
        // User is signed in, continue with page functionality
        console.log("User is logged in:", user);
      }
    });
    return (
      <div>
        <div className="p-10">
          <div className="py-2 text-5xl text-orange-400">
            Your Donation Summary
          </div>

          <div className="py-2">
            <span>Donation Cause Selected</span>
            <div className="mt-0 text-2xl text-orange-300">Canned Goods</div>
          </div>
          <div className="my-1"> {}</div>
          <div className="py-2 text-3xl text-orange-400">Payment Details</div>

          <div className="py-2">
            <span>Donation Amount</span>
            <div className="mt-0 text-2xl text-orange-300">$100.00</div>
          </div>

          <div className="py-2">
            <span>Date and Time of Donation</span>
            <div className="mt-0 text-2xl text-orange-300">
              Saturday, March 23 at 12:30 PM
            </div>
          </div>

          <div className="py-2">
            <span>Name on Card</span>
            <div className="mt-0 text-2xl text-orange-300">Kim Chaewon</div>
          </div>

          <div className="py-2">
            <span>Card Details Used</span>
            <div className="mt-0 text-2xl text-orange-300">
              **** **** **** 0000
            </div>
          </div>
        </div>
        <div className="p-10">
          <div className="py-2 font-bold"></div>
          <button className="w-full bg-orange-300 rounded-xl text-s py-1 text-black px-2">
            Donated
          </button>
          <div
            className="py-2 text-2xl text-orange-400"
            style={{ textAlign: "center" }}
          >
            {" "}
            Thank you for your donation!
          </div>
        </div>
      </div>
    );
  }, []);
}
