import {
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
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
  ...cardProps
}: DataCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card {...cardProps} onClick={onOpen}>
        <CardHeader paddingLeft={5} paddingTop={5} padding={""}>
          <Heading size="2xl">{headerText}</Heading>
        </CardHeader>
        <CardBody>
          {stats.length > 1 ? (
            <StatGroup>{renderSignalKStats(stats, false)}</StatGroup>
          ) : (
            renderSignalKStats(stats, false)
          )}
        </CardBody>
      </Card>
      <Modal onClose={onClose} size="full" isOpen={isOpen} trapFocus={false}>
        <ModalOverlay />
        <ModalContent padding="10px">
          <ModalHeader display="flex" justifyContent="space-between">
            <Heading size="4xl">{headerText}</Heading>
            <IconButton
              aria-label="Go Back"
              size="lg"
              icon={<ArrowBackIcon />}
              onClick={onClose}
            />
          </ModalHeader>
          <ModalBody>
            {stats.length > 1 ? (
              <StatGroup>{renderSignalKStats(stats, false)}</StatGroup>
            ) : (
              renderSignalKStats(stats, true)
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const renderSignalKStats = (stats: SignalKStatProps[], isFull = false) => {
  return stats.map((statProps, i) => {
    return (
      <SignalKStat key={`SignalKStat_${i}`} isFull={isFull} {...statProps} />
    );
  });
};
