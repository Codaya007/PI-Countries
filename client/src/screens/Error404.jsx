import React from "react";
import { image404 } from "../assets/images";
import Button from "../components/Button";

const Error404 = ({ content }) => {
  return (
    <div>
      <h1>404</h1>
      <h2>Oooops!</h2>
      <p>{content}</p>
      <img
        style={{ width: "600px" }}
        src={image404}
        title="Not found:("
        alt="Not Found"
      />
      <Button href="/countries" content={"Volver al Inicio"} />
    </div>
  );
};

export default Error404;
