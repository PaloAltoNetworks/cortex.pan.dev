import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import classnames from "classnames";
import React, { useRef } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Button from "@theme/Button";
import { useMediaQuery } from "react-responsive";

const features = [
  {
    title: <>Cortex Data Lake</>,
    imageUrl: "img/Cortex-Data-Lake-green.svg",
    description: (
      <>
        Get started developing with Cortex Data Lake.
        <br />
        <a
          target="_self"
          href="/docs/data_lake/develop/quickstart"
          rel="noopener noreferrer"
          className={styles.toLink}
        >
          Quickstart
        </a>
        <br />
        <a
          target="_self"
          href="/docs/data_lake/learn"
          rel="noopener noreferrer"
          className={styles.toLink}
        >
          CDL API Overview
        </a>
      </>
    ),
  },
  {
    title: <>Cortex Xpanse</>,
    imageUrl: "/img/Cortex-Xpanse-green.svg",
    toPage: "/api/expander/",
    description: (
      <>
        Browse through interactive API Documentation for Cortex Xpanse's
        Expander API
      </>
    ),
  },
];

function Feature({ imageUrl, title, description, toPage }) {
  const imgUrl = useBaseUrl(imageUrl);
  const toUrl = toPage ? useBaseUrl(toPage) : null;
  const isBreakpoint = useMediaQuery({ query: "(max-width: 1200px)" });

  if (toUrl) {
    return (
      <div
        className={
          isBreakpoint
            ? "col col--6 margin-bottom--md"
            : "col col--4 margin-bottom--md"
        }
      >
        <Button
          className={clsx(styles.featuredButton)}
          variant="plain"
          href={toUrl}
          target="_self"
          uppercase={false}
          newTab={false}
        >
          <div className={clsx("card shadow--lw", styles.featured)}>
            <div className="card__body">
              {imgUrl && <img className={styles.featuredImage} src={imgUrl} />}
              <div className={styles.featuredTitle}>{title}</div>
              <div className={styles.featuredSummary}>{description}</div>
            </div>
          </div>
        </Button>
      </div>
    );
  } else {
    return (
      <div
        className={
          isBreakpoint
            ? "col col--6 margin-bottom--md"
            : "col col--4 margin-bottom--md"
        }
      >
        <div className={styles.featuredLinks}>
          <div className={clsx("card shadow--lw", styles.featured)}>
            <div className="card__body">
              {imgUrl && <img className={styles.featuredImage} src={imgUrl} />}
              <div className={styles.featuredTitle}>{title}</div>
              <div className={styles.featuredSummary}>{description}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Featured() {
  return (
    <div>
      {features && features.length && (
        <div className={classnames("row centRow")}>
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Featured;
