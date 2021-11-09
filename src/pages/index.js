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
import Featured from "../components/Featured";
import Tools from "../components/Tools";

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const scrollToRef = (ref) =>
    ref.current.scrollIntoView({ behavior: "smooth" });
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
      <header className={classnames("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <div className={styles.hero}>
            <div className={styles.heroInner}>
              <div className="row">
                <div className={classnames("col col--12")}>
                  <h1 className={styles.heroProjectTagline}>
                    Welcome to the home of Developer Docs for Cortex
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.toolsback} ref={toolsRef}>
          <div className="container">
            <Featured />
            <Tools />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
