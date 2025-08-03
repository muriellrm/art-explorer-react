import { useArtworkModalStore } from "#/store/use-artwork-modal-store";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";

import { DEFAULT_IMG_URL } from "#/pages/Home/constants";
import React from "react";
import { User, Building, Calendar, Brush, ExternalLink } from "lucide-react";

export const ModalDetails: React.FC = () => {
  const { isOpen, onClose, artwork } = useArtworkModalStore();

  return (
    <Modal onClose={onClose} size="6xl" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent py={20} px={8}>
        <ModalCloseButton />
        <ModalBody className="flex flex-col md:flex-row items-center gap-10">
          <Box boxShadow="dark-lg" rounded="2xl" overflow="hidden">
            <Image
              height={500}
              width={500}
              src={artwork?.primaryImage || DEFAULT_IMG_URL}
              alt={artwork?.title || "Imagem"}
              objectFit="cover"
            />
          </Box>
          <VStack align="start" spacing={7} maxW="550px">
            <Heading fontSize="2xl" fontWeight="bold">
              {artwork?.title || "Sem título"}
              <Divider
                borderColor="green.400"
                borderWidth="2px"
                borderRadius="full"
                my="4"
              />
            </Heading>
            <Flex align="flex-start" gap={4}>
              <Box
                bg="green.400"
                borderRadius="xl"
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxSize="40px"
              >
                <User size={20} color="white" />
              </Box>
              <Box>
                <Text fontWeight="bold" mb={1}>
                  Artista
                </Text>
                <Text>{artwork?.artistDisplayName || "Não identificado"}</Text>
              </Box>
            </Flex>
            <Flex align="flex-start" gap={4}>
              <Box
                bg="green.400"
                borderRadius="xl"
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxSize="40px"
              >
                <Calendar size={20} color="white" />
              </Box>
              <Box>
                <Text fontWeight="bold" mb={1}>
                  Data
                </Text>
                <Text>{artwork?.objectDate || "Não informada"}</Text>
              </Box>
            </Flex>
            <Flex align="flex-start" gap={4}>
              <Box
                bg="green.400"
                borderRadius="xl"
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxSize="40px"
              >
                <Brush size={20} color="white" />
              </Box>
              <Box>
                <Text fontWeight="bold" mb={1}>
                  Técnica
                </Text>
                <Text>{artwork?.medium || "Não informada"}</Text>
              </Box>
            </Flex>
            <Flex align="flex-start" gap={4}>
              <Box
                bg="green.400"
                borderRadius="xl"
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxSize="40px"
              >
                <Building size={20} color="white" />
              </Box>
              <Box>
                <Text fontWeight="bold" mb={1}>
                  Departamento
                </Text>
                <Text>{artwork?.department || "Não identificado"}</Text>
              </Box>
            </Flex>
            {artwork?.primaryImage && (
              <Flex align="flex-start" gap={4}>
                <Box
                  bg="green.400"
                  borderRadius="xl"
                  p={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxSize="40px"
                >
                  <ExternalLink size={20} color="white" />
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={1}>
                    Imagem original
                  </Text>
                  <Link
                    href={artwork.primaryImage}
                    isExternal
                    color="blue.500"
                    fontWeight="medium"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Abrir em nova aba
                  </Link>
                </Box>
              </Flex>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
