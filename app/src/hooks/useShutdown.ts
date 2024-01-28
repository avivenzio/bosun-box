import { useMutation } from "react-query";
import { invoke } from "@tauri-apps/api/tauri";

const setScreenConfig = async () => {
  invoke("shutdown");
};

export const useShutdown = () => {
  return useMutation(setScreenConfig);
};
