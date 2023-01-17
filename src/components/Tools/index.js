import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import classnames from "classnames";
import React, { useRef } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Button from "@theme/Button";
import { useMediaQuery } from "react-responsive";

const toolList = [
  {
    title: <>Expander SDK</>,
    imageUrl: "img/xpanse_logo.png",
    toSite: "https://cortex-xpanse-python-sdk.readthedocs.io/en/latest/",
    description: <>Interface to the Xpanse Expander API.</>,
  },
];

function Tool({ imageUrl, title, description, toPage, toSite }) {
  const imgUrl = useBaseUrl(imageUrl);
  const toUrl = toPage ? useBaseUrl(toPage) : toSite;
  const isBreakpoint = useMediaQuery({ query: "(max-width: 1200px)" });
  return (
    <div className={isBreakpoint ? "col col--4" : "col col--2"}>
      <Button
        className={clsx(styles.toolsButton)}
        variant="tool"
        href={toUrl}
        target="_self"
        uppercase={false}
        newTab={false}
      >
        <div className={clsx("card", styles.tools)}>
          <div className="card__header">
            <div className={styles.imageContainer}>
              {imgUrl && <img className={styles.toolsImage} src={imgUrl} />}
              <img className={styles.toolsBorder} src="img/cortex_circle.png" />
            </div>
          </div>
          <div className="card__body">
            <div className={styles.toolsTitle}>{title}</div>
            <div className={styles.toolsSummary}>{description}</div>
          </div>
        </div>
      </Button>
    </div>
  );
}

function Tools() {
  return (
    <div>
      <h1 className={styles.toolSection}> Popular Resources </h1>
      {toolList && toolList.length && (
        <div className={classnames("row centRow")}>
          {toolList.map((props, idx) => (
            <Tool key={idx} {...props} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Tools;
