import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { deleteNotification } from "../actions";
import { connect } from "react-redux";
import styles from "../styles/Notification.module.css";

const Notification = ({ notificationsList, deleteNotification }) => {
  const [notifications, setNotifications] = useState(notificationsList);
  const [icons, setIcons] = useState({});

  useEffect(() => {
    const iconsSvgs =
      require.context &&
      require.context("../assets/images/icons", true, /\.svg$/);

    const icons = iconsSvgs.keys().reduce((images, path) => {
      images[path.substring(2, path.length - 4)] = iconsSvgs(path);
      return images;
    }, {});
    setIcons(icons);
    // console.log(icons);
  }, []);

  useEffect(() => {
    setNotifications([...notificationsList]);
  }, [notificationsList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (notificationsList.length && notifications.length) {
        deleteNotification(notificationsList[0].id);
      }
    }, 2100);

    return () => {
      clearInterval(interval);
    };
  }, [notificationsList, notifications, deleteNotification]);

  const deleteNotificationState = (id) => {
    // seteo las notificaciones del store
    deleteNotification(id);
    // seteo las notificaciones del estado local
    setNotifications(notifications.filter((e) => e.id !== id));
  };

  return (
    <>
      <div
        className={`${styles["notification-container"]} ${styles["top-right"]}`}
      >
        {notifications.map((notification, i) => (
          <div
            key={i}
            className={`${styles.notification} ${styles["top-right"]} ${
              styles[`${notification.type}`]
            }`}
          >
            <button onClick={() => deleteNotificationState(notification.id)}>
              x
            </button>
            <div className={styles["notification-image"]}>
              <img src={icons[notification.type].default} alt="" />
            </div>
            <div>
              <h3 className={styles["notification-message"]}>
                {notification.description}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    notificationsList: state.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteNotification }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
