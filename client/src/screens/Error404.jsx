import React from "react";
import { image404 } from "../assets/images";
import Button from "../components/Button";
import styles from "../styles/Error404.module.css";
import Aditionalstyle from "../styles/Button.module.css";

const Error404 = ({ content }) => {
  return (
    <div className={styles["container-404"]}>
      <h1 className={styles.title404}>404</h1>
      <h2 className={styles.subtitle404}>Oooops!</h2>
      <p className={styles.content404}>{content}</p>
      <img
        className={styles.img404}
        style={{ width: "600px" }}
        src={image404}
        title="Not found:("
        alt="Not Found"
      />
      <Button
        className={`${styles.btn404} ${Aditionalstyle["button-primary"]}`}
        href="/countries"
        content={"Volver al Inicio"}
      />
    </div>
  );
};

export default Error404;
