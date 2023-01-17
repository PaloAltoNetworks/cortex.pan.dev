/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import classnames from "classnames";
import React from "react";
import styles from "./styles.module.css";

function Docs() {
  return (
    <main>
      <section class={styles.doc}>
        <div class="container">
          <center>
            <h2>Cortex Xpanse</h2>
          </center>
          <br />
          <div class="row minheight">
            <div class="col col--6">
              <div class={styles.docCard}>
                <div class="card shadow--md">
                  <div class="card__header">
                    <h3>Xpanse APIs</h3>
                    <description>
                      Getting up and running with Cortex® Xpanse™ APIs
                    </description>
                  </div>
                  <div class="card__body">
                    <Link href={useBaseUrl("api/expander/annotations-api")}>
                      Expander API
                    </Link>
                    <br></br>
                    <Link href="https://cortex-xpanse-python-sdk.readthedocs.io/en/latest/">
                      {" "}
                      Xpanse Python SDK{" "}
                    </Link>
                  </div>
                  <div class="card__footer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <section>
        <div class="container">
          <div class="row"></div>
          <div class="col col--12">
            <h3>Want to contribute? See something missing?</h3>
            <description>
              Visit our{" "}
              <a href={useBaseUrl("docs/contributing")}>Contributing Guide</a>{" "}
              to learn how easy it is to help make Cortex for Developers better!
            </description>
            <br></br>
            <br></br>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Docs;
