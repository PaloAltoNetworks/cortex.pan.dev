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
import ScrollUpButton from "react-scroll-up-button";
import styles from "./styles.module.css";

const features = [
  {
    title: <>What is Cortex®?</>,
    imageUrl: "img/undraw_teaching.svg",
    description: (
      <>
        Cortex® is an open, continuously evolving security platform, rich with
        context from cloud, endpoint and network sensors.
      </>
    ),
    button: (
      <div className={styles.buttons}>
        <Link
          className={classnames(
            "button button--outline button--info button--md",
            styles.getStarted
          )}
          href="/docs/what"
        >
          Learn More
        </Link>
      </div>
    )
  },
  {
    title: <>Why Cortex®?</>,
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
            "button button--outline button--info button--md",
            styles.getStarted
          )}
          href="/docs/why"
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
            "button button--outline button--info button--md",
            styles.getStarted
          )}
          href="/docs/usecases"
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
  const vertificalsRef = useRef(null);
  const toolsRef = useRef(null);
  const scrollToVerticals = () => scrollToRef(vertificalsRef);
  const scrollToTools = () => scrollToRef(toolsRef);
  return (
    <Layout
      title={`${siteConfig.themeConfig.navbar.title}`}
      description="All things related to automation and development with Cortex®"
    >
      <ScrollUpButton />
      <header className={classnames("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <div className={styles.hero}>
            <div className={styles.heroInner}>
              <h1 className={styles.heroProjectTagline}>
                <img
                  alt="Devin the Developer Advocate"
                  className={styles.heroLogo}
                  src={useBaseUrl("img/cortexpeelable.png")}
                />
                Develop{" "}
                <span className={styles.heroProjectKeywords}>security</span>{" "}
                using the{" "}
                <span className={styles.heroProjectKeywords}>
                  most advanced
                </span>{" "}
                cybersecurity platform
              </h1>
              <div className={styles.buttons}>
                <Link
                  className={classnames(
                    "button button--outline button--info button--lg",
                    styles.getStarted
                  )}
                  onClick={scrollToTools}
                >
                  Explore Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features} ref={vertificalsRef}>
            <div className="container">
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
              {/* Placeholder */}
              <div className={classnames("col col--1", styles.tools)}></div>
              {/* PAN Cloud Python SDK */}
              <div className={classnames("col col--3", styles.tools)}>
                <div className="text text--center">
                  <img
                    className={styles.toolImage}
                    src="img/python.png"
                    alt="PAN Cloud Python SDK"
                  />
                </div>
                <h4>PAN Cloud Python SDK</h4>
                <p className={styles.text__gray}>
                  Python idiomatic SDK for Cortex®
                </p>
                <div className={styles.buttons}>
                  <Link
                    className={classnames(
                      "button button--outline button--info button--md",
                      styles.quickstart
                    )}
                    href="/docs/pancloud_python_qs"
                  >
                    Quickstart
                  </Link>
                  <Link
                    className={classnames(
                      "button button--outline button--info button--md",
                      styles.github
                    )}
                    href="https://github.com/PaloAltoNetworks/pancloud"
                  >
                    <img
                      src="/img/GitHub_Logo_White.png"
                      width="auto"
                      height="19"
                    />
                  </Link>
                </div>
                {/* Placeholder */}
                <div className={classnames("col col--4", styles.tools)}></div>
              </div>
              {/* PAN Corex NodeJS Libraries */}
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
                      "button button--outline button--info button--md",
                      styles.quickstart
                    )}
                    href="/docs/pan_cortex_data_lake_nodejs_qs"
                  >
                    Quickstart
                  </Link>
                  <Link
                    className={classnames(
                      "button button--outline button--info button--md",
                      styles.github
                    )}
                    href="https://github.com/paloaltonetworks/pan-cortex-data-lake-nodejs"
                  >
                    <img
                      src="/img/GitHub_Logo_White.png"
                      width="auto"
                      height="19"
                    />
                  </Link>
                </div>
                {/* Placeholder */}
                <div className={classnames("col col--4", styles.tools)}></div>
              </div>
              {/* PAN Corex JAVA Libraries */}
              <div className={classnames("col col--3", styles.tools)}>
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
                      "button button--outline button--info button--md",
                      styles.quickstart
                    )}
                    href="/docs/pan_cortex_data_lake_java_qs"
                  >
                    Quickstart
                  </Link>
                  <Link
                    className={classnames(
                      "button button--outline button--info button--md",
                      styles.github
                    )}
                    href="https://github.com/paloaltonetworks/pan-cortex-data-lake-java"
                  >
                    <img
                      src="/img/GitHub_Logo_White.png"
                      width="auto"
                      height="19"
                    />
                  </Link>
                </div>
                {/* Placeholder */}
                <div className={classnames("col col--4", styles.tools)}></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
