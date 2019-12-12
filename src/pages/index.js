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
import Particles from "react-particles-js";
import ScrollUpButton from "react-scroll-up-button";
import styles from "./styles.module.css";

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 900
      }
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 5
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 0.2,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.2,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 250,
      color: "#ffffff",
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 4,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 200,
        line_linked: {
          opacity: 0.4
        }
      }
    }
  },
  retina_detect: true
};

const features = [
  {
    title: <>What is Cortex?</>,
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
          <div>
            <Particles className="particles" params={particlesOptions} />
          </div>
          <h1 className="hero__title">Develop Security</h1>
          <p className="hero__subtitle">
            using the most advanced cybersecurity data platform
          </p>
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
        <section className={styles.tools} ref={toolsRef}>
          <div className="container">
            <div className="row">
              {/* Placeholder */}
              <div className={classnames("col col--4", styles.tools)}></div>
              {/* PAN Cloud Python SDK */}
              <div className={classnames("col col--4", styles.tools)}>
                <div className="text text--center">
                  <img
                    className={styles.toolImage}
                    src="img/python.png"
                    alt="PAN Cloud Python SDK"
                  />
                </div>
                <h4>PAN Cloud Python SDK</h4>
                <p className={styles.text__gray}>
                  Python idiomatic SDK for Cortex™
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
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
