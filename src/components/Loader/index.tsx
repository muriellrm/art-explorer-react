import { Box, Spinner } from "@chakra-ui/react";

interface IProps {
  show: boolean;
}

export const Loader: React.FC<IProps> = ({ show }) => {
  if (!show) return <></>;

  return (
    <Box
      className="flex items-center justify-center top-0 left-0"
      bg="blackAlpha.500"
      pos="fixed"
      width="100vw"
      height="100vh"
      zIndex="modal"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
};
