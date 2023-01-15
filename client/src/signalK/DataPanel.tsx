import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { DataCard, DataCardProps } from "./components/DataCard";
import { useSignalK } from "./state/useSignalK";

export const DataPanel = () => {
  const { signalKState } = useSignalK();

  const [fullCard, setFullCard] = useState<Partial<DataCardProps | null>>(null);

  return (
    <Box display="flex" flexDirection="column" boxSize={"98%"} margin="auto">
      {fullCard === null ? (
        <>
          <Box width="100%">
            <DataCard
              headerText="Position"
              onExpand={setFullCard}
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
              onExpand={setFullCard}
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
              onExpand={setFullCard}
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
              onExpand={setFullCard}
              stats={[
                {
                  data: signalKState["environment.depth.belowTransducer"],
                  unit: "m",
                },
              ]}
              flexGrow="1"
            />
          </Box>
        </>
      ) : (
        <Box>
          <DataCard
            {...(fullCard as DataCardProps)}
            onExpand={() => setFullCard(null)}
            isFull
            flexGrow="1"
          />
        </Box>
      )}
    </Box>
  );
};
