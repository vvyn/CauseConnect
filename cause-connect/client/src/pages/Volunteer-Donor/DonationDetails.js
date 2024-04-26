import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
  FUNDING,
} from "@paypal/react-paypal-js";

const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner }) => {
  const [{ isPending }] = usePayPalScriptReducer();
};

function paypalDonate() {
  window.location.href =
    "https://www.sandbox.paypal.com/donate/?hosted_button_id=3FQKL4X289YBW";
}

export default function DonationDetails() {
  return (
    <div className="App flex flex-col justify-center items-center min-h-screen">
      <PayPalScriptProvider
        options={{
          clientId:
            "Adr_2Smsx_jambx2RBQGnTXuqUmCSQXDgOOIESjkkeeybJ-9dDDlyLJm_JsRIU5MOvdk9OtBfmDohPKE",
          currency: "USD",
          intent: "capture",
        }}
      >
        <PayPalButtons
          fundingSource={FUNDING.PAYPAL}
          style={{
            layout: "vertical",
            label: "donate",
            shape: "pill",
            tagline: false,
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
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
