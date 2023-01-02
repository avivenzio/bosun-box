import React, { useEffect } from "react";

export const App = () => {
  useEffect(() => {
    const websocket = new WebSocket(
      "ws://localhost:3000/signalk/v1/stream?sendMeta=all"
    );
    websocket.onopen = () => {
      console.log("connected");
    };
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
    };
    return () => {
      websocket.close();
    };
  }, []);
  return <>APP</>;
};
