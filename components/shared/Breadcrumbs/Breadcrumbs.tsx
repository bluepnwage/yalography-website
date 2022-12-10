import styles from "./Breadcrumbs.module.css";

type PropTypes = {
  children: React.ReactNode;
};

export function Breadcrumbs({ children }: PropTypes) {
  return <div className={styles.container}>{children}</div>;
}
