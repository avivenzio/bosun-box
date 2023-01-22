import { useMutation, useQuery, useQueryClient } from "react-query";
import { hwApi } from "../utils/api";

export interface ScreenConfig {
  brightness: number;
}

const getScreenConfig = async () => {
  return hwApi<ScreenConfig>("/screen");
};

const setScreenConfig = async (screenConfig: ScreenConfig) => {
  return hwApi<ScreenConfig>("/screen", "PATCH", screenConfig);
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
