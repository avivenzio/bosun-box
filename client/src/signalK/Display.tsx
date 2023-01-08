import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React from "react";
import { useSignalK } from "./state/useSignalK";

export const Display = () => {
  const { signalKState } = useSignalK();
  return (
    <Box display="flex" flexDirection="column" boxSize={"98%"} margin="auto">
      <Box width="100%">
        <Card width="100%">
          <CardHeader padding={5}>
            <Heading size="sm">Position</Heading>
          </CardHeader>
          <CardBody>
            <StatGroup>
              <Stat>
                <StatLabel>Latitude</StatLabel>
                <StatNumber>
                  {signalKState["navigation.position"]?.latitude.toFixed(4)}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Longitude</StatLabel>
                <StatNumber>
                  {signalKState["navigation.position"]?.longitude.toFixed(4)}
                </StatNumber>
              </Stat>
            </StatGroup>
          </CardBody>
        </Card>
      </Box>
      <Box display="flex" width="100%">
        <Card w="33.3%">
          <CardHeader>
            <Heading size="sm">SOG</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatNumber>
                {signalKState["navigation.speedOverGround"]?.toFixed(4)}
              </StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card w="33.3%">
          <CardHeader>
            <Heading size="sm">COG</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatNumber>
                {signalKState["navigation.courseOverGroundTrue"]?.toFixed(4)}
              </StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card w="33.3%">
          <CardHeader>
            <Heading size="sm">Depth</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatNumber>
                {signalKState["environment.depth.belowTransducer"]?.toFixed(4)}
              </StatNumber>
            </Stat>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
};
