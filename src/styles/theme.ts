// src/theme.ts
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true, // detecta o modo do sistema
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#f5f5f5",
      100: "#e0e0e0",
      200: "#bdbdbd",
      300: "#9e9e9e",
      400: "#757575",
      500: "#616161",
      600: "#424242",
      700: "#333333",
      800: "#212121",
      900: "#121212",
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
        color: props.colorMode === "dark" ? "gray.100" : "gray.800",
        transition: "background-color 0.3s ease, color 0.3s ease",
      },
    }),
  },
  components: {
    Card: {
      baseStyle: (props: any) => ({
        bg: props.colorMode === "dark" ? "gray.800" : "white",
        color: props.colorMode === "dark" ? "white" : "black",
        borderRadius: "lg",
        boxShadow: "2xl",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }),
    },
  },
});

export default theme;
