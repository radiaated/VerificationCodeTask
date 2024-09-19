import React from "react";
import { Helmet } from "react-helmet-async";

const Success = () => {
  return (
    <>
      <Helmet>
        <title>Success</title>
      </Helmet>
      <div className="success">Success!</div>
    </>
  );
};

export default Success;
