import { TouchableOpacity } from "react-native";
import React from "react";
import debounce from "lodash/debounce";

export const Touchable = (props) => {
  const onPressMethod = debounce(
    () => { props.onPress(); },
    1000,
    {
      leading: true,
      trailing: false,
    }
  );
  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity ? props.activeOpacity : 0.8}
      onPress={() => onPressMethod()}
      style={{ ...props.style }}
    >
      {props.children}
    </TouchableOpacity>
  );
};
