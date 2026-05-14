"use client";

import { useCallback, useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.css";

const STORAGE_KEY = "cm-theme";

function applyStoredTheme() {
  try {
    if (localStorage.getItem(STORAGE_KEY) === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  } catch {
    /* ignore */
  }
}

function readTheme(): "light" | "dark" {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.storageArea !== localStorage) return;
    if (e.key !== STORAGE_KEY && e.key !== null) return;
    applyStoredTheme();
    onChange();
  };
  window.addEventListener("storage", onStorage);
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => {
    window.removeEventListener("storage", onStorage);
    mo.disconnect();
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark");

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      try {
        localStorage.setItem(STORAGE_KEY, "light");
      } catch {
        /* ignore */
      }
    } else {
      document.documentElement.removeAttribute("data-theme");
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
  }, [theme]);

  const isLight = theme === "light";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-pressed={isLight}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span className={styles.icon} aria-hidden>
        {isLight ? "☀" : "☾"}
      </span>
      <span className={styles.label}>{isLight ? "Dark mode" : "Light mode"}</span>
    </button>
  );
}
