import { Anchor } from "@components/shared";
import styles from "./Breadcrumbs.module.css";

interface Route<T, U> {
  href: U;
  title: T;
}

function crumbs(projectId: string): [Route<"Home", "/">, Route<"Projects", "/projects">, Route<string, string>] {
  return [
    { href: "/", title: "Home" },
    { href: "/projects", title: "Projects" },
    { href: "/projects/random-project", title: projectId }
  ];
}

export function Breadcrumbs() {
  return (
    <div>
      {crumbs("Wedding project").map((route, key) => {
        return (
          <Anchor href={route.href} key={key} className={styles.link}>
            {route.title}
          </Anchor>
        );
      })}
    </div>
  );
}
