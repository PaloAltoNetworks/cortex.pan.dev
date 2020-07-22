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
      <section className={styles.doc}>
        <div className="container">
          <h1>Cortex For Developers</h1>
          <description>
            Join a growing developer ecosystem building innovative apps. Use
            comprehensive data and global threat intelligence to fuel AI and
            machine learning for your apps while growing your own business and
            reputation.
          </description>
          <br></br>
          <br></br>
          <div className="row minheight">
            <div className="col col--6">
              <div class="card shadow--md">
                <div class="card__header">
                  <h3>Learn & Play</h3>
                  <description>
                    Want to learn more about Cortex Data Lake APIs? Ready to
                    play with the APIs and explore the data? You're in the right
                    place. Find everything you need here to get started and
                    build a solid foundation before you begin developing!
                  </description>
                </div>
                <div class="card__body">
                  <Link href={useBaseUrl("docs/learn/about_cdl")}>
                    CDL APIs
                  </Link>
                  <br></br>
                  <Link href={useBaseUrl("docs/learn/oauth2")}>OAuth 2.0</Link>
                  <br></br>
                  <Link href={useBaseUrl("docs/learn/credentials")}>
                    Credentials
                  </Link>
                  <br></br>
                  <Link href={useBaseUrl("docs/learn/apiexplorer_intro")}>
                    Start Exploring
                  </Link>
                  <br></br>
                </div>
                <div class="card__footer">
                  <Link
                    className={classnames(
                      "button button--primary stretch",
                      styles.docs
                    )}
                    href={useBaseUrl("/docs/learn")}
                  >
                    GO
                  </Link>
                </div>
              </div>
            </div>
            <div className="col col--6">
              <div class="card shadow--md">
                <div class="card__header">
                  <h2>Develop</h2>
                  <description>
                    Dive straight into building your own apps, scripts, and
                    integrations with our APIs and SDKs. Here you'll find guides
                    ranging from "Hello World!" to more advanced use cases.
                  </description>
                </div>
                <div class="card__body">
                  <Link href={useBaseUrl("docs/develop/quickstart")}>
                    Quickstart
                  </Link>
                  <br></br>
                  <Link
                    href={useBaseUrl("docs/develop/cdl_python_installation")}
                  >
                    PAN Cortex Python
                  </Link>
                  <br></br>
                  <Link
                    href={useBaseUrl(
                      "docs/develop/pan_cortex_data_lake_nodejs_qs"
                    )}
                  >
                    PAN Cortex NodeJS
                  </Link>
                  <br></br>
                  <Link
                    href={useBaseUrl(
                      "docs/develop/pan_cortex_data_lake_java_qs"
                    )}
                  >
                    PAN Cortex JAVA
                  </Link>
                </div>
                <div class="card__footer">
                  <Link
                    className={classnames(
                      "button button--primary stretch",
                      styles.docs
                    )}
                    href={useBaseUrl("docs/develop")}
                  >
                    GO
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row"></div>
          <div className="col col--12">
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
