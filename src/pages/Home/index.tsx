import React from "react";

import { Card } from "#/components/Card";
import { Container } from "#/components/Container";
import { Loader } from "#/components/Loader";
import { ModalDetails } from "#/components/ModalDetail";
import { DEFAULT_IMG_URL } from "./constants";
import { useHome } from "./hooks";
import { AutocompleteInput } from "#/components/AutocompleteInput";
import { useGetDepartments } from "#/hooks/use-get-departments";

export const Home: React.FC = () => {
  const { artworks, isLoading, loadmoreRef } = useHome();
  const { data } = useGetDepartments();

  const handleSelect = (value: string) => {
    console.log("Selecionado:", value);
  };

  return (
    <Container>
      <header className="fixed ml-22 top-0 left-0 right-0 flex items-center justify-center h-25 bg-white z-50 overflow-visible">        
        <AutocompleteInput
          dataOptions={data || []}
          placeholder="Digite um departamento"
          onSelect={handleSelect}
        />
      </header>
      <main className="bg-gray-100 m-4 p-4 rounded-md shadow ml-26 mt-25">
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
      </main>
      <ModalDetails />
      <Loader show={isLoading} />
      <div ref={loadmoreRef} />
    </Container>
  );
};
