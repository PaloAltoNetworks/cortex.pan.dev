import React from "react";

export default class Form extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      formLoaded: false,
      formSubmitted: false
    };
  }

  componentDidMount() {
    if (!this.state.formLoaded) {
      MktoForms2.loadForm(
        "https://app-ab28.marketo.com",
        "531-OCS-018",
        2572,
        () => this.setState({ formLoaded: true })
      );
    }
  }

  submitForm(e) {
    this.setState({ formSubmitted: true });
  }

  render() {
    if (!this.state.formSubmitted) {
      return (
        <>
          {!this.state.formLoaded && <div>Loading...</div>}
          <form id="mktoForm_2572" onSubmit={this.submitForm} />
        </>
      );
    } else {
      return <div>Thank you!!!!</div>;
    }
  }
}
