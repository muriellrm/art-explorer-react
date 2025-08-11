import type { Artwork } from "#/api/art-work/interface";
import { useArtworkModalStore } from "#/store/use-artwork-modal-store";
import { useFavoriteArtworkStore } from "#/store/use-favorite-artwork-store";
import {
  Box,
  Center,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Heart, HeartPlus } from "lucide-react";

interface IProps {
  imageSrc: string;
  author: string;
  title: string;
  artwork: Artwork;
}

export const Card: React.FC<IProps> = ({
  imageSrc,
  author,
  title,
  artwork,
}) => {
  const { isFavorite, toggleFavorite } = useFavoriteArtworkStore();
  const { onOpen } = useArtworkModalStore();
  const toast = useToast();

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"285px"}
        maxH={"400px"}
        minH={"400px"}
        w={"full"}
        bg="white"
        _dark={{ bg: "gray.700" }}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        transition="background-color 0.3s ease, color 0.3s ease, transform 0.3s ease"
        _hover={{
          transform: "scale(1.03)",
          boxShadow: "3xl",
        }}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${imageSrc})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            cursor={"pointer"}
            onClick={() => onOpen(artwork)}
            rounded={"lg"}
            height={230}
            width={282}
            src={imageSrc}
            alt="#"
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text
            color={"gray.500"}
            _dark={{ color: "gray.400" }}
            fontSize={"sm"}
            children={author}
            isTruncated
            maxW={"240px"}
            title={author}
          />
          <Heading
            className="w-60 overflow-hidden whitespace-nowrap text-ellipsis items-center text-center"
            fontSize={"large"}
            fontFamily={"body"}
            fontWeight={500}
            color="black"
            _dark={{ color: "white" }}
            children={title}
            title={title}
          />
        </Stack>
        <Stack pt={6} align={"center"}>
          <IconButton
            aria-label="favorite art"
            onClick={() => {
              toggleFavorite(artwork);
              const favorite = !isFavorite(artwork.objectID);
              toast({
                title: favorite
                  ? "Removido dos favoritos!"
                  : "Adicionado nos favoritos!",
                description: favorite
                  ? "A artwork foi removida da sua lista de favoritos."
                  : "A artwork foi adicionada com sucesso à sua lista de favoritos.",
                status: favorite ? "error" : "success",
                duration: 3000,
                isClosable: true,
              });
            }}
            bg="gray.50"
            _dark={{
              bg: "gray.600",
              boxShadow: "0px 1px 2px rgba(255, 255, 255, 1)",
              _hover: { boxShadow: "0px 1px 5px rgba(255, 255, 255, 1)" },
            }}
            borderRadius={"50%"}
            icon={
              !isFavorite(artwork.objectID) ? (
                <HeartPlus />
              ) : (
                <Heart fill="red" color="red" />
              )
            }
            boxShadow="0px 1px 2px rgba(0, 0, 0, 1)"
            _hover={{
              boxShadow: "0px 1px 5px rgba(0, 0, 0, 1)",
            }}
          />
        </Stack>
      </Box>
    </Center>
  );
};
