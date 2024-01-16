import { Box } from "@chakra-ui/react";
import React from "react";
import { DataCard } from "./components/DataCard";
import { useNmea } from "./state/useNmea";

export const DataPanel = () => {
  const { nmeaState } = useNmea();
  console.log('----');
  console.log(nmeaState);
  return (
    <Box display="flex" flexDirection="column">
      <Box width="100%">
        <DataCard
          headerText="Position"
          stats={[
            {
              label: "Latitude",
              data: nmeaState.latitude,
            },
            {
              label: "Longitude",
              data: nmeaState.longitude,
            },
          ]}
        />
      </Box>
      <Box display="flex" width="100%">
        <DataCard
          headerText="SOG"
          stats={[
            {
              data: nmeaState.sogKnots,
              unit: "knots",
            },
          ]}
          flexGrow="1"
        />
        <DataCard
          headerText="COG"
          stats={[
            {
              data: nmeaState.cogTrue,
              unit: "Deg",
            },
          ]}
          flexGrow="1"
        />
        <DataCard
          headerText="Depth"
          stats={[
            {
              data: nmeaState.depthRelativeTransducer,
              unit: "m",
            },
          ]}
          flexGrow="1"
        />
      </Box>
    </Box>
  );
};
