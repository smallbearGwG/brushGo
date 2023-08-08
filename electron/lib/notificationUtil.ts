import { Notification } from "electron";

function showNotification(title: string, body: string) {
  new Notification({
    title: title,
    body: body,
  }).show();
}

export default showNotification;
