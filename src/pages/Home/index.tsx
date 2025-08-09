import React from "react";

import { Card } from "#/components/Card";
import { Container } from "#/components/Container";
import { Loader } from "#/components/Loader";
import { ModalDetails } from "#/components/ModalDetail";
import { DEFAULT_IMG_URL } from "./constants";
import { useHome } from "./hooks";
import { FormProvider } from "react-hook-form";
import { Search } from "./components/Search";
import { Box } from "@chakra-ui/react";

export const Home: React.FC = () => {
  const { artworks, isLoading, loadmoreRef, methods, onSubmit } = useHome();

  return (
    <Container>
      {/* HEADER */}
      <Box
        as="header"
        className="fixed ml-20 top-0 left-0 right-0 flex items-center justify-center h-55 bg-white z-50 overflow-visible"
        _dark={{ bg: "gray.700" }}
        transition="background-color 0.3s ease"
      >
        <FormProvider {...methods}>
          <Search onSubmit={onSubmit} />
        </FormProvider>
      </Box>

      {/* MAIN */}
      <Box
        as="main"
        className="bg-gray-200 m-4 p-4 rounded-md shadow ml-26 mt-60"
        _dark={{ bg: "gray.800" }}
        transition="background-color 0.3s ease"
      >
        <div className="flex justify-center items-start flex-wrap gap-y-0 gap-x-15">
          {artworks?.length > 0
            ? artworks.map((artwork) => (
                <Card
                  key={artwork?.objectID}
                  artwork={artwork!}
                  imageSrc={artwork?.primaryImageSmall || DEFAULT_IMG_URL}
                  author={
                    artwork?.artistDisplayName || "Artista não identificado"
                  }
                  title={artwork?.title || ""}
                />
              ))
            : "Sem itens para exibir"}
        </div>
      </Box>

      <ModalDetails />
      <Loader show={isLoading} />
      <div ref={loadmoreRef} />
    </Container>
  );
};
