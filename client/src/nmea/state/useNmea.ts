import { useEffect, useRef, useState } from "react";
import { listen, UnlistenFn } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/tauri";

interface NMEAData {
  latitude?: number;
  longitude?: number;
  sogKnots?: number;
  cogTrue?: number;
  cogMagnetic?: number;
  depth?: number;
  bearing?: number;
}

interface NMEAPair {
  key: keyof NMEAData;
  value: number;
}

interface NMEADataResponse {
  data: NMEAPair[];
}

export const useNmea = () => {
  const [nmeaState, setNmeaState] = useState<NMEAData>({});
  const unlistenRef = useRef<UnlistenFn | null>(null);

  useEffect(() => {
    const openListener = async () => {
      await invoke("init_nmea");
      const unlisten = await listen<NMEADataResponse>(
        "nmea_data",
        ({ payload }) => {
          console.log("getting event");
          console.log(payload);
          const { data } = payload;
          setNmeaState((old: NMEAData) => {
            return data.reduce((acc, { key, value }) => {
              return {
                ...acc,
                [key]: value,
              };
            }, old);
          });
        }
      );
      unlistenRef.current = unlisten;
    };
    openListener();
    return () => {
      if (unlistenRef.current !== null) {
        unlistenRef.current();
      }
    };
  }, []);

  return { nmeaState };
};
