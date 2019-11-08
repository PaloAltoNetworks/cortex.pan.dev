import Link from "@docusaurus/Link";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

class Registerlink extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      formLoaded: false
    };
  }

  handleClose() {
    this.setState({ show: false, formLoaded: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  componentDidUpdate() {
    if (this.state.show && !this.state.formLoaded) {
      MktoForms2.loadForm("//app-ab28.marketo.com", "531-OCS-018", 2572, () =>
        this.setState({ formLoaded: true })
      );
    }
  }

  render() {
    return (
      <>
        <Link className="navbar__item navbar__link" onClick={this.handleShow}>
          Register
        </Link>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          size="md"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>Sign up for email updates and early access!</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!this.state.formLoaded && <div>Loading...</div>}
            <Form id="mktoForm_2572" />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Registerlink;
