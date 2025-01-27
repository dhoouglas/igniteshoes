import { OneSignal } from "react-native-onesignal";

export function tagUserInfoCreate() {
  OneSignal.User.addTags({
    user_name: "Douglas",
    user_email: "douglas.lima@email.com",
  });
}
