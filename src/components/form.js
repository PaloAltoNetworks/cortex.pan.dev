import React from "react";

export default class Form extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      formLoaded: false
    };
  }

  componentDidMount() {
    if (!this.state.formLoaded) {
      MktoForms2.loadForm(
        "https:////app-ab28.marketo.com",
        "531-OCS-018",
        2572,
        () => this.setState({ formLoaded: true })
      );
    }
  }

  render() {
    return (
      <>
        <form id="mktoForm_2572" />
      </>
    );
  }
}
