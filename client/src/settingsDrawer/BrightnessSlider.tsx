import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import React from "react";
import { SunIcon } from "@chakra-ui/icons";
import { useScreen, useScreenMutation } from "../hooks/useScreen";
import throttle from "lodash/throttle";

export function BrightnessSlider() {
  const { data } = useScreen();
  const { mutate } = useScreenMutation();
  const sliderValue = data ? data.brightness * 100 : 100;
  const updateScreenConfig = throttle(mutate, 300);
  const handleChange = (val: number) => {
    updateScreenConfig({
      brightness: val / 100,
    });
  };
  return (
    <Box display="flex" gap={8} alignItems="center">
      <Box flexGrow="1">
        <Slider
          id="slider"
          min={0}
          max={100}
          onChange={handleChange}
          value={sliderValue}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb>
            <SunIcon />
          </SliderThumb>
        </Slider>
      </Box>
      <Box flexGrow="0" flexShrink="0" flexBasis="75px" fontSize="2xl">
        {data ? data.brightness * 100 : "--"} %
      </Box>
    </Box>
  );
}
