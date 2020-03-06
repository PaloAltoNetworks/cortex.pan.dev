/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import classnames from "classnames";
import React, { useRef } from "react";
import styles from "./styles.module.css";

function Docs() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const scrollToRef = ref => ref.current.scrollIntoView({ behavior: "smooth" });
  const vertificalsRef = useRef(null);
  const toolsRef = useRef(null);
  const scrollToVerticals = () => scrollToRef(vertificalsRef);
  const scrollToTools = () => scrollToRef(toolsRef);
  return (
    <Layout
      title={`${siteConfig.themeConfig.navbar.title}`}
      description="All things related to automation and development with Demisto"
    >
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
                      Wants to learn more about Cortex APIs? Ready to play with
                      the APIs and see the data? This is a great place to start
                      and build a foundation before you began developing!
                    </description>
                  </div>
                  <div class="card__body">
                    <Link href={useBaseUrl("docs/learn")}>Start Exploring</Link>
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
                      Learn and Play
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col col--6">
                <div class="card shadow--md">
                  <div class="card__header">
                    <h2>Develop</h2>
                    <description>
                      Dive straight into buildling your own apps, scripts, and
                      tools using our APIs and SDKs. Guides ranging from Hello,
                      World! to real life use cases.
                    </description>
                  </div>
                  <div class="card__body">
                    <Link href={useBaseUrl("docs/develop/pancloud_python_qs")}>
                      PAN Cloud Python
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
                      Develop
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
                to learn how easy it is to help make Cortex for Developers
                better!
              </description>
              <br></br>
              <br></br>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Docs;
