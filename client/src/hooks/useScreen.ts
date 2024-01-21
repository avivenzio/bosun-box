import { useMutation, useQuery, useQueryClient } from "react-query";
import { InvokeArgs, invoke } from "@tauri-apps/api/tauri";
import { useToast } from '@chakra-ui/react'

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
  return invoke("set_brightness", screenConfig as unknown as InvokeArgs);
};

export const useScreen = () => {
  return useQuery("screenConfig", getScreenConfig);
};

export const useScreenMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(setScreenConfig, {
    onSuccess: () => {
      queryClient.invalidateQueries("screenConfig");
    },
    onError: () => {
      toast({
          title: 'Failed to update brightness.',
          status: 'error',
          position:'top',
          duration: 6000,
          isClosable: true,
        });
    }
  });
};
