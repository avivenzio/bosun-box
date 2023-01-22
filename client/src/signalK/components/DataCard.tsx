import {
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Heading,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React from "react";

interface SignalKStatProps {
  label?: string;
  data?: number;
  unit?: string;
  isFull?: boolean;
}

export interface DataCardProps extends CardProps {
  headerText: string;
  stats: SignalKStatProps[];
  isFull?: boolean;
  onExpand: (props: Partial<DataCardProps>) => void;
}

const SignalKStat = ({ label, data, unit, isFull }: SignalKStatProps) => {
  return (
    <Stat size={isFull ? "full" : "xl"}>
      {label ? <StatLabel>{label}</StatLabel> : null}
      <StatNumber>{data ? data.toFixed(3) : "--"}</StatNumber>
      {unit ? <StatHelpText>{unit}</StatHelpText> : null}
    </Stat>
  );
};

export const DataCard = ({
  headerText,
  stats,
  onExpand,
  isFull = false,
  ...cardProps
}: DataCardProps) => {
  return (
    <Card {...cardProps} onClick={() => onExpand({ headerText, stats })}>
      <CardHeader paddingLeft={5} paddingTop={5} padding={""}>
        <Heading size={isFull ? "4xl" : "2xl"}>{headerText}</Heading>
      </CardHeader>
      <CardBody>
        {stats.length > 1 ? (
          <StatGroup>{renderSignalKStats(stats, false)}</StatGroup>
        ) : (
          renderSignalKStats(stats, isFull)
        )}
      </CardBody>
    </Card>
  );
};

const renderSignalKStats = (stats: SignalKStatProps[], isFull = false) => {
  return stats.map((statProps) => {
    return <SignalKStat isFull={isFull} {...statProps} />;
  });
};
