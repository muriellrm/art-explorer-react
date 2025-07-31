import { Button } from "@chakra-ui/react";
import React from "react";
import { useHome } from "./hooks";
import { Card } from "#/components/Card";
import { Loader } from "#/components/Loader";
import { Container } from "#/components/Container";

export const Home: React.FC = () => {
  const { artworks, isLoading, loadMoreArtworks } = useHome();

  return (
    <Container>
      <div className="flex justify-center items-start flex-wrap gap-y-0 gap-x-15">
        {artworks?.map((artwork) => (
          <Card
            key={artwork?.objectID}
            imageSrc={
              artwork?.primaryImage ||
              "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
            }
            author={artwork?.artistDisplayName || "Artista não identificado"}
            title={artwork?.title || ""}
          />
        ))}
      </div>
      <Button onClick={loadMoreArtworks}>Carregar mais</Button>
      <Loader show={isLoading} />
    </Container>
  );
};
