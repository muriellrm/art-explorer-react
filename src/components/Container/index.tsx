import MyIcon from "#/assets/logo.svg?react";
import { PAGE } from "#/routes/constants";
import { Box, Button, useColorMode, VStack } from "@chakra-ui/react";
import { Heart, Home, MoonIcon, SunMediumIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Container = ({ children }: any) => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <Box
        className="left-0 p-4 top-0 h-full flex flex-col justify-between"
        w={"80px"}
        position="fixed"
        bg="#dfdfdf"
        borderRight={"1px"}
        borderColor={"gray.500"}
      >
        <VStack gap={5}>
          <Button
            onClick={() => navigate(PAGE.ROOT())}
            bg="#dfdfdf"
            p={0}
            width="60px"
            height="60px"
            _hover={{ bg: "inherit" }}
          >
            <MyIcon width="100%" height="100%" />
          </Button>
          <Button
            onClick={() => navigate(PAGE.ROOT())}
            className="p-3"
            bg={"#dfdfdf"}
          >
            <Home />
          </Button>
          <Button
            onClick={() => navigate(PAGE.FAVORITES())}
            className="p-3"
            bg="#dfdfdf"
          >
            <Heart />
          </Button>
        </VStack>
        <VStack>
          <Button onClick={toggleColorMode} className="p-3" bg={"#dfdfdf"}>
            {colorMode === "light" ? <SunMediumIcon /> : <MoonIcon />}
          </Button>
        </VStack>
      </Box>
      {children}
    </div>
  );
};
