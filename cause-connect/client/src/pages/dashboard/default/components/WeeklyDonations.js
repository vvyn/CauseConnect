// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "../../components/Card";
// Custom components
import BarChart from "../../components/charts/BarChart";
import React from "react";
import {
  barChartDataConsumption,
  barChartOptionsConsumption,
} from "../../variables/charts";
import { MdBarChart } from "react-icons/md";

export default function WeeklyDonations(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("orangea", "white");
  const iconColor = useColorModeValue("orange", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
}