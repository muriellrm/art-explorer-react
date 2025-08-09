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
        bg="white"
        borderRight={"1px"}
        borderColor={"gray.100"}
        _dark={{
          bg: "gray.700",
          borderColor: "gray.600",
        }}
        transition="background-color 0.3s ease, border-color 0.3s ease"
      >
        <VStack gap={5}>
          <Button
            onClick={() => navigate(PAGE.ROOT())}
            border={"2px"}
            borderColor={"gray.100"}
            bg="white"
            p={0}
            width="60px"
            height="60px"
            _hover={{ bg: "gray.200" }}
            _dark={{ bg: "transparent", borderColor: "transparent" }}
            transition="background-color 0.3s ease, border-color 0.3s ease"
          >
            <MyIcon width="100%" height="100%" />
          </Button>

          <Button
            onClick={() => navigate(PAGE.ROOT())}
            className="p-3"
            bg="white"
            _hover={{ bg: "gray.200", _dark: { bg: "gray.600" } }}
            _dark={{ bg: "gray.700" }}
            transition="background-color 0.3s ease"
          >
            <Home />
          </Button>

          <Button
            onClick={() => navigate(PAGE.FAVORITES())}
            className="p-3"
            bg="white"
            _hover={{ bg: "gray.200", _dark: { bg: "gray.600" } }}
            _dark={{ bg: "gray.700" }}
            transition="background-color 0.3s ease"
          >
            <Heart />
          </Button>
        </VStack>

        <VStack>
          <Button
            onClick={toggleColorMode}
            className="p-3"
            bg="white"
            _hover={{ bg: "gray.200", _dark: { bg: "gray.600" } }}
            _dark={{ bg: "gray.700" }}
            transition="background-color 0.3s ease"
          >
            {colorMode === "light" ? <SunMediumIcon /> : <MoonIcon />}
          </Button>
        </VStack>
      </Box>

      {children}
    </div>
  );
};
