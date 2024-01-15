import { useEffect, useReducer, useRef } from "react";
import { emit, listen, UnlistenFn } from '@tauri-apps/api/event';
import { invoke } from "@tauri-apps/api/tauri";

interface NMEAPair {
  key: string;
  value: string;
}

interface NMEAData {
  data: NMEAPair[];
}

export const useNmea = () => {
  //const [signalKState, dispatch] = useReducer(reducer, {});
  const unlistenRef = useRef<UnlistenFn | null>(null);

  useEffect(() => {
    const openListener = async () => {
      await invoke("init_nmea");
      const unlisten = await listen<NMEAData>('nmea_data', (event) => {
        console.log('getting event');
        console.log(event.payload);
      });
      unlistenRef.current = unlisten;
    }
    openListener();
    return () => {
      if (unlistenRef.current) {
        unlistenRef.current();
      }
    };
  }, []);

};
