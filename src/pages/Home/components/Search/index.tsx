import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { AutocompleteInput } from "#/components/AutocompleteInput";
import { useGetDepartments } from "#/hooks/use-get-departments";
import type { SearchParams } from "#/pages/Home/resolver";
import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { usePageControlStore } from "#/store/use-page-control-store";

type SearchTypeChange = {
  [key in SearchParams["searchType"]]: () => void;
};

interface IProps {
  onSubmit: (searchParams: SearchParams) => void;
}

export const Search: React.FC<IProps> = ({ onSubmit }) => {
  const { page, resetPage } = usePageControlStore();
  const { data } = useGetDepartments();
  const {
    control,
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useFormContext<SearchParams>();

  const searchType = watch("searchType");

  const onChange: SearchTypeChange = {
    hasImages: () => {
      reset({
        hasImages: true,
        searchType: "hasImages",
      });
    },
    departmentId: () => {
      reset({
        searchType: "departmentId",
      });
    },
    artistOrCulture: () => {
      reset({
        searchType: "artistOrCulture",
        artistOrCulture: true,
      });
    },
  };

  return (
    <VStack spacing={5} className="flex w-full px-4">
      <Heading fontSize="2xl" fontWeight="bold" alignSelf={"self-start"}>
        Pesquisar por obras de arte
        <Divider
          borderColor="green.400"
          borderWidth="2px"
          borderRadius="full"
          my="4"
        />
      </Heading>
      {searchType === "departmentId" ? (
        <AutocompleteInput
          dataOptions={data || []}
          placeholder="Digite um departamento..."
          name="departmentId"
          control={control}
          onClickButton={handleSubmit(onSubmit)}
          errors={errors}
        />
      ) : (
        <FormControl isInvalid={!!errors.q}>
          <InputGroup size="lg">
            <Input
              {...register("q")}
              placeholder={
                searchType === "hasImages"
                  ? "Busque por texto..."
                  : "Busque por artista ou cultura..."
              }
            />
            <InputRightElement width="200px">
              <Button
                h="full"
                w="full"
                size="lg"
                borderTopLeftRadius="0"
                borderBottomLeftRadius="0"
                borderLeft="1px"
                borderColor="gray.200"
                onClick={handleSubmit(onSubmit)}
              >
                Pesquisar
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.q?.message as string}</FormErrorMessage>
        </FormControl>
      )}
      <Controller
        control={control}
        name="searchType"
        defaultValue="hasImages"
        render={({ field }) => (
          <RadioGroup
            {...field}
            onChange={(selected) => {
              if (page !== 0) {
                resetPage();
              }
              onChange[selected as SearchParams["searchType"]]();
              field.onChange(selected);
            }}
            alignSelf={"self-start"}
          >
            <Stack direction="row">
              <Radio value="hasImages" colorScheme="green">
                Texto
              </Radio>
              <Radio value="artistOrCulture" colorScheme="green">
                Artista ou Cultura
              </Radio>
              <Radio value="departmentId" colorScheme="green">
                Departamento
              </Radio>
            </Stack>
          </RadioGroup>
        )}
      />
    </VStack>
  );
};
