import Layout from "@theme/Layout";
import React from "react";
import Form from "../components/form";

function Register() {
  return (
    <Layout description="Register for Cortex email updates">
      <div className="container margin-vert--xl">
        <h1>Sign up for early access!</h1>
        <div className="margin-bottom--lg">
          <h4>
            Register to become a Cortex technology partner and to be notified
            when the developer platform becomes available.
          </h4>
          <Form />
        </div>
      </div>
    </Layout>
  );
}

export default Register;