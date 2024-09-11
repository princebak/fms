"use client";

import React, { useEffect } from "react";
import FormWrapper from "./FormWrapper";
import Footer from "./elements/Footer";
import FooterElement from "./elements/FooterElement";
import { useSelector } from "react-redux";

const PaymentSuccessForm = ({ activeSubscription }: any) => {
  const { currentSubscription } = useSelector((state: any) => state.subscription);

  useEffect(() => {
    const activeCurrentSubscription = async () => {
      await activeSubscription(currentSubscription._id);
    };
    activeCurrentSubscription();
  }, []);

  return (
    <FormWrapper formLabel="Payment Success">
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
