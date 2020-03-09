import Layout from "@theme/Layout";
import React from "react";
import Form from "../components/form";

function Register() {
  return (
    <Layout description="Register for Cortex email updates">
      <div className="container margin-vert--xl">
        <h1>Sign up for more information!</h1>
        <div className="margin-bottom--lg">
          <h4>
            Register for information on becoming a Cortex™ Data Lake technology
            partner.
          </h4>
          <Form />
        </div>
      </div>
    </Layout>
  );
}

export default Register;
