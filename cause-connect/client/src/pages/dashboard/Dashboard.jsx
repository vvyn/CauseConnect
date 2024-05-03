/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _|
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|

=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "../../assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "./components/MiniCalendar";
import MiniStatistics from "./components/MiniStatistics";
import IconBox from "./components/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
  MdMoney,
  MdPageview,
  MdPeople,
} from "react-icons/md";
import CheckTable from "./default/components/CheckTable";
import ComplexTable from "./default/components/ComplexTable";
import Volunteers from "./default/components/Volunteers";
import PieCard from "./default/components/PieCard";
import Tasks from "./default/components/Tasks";
import TotalRaised from "./default/components/TotalRaised";
import WeeklyDonations from "./default/components/WeeklyDonations";
import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";

export default function Dashbaord() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("orange", "white");
  const boxBg = useColorModeValue("orange", "orange");
  return (
    <div className="flex justify-center items-center p-10">
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
          gap="20px"
          mb="20px"
        >
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold">Donations Dashboard</h1>
            <div className="flex flex-row p-5">
              {/* Bar char for donations */}
              <Icon
                as={MdBarChart}
                color={brandColor}
                width="30px"
                height="30px"
              />
              <div className="flex flex-col">
                <p className="text-lg font-semibold ml-2">Total Donations</p>
                <p className="text-lg font-semibold ml-2">$1830.00</p>
              </div> 

              {/* $ Sign for donations */}
              <Icon
                className="ml-2"
                as={MdAttachMoney}
                color={brandColor}
                width="30px"
                height="30px"
              />
              <div className="flex flex-col pr-10">
                <p className="text-lg font-semibold ml-2">
                  Donations Raised This Week
                </p>
                <p className="text-lg font-semibold ml-2">$500.00</p>
              </div>

              {/* Volunteers*/}
              <Icon
                as={MdPeople}
                color={brandColor}
                width="30px"
                height="30px"
              />
              <div className="flex flex-col">
                <p className="text-lg font-semibold ml-2">Volunteers</p>
                <p className="text-lg font-semibold ml-2">57</p>
              </div>
            </div>
          </div>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
          <TotalRaised />
          <Volunteers />
          <WeeklyDonations />
        </SimpleGrid>
      </Box>
    </div>
  );
}
