import { useEffect, useRef, useState } from "react";
import { listen, UnlistenFn } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/tauri";
import camelCase from "lodash/camelCase";
import { useToast } from '@chakra-ui/react'

interface NMEAData {
  latitude?: number;
  longitude?: number;
  sogKnots?: number;
  cogTrue?: number;
  cogMagnetic?: number;
  depthRelativeTransducer?: number;
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
  const toast = useToast()

  useEffect(() => {
    const openListener = async () => {
      try {
        setIsError(false);
        await invoke("init_nmea"); 
        const unlisten = await listen<NMEADataResponse>(
        "nmea_data",
        ({ payload }) => {
          const { data } = payload;
          setNmeaState((old: NMEAData) => {
            return data.reduce((acc, { key, value }) => {
              return {
                ...acc,
                [camelCase(key)]: value,
              };
            }, old);
          });
        }
      );
      unlistenRef.current = unlisten;
      } catch(err) {
        toast({
          title: 'NMEA Data connection failed',
          status: 'error',
          position:'top',
          duration: 6000,
          isClosable: true,
        });
      }
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
