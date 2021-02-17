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
import { default as classnames } from "classnames";
import React, { useRef } from "react";
import ScrollUpButton from "react-scroll-up-button";
import styles from "./styles.module.css";

const features = [
  {
    title: <>What is Cortex?</>,
    imageUrl: "img/undraw_teaching.svg",
    description: (
      <>
        Cortex is an open, continuously evolving security platform, rich with
        context from cloud, endpoint and network sensors.
      </>
    ),
    button: (
      <div className={styles.buttons}>
        <Link
          className={classnames(
            "button button--primary button--md",
            styles.getStarted
          )}
          href="/docs/partner/what"
        >
          Learn More
        </Link>
      </div>
    )
  },
  {
    title: <>Why Cortex?</>,
    imageUrl: "img/undraw_void.svg",
    description: (
      <>
        Increase your speed to market by avoiding the deployment of on-premise
        cloud, endpoint and network agents at your customers.
      </>
    ),
    button: (
      <div className={styles.buttons}>
        <Link
          className={classnames(
            "button button--primary button--md",
            styles.getStarted
          )}
          href="/docs/partner/why"
        >
          Learn More
        </Link>
      </div>
    )
  },
  {
    title: <>Use Cases</>,
    imageUrl: "img/undraw_bookmarks.svg",
    description: (
      <>
        Learn about use cases that our customers are looking for or architect
        new solutions that will change how enterprises see your product.
      </>
    ),
    button: (
      <div className={styles.buttons}>
        <Link
          className={classnames(
            "button button--primary button--md",
            styles.getStarted
          )}
          href="/docs/partner/use"
        >
          Learn More
        </Link>
      </div>
    )
  }
];

function Feature({ imageUrl, title, description, button }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames("col col--4", styles.features)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      {button}
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const scrollToRef = ref => ref.current.scrollIntoView({ behavior: "smooth" });
  const partnersRef = useRef(null);
  const toolsRef = useRef(null);
  const scrollToPartners = () => scrollToRef(partnersRef);
  const scrollToTools = () => scrollToRef(toolsRef);
  return (
    <Layout
      title={`${siteConfig.themeConfig.navbar.title}`}
      description="All things related to automation and development with Cortex"
      wrapperClassName="homepage"
    >
      <ScrollUpButton />
      <div className="hero">
        <div className="container">
          <div className="row">
            <div className="col">
              <span
                className={classnames(
                  styles.description,
                  styles.text,
                  styles["text-huge"]
                )}
              >
                Develop security using the most advanced cybersecurity platform
              </span>
              <div>
                <Link
                  className={classnames(
                    "button button--primary button--lg",
                    styles.getStarted
                  )}
                  onClick={scrollToTools}
                  style={{ marginRight: 4 }}
                >
                  Explore Tools
                </Link>
              </div>
            </div>
            <div className="col">
              <img
                alt="Cortex Data Lake"
                src={useBaseUrl("img/cortex_diagram.svg")}
                style={{ marginTop: 10 }}
              />
            </div>
          </div>
        </div>
      </div>
      <main>
        {features && features.length && (
          <section className={styles.features} ref={partnersRef}>
            <div className="container">
              <br></br>
              <br></br>
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
        <section className={styles.toolsback} ref={toolsRef}>
          <div className="container">
            <div className="row">
              {/* PAN CDL Python SDK */}
              <div className={classnames("col col--4", styles.tools)}>
                <div className="text text--center">
                  <img
                    className={styles.toolImage}
                    src="img/python.png"
                    alt="Cortex Data Lake SDK"
                  />
                </div>
                <h4>Cortex Data Lake SDK</h4>
                <p className={styles.text__gray}>
                  Python idiomatic SDK for the Cortex Data Lake
                </p>
                <div className={styles.buttons}>
                  <Link
                    className={classnames(
                      "button button--primary button--md",
                      styles.quickstart
                    )}
                    href="/docs/develop/cdl_python_installation"
                  >
                    Quickstart
                  </Link>
                  <Link
                    className={classnames(
                      "button button--secondary button--md",
                      styles.github
                    )}
                    href="https://github.com/PaloAltoNetworks/pan-cortex-data-lake-python"
                  >
                    <img src="/img/github_logo.png" width="auto" height="19" />
                  </Link>
                </div>
              </div>
              {/* PAN CDL NodeJS Libraries */}
              <div className={classnames("col col--4", styles.tools)}>
                <div className="text text--center">
                  <img
                    className={styles.toolImage}
                    src="img/nodejs.png"
                    alt="Cortex NodeJS libs"
                  />
                </div>
                <h4>Cortex NodeJS libraries</h4>
                <p className={styles.text__gray}>
                  NodeJS idiomatic SDK for Cortex®
                </p>
                <div className={styles.buttons}>
                  <Link
                    className={classnames(
                      "button button--primary button--md",
                      styles.quickstart
                    )}
                    href="/docs/develop/pan_cortex_data_lake_nodejs_qs"
                  >
                    Quickstart
                  </Link>
                  <Link
                    className={classnames(
                      "button button--secondary button--md",
                      styles.github
                    )}
                    href="https://github.com/paloaltonetworks/pan-cortex-data-lake-nodejs"
                  >
                    <img src="/img/github_logo.png" width="auto" height="19" />
                  </Link>
                </div>
              </div>
              {/* PAN CDL JAVA Libraries */}
              <div className={classnames("col col--4", styles.tools)}>
                <div className="text text--center">
                  <img
                    className={styles.toolImage}
                    src="img/java.png"
                    alt="Cortex JAVA libs"
                  />
                </div>
                <h4>Cortex JAVA libraries</h4>
                <p className={styles.text__gray}>
                  NodeJS idiomatic SDK for Cortex®
                </p>
                <div className={styles.buttons}>
                  <Link
                    className={classnames(
                      "button button--primary button--md",
                      styles.quickstart
                    )}
                    href="/docs/develop/pan_cortex_data_lake_java_qs"
                  >
                    Quickstart
                  </Link>
                  <Link
                    className={classnames(
                      "button button--secondary button--md",
                      styles.github
                    )}
                    href="https://github.com/paloaltonetworks/pan-cortex-data-lake-java"
                  >
                    <img src="/img/github_logo.png" width="auto" height="19" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              {/* placeholder */}
              <div className={classnames("col col--4", styles.tools)}></div>
              {/* API Explorer */}
              <div className={classnames("col col--4", styles.tools)}>
                <div className="text text--center">
                  <img
                    className={styles.toolImage}
                    src="img/apiex.png"
                    alt="API Explorer"
                  />
                </div>
                <h4>API Explorer</h4>
                <p className={styles.text__gray}>
                  Jumpstart your next CDL app or integration!
                </p>
                <div className={styles.buttons}>
                  <Link
                    className={classnames(
                      "button button--primary button--md",
                      styles.quickstart
                    )}
                    href="/docs/learn/apiexplorer_intro"
                  >
                    Quickstart
                  </Link>
                  <Link
                    className={classnames(
                      "button button--secondary button--md",
                      styles.github
                    )}
                    href="https://apps.paloaltonetworks.com/marketplace/apiexplorer"
                  >
                    Marketplace
                  </Link>
                </div>
              </div>
              {/* placeholder */}
              <div className={classnames("col col--4", styles.tools)}></div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
