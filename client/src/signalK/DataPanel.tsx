import { Box } from "@chakra-ui/react";
import React from "react";
import { DataCard } from "./components/DataCard";
import { useSignalK } from "./state/useSignalK";
import { useNmea } from "./state/useNmea";

export const DataPanel = () => {
  const { signalKState } = useSignalK();
  useNmea();

  return (
    <Box display="flex" flexDirection="column">
      <Box width="100%">
        <DataCard
          headerText="Position"
          stats={[
            {
              label: "Latitude",
              data: signalKState["navigation.position"]?.latitude,
            },
            {
              label: "Longitude",
              data: signalKState["navigation.position"]?.longitude,
            },
          ]}
        />
      </Box>
      <Box display="flex" width="100%">
        <DataCard
          headerText="SOG"
          stats={[
            {
              data: signalKState["navigation.speedOverGround"],
              unit: "m/s",
            },
          ]}
          flexGrow="1"
        />
        <DataCard
          headerText="COG"
          stats={[
            {
              data: signalKState["navigation.courseOverGroundTrue"],
              unit: "Deg",
            },
          ]}
          flexGrow="1"
        />
        <DataCard
          headerText="Depth"
          stats={[
            {
              data: signalKState["environment.depth.belowTransducer"],
              unit: "m",
            },
          ]}
          flexGrow="1"
        />
      </Box>
    </Box>
  );
};
