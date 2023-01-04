"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Toast.module.css";

export function ToastProvider() {
  return (
    <ToastContainer
      limit={5}
      toastClassName={`border dark:border-zinc-700 border-zinc-200 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 ${styles.toastWrapper}`}
    />
  );
}
