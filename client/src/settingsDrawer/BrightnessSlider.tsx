import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import React from "react";
import { SunIcon } from "@chakra-ui/icons";

export function BrightnessSlider() {
  const [sliderValue, setSliderValue] = React.useState(5);
  return (
    <Box display="flex" gap={8} alignItems="center">
      <Box flexGrow="1">
        <Slider
          id="slider"
          defaultValue={5}
          min={0}
          max={100}
          colorScheme="teal"
          onChange={(v) => setSliderValue(v)}
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
        {sliderValue} %
      </Box>
    </Box>
  );
}
