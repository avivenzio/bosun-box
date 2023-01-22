import { useMutation } from "react-query";
import { hwApi } from "../utils/api";

const setScreenConfig = async () => {
  return hwApi<undefined>("/power/shutdown", "POST");
};

export const useShutdown = () => {
  return useMutation(setScreenConfig);
};
