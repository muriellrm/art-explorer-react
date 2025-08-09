import { log } from "#/utils/logging";
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const { isOpen, onOpen } = useDisclosure();

  useEffect(() => {
    log.error("Algo deu errado!", {
      message: error.message,
      stack: error.stack,
    });
    onOpen();
  }, [error, onOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetErrorBoundary}
      isCentered
      size="md"
      closeOnOverlayClick={false}
    >
      <ModalOverlay
        bg="blackAlpha.600"
        _dark={{ bg: "blackAlpha.800" }}
        backdropFilter="blur(4px)"
      />
      <ModalContent
        bg="white"
        _dark={{ bg: "gray.900" }}
        color="gray.800"
        borderRadius="xl"
        boxShadow="2xl"
        p={6}
        mx={4}
      >
        <ModalHeader>
          <Heading
            fontSize="2xl"
            color="red.600"
            _dark={{ color: "red.400" }}
            mb={2}
          >
            Ops! Algo deu errado
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Text
            fontSize="md"
            color="red.500"
            _dark={{ color: "red.300" }}
            whiteSpace="pre-wrap"
            mb={4}
            letterSpacing="wider"
          >
            {error.message}
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="center" pt={0}>
          <Button
            colorScheme="red"
            variant="solid"
            size="md"
            fontWeight="bold"
            px={8}
            onClick={resetErrorBoundary}
            _hover={{ bg: "red.600", _dark: { bg: "red.500" } }}
          >
            Tentar novamente
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
