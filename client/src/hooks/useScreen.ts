import { useMutation, useQuery, useQueryClient } from "react-query";
import { InvokeArgs, invoke } from "@tauri-apps/api/tauri";

export interface ScreenConfig {
  brightness: number;
}

const getScreenConfig = async () => {
  const brightness = await invoke<string>("get_brightness");
  return {
    brightness: parseFloat(brightness),
  };
};

const setScreenConfig = async (screenConfig: ScreenConfig) => {
  invoke("set_brightness", screenConfig as unknown as InvokeArgs);
};

export const useScreen = () => {
  return useQuery("screenConfig", getScreenConfig);
};

export const useScreenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(setScreenConfig, {
    onSuccess: () => {
      queryClient.invalidateQueries("screenConfig");
    },
  });
};
