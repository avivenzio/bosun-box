import { useEffect, useReducer } from "react";

interface SignalKData {
  "navigation.position"?: { longitude: number; latitude: number };
  "navigation.speedOverGround"?: number;
  "navigation.courseOverGroundTrue"?: number;
  "environment.depth.belowTransducer"?: number;
}
type SignalKAction = { type: "update"; payload: object[] };

const reducer = (state: SignalKData, action: SignalKAction) => {
  switch (action.type) {
    case "update": {
      return action.payload.reduce((acc: any, item: any) => {
        return {
          ...acc,
          [item.path]: item.value,
        };
      }, state);
    }
    default:
      return state;
  }
};

export const useSignalK = (): { signalKState: SignalKData } => {
  const [signalKState, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    const websocket = new WebSocket(
      `ws://${window.location.hostname}:${3000}/signalk/v1/stream?sendMeta=all`
    );
    websocket.onopen = () => {
      console.log("connected");
    };
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { updates } = data;
      if (updates) {
        const [updateData] = updates;
        const { values } = updateData;
        if (values) {
          dispatch({ type: "update", payload: values });
        }
      }
    };
    return () => {
      websocket.close();
    };
  }, []);
  return { signalKState };
};
