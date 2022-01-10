import React from "react";

const PageButton = ({ content, handleClick }) => {
  return <button onClick={handleClick}>{content}</button>;
};

export default PageButton;
