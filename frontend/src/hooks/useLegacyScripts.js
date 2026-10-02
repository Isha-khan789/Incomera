import { useEffect } from "react";

/*
 * The 21 behaviour scripts from the original page, in their original order.
 * They are loaded as real <script src> elements rather than imported as ES
 * modules for two reasons:
 *
 *   1. They share state through the global scope (window.openCRM and friends).
 *      Wrapping them in module scope would break those references.
 *   2. Each one is its own parse unit, so a syntax error in one cannot take
 *      down the other twenty — the same isolation inline <script> tags gave
 *      them. (04-opens-an-overlay-instead.js does have a pre-existing syntax
 *      error, inherited from the original file.)
 *
 * async=false on a dynamically inserted script preserves execution order.
 */
const SCRIPTS = [
  "/legacy/01-the-spark-live.js",
  "/legacy/02-constants.js",
  "/legacy/03-seconds-a-caption-stays-up.js",
  "/legacy/04-opens-an-overlay-instead.js",
  "/legacy/05-stagger-the-two-motions.js",
  "/legacy/06-volume-bars.js",
  "/legacy/07-rgb.js",
  "/legacy/08-closeall.js",
  "/legacy/09-el.js",
  "/legacy/10-random-tools-light-up-as.js",
  "/legacy/11-draw.js",
  "/legacy/12-block.js",
  "/legacy/13-block.js",
  "/legacy/14-live-activity-feed.js",
  "/legacy/15-hand-the-submission-to-the-a.js",
  "/legacy/16-setrole.js",
  "/legacy/17-money.js",
  "/legacy/18-seeded-rng-so-numbers-are-st.js",
  "/legacy/19-weekends-closed.js",
  "/legacy/20-quick-replies.js",
  "/legacy/21-ensure.js",
];

let started = false;

export default function useLegacyScripts() {
  useEffect(() => {
    if (started) return;          // StrictMode runs effects twice in dev
    started = true;
    for (const src of SCRIPTS) {
      const el = document.createElement("script");
      el.src = src;
      el.async = false;
      document.body.appendChild(el);
    }
  }, []);
}
