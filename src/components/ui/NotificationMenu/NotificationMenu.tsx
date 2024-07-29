import { useState } from "react";
import styles from "./NotificationMenu.module.scss";
import { Button } from "@mui/material";
import { Check } from "@mui/icons-material";

const NotificationMenu = () => {
  const [notifications, setNotifications] = useState([
    "Notification 1",
    "Notification 2",
    "Notification 3",
    "Notification 1",
    "Notification 2",
    "Notification 3",
    "Notification 1",
    "Notification 2",
    "Notification 3",
  ]);

  return (
    <div className={styles.notificationMenu}>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <p>{notification}</p>
            <Button
              className="button"
              sx={{
                color: "gray",
                backgroundColor: "#F0F0F0",
              }}
              size={"small"}
              variant="contained"
              startIcon={<Check sx={{ color: "gray" }} />}
            >
              Прочитано
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationMenu;
