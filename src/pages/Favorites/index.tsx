import { Card } from "#/components/Card";
import { Container } from "#/components/Container";
import { Loader } from "#/components/Loader";
import { ModalDetails } from "#/components/ModalDetail";
import { useFakeLoading } from "#/hooks/use-fake-loading";
import { useFavoriteArtworkStore } from "#/store/use-favorite-artwork-store";
import React from "react";
import { Box } from "@chakra-ui/react";

export const Favorites: React.FC = () => {
  const { favoriteArtworks } = useFavoriteArtworkStore();
  const { loading } = useFakeLoading();

  return (
    <Container>
      <Box
        as="main"
        className="bg-gray-100 m-4 p-4 rounded-md shadow ml-26"
        _dark={{ bg: "gray.800" }}
        transition="background-color 0.3s ease"
      >
        <div className="flex justify-center items-start flex-wrap gap-y-0 gap-x-15">
          {favoriteArtworks?.length > 0
            ? favoriteArtworks.map((artwork) => (
                <Card
                  key={artwork?.objectID}
                  artwork={artwork!}
                  imageSrc={
                    artwork?.primaryImage ||
                    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                  }
                  author={
                    artwork?.artistDisplayName || "Artista não identificado"
                  }
                  title={artwork?.title || ""}
                />
              ))
            : "Sem itens salvo nos favoritos"}
        </div>
        <Loader show={loading} />
        <ModalDetails />
      </Box>
    </Container>
  );
};
