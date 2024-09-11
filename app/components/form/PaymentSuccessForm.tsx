"use client";

import React, { useEffect } from "react";
import FormWrapper from "./FormWrapper";
import Footer from "./elements/Footer";
import FooterElement from "./elements/FooterElement";
import { useSelector } from "react-redux";
import Image from "next/image";

const PaymentSuccessForm = ({ activeSubscription }: any) => {
  const { currentSubscription } = useSelector(
    (state: any) => state.subscription
  );

  useEffect(() => {
    const activeCurrentSubscription = async () => {
      await activeSubscription(currentSubscription._id);
    };
    activeCurrentSubscription();
  }, []);

  return (
    <FormWrapper formLabel="Payment Success">
      <div className="d-flex justify-content-center">
        <div style={{ width: "100px", height: "auto" }}>
          <Image
            src={"/images/payment-success.png"}
            width={100}
            height={100}
            alt="success"
          />
        </div>
      </div>

      <label className="alert alert-success">
        {"Payment done with success !"}
      </label>

      <Footer>
        <FooterElement
          firstText="Want to manage your files"
          secondText="dashboard"
          isborderTop={true}
          link="/dashboard"
        />
      </Footer>
    </FormWrapper>
  );
};

export default PaymentSuccessForm;
