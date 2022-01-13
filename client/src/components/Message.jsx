import React from "react";
import style from "../styles/Message.module.css";

const Message = ({ content, className }) => {
  return <div className={className || style.message}>{content}</div>;
};

export default Message;
