import type { SelectOption } from "#/utils/interface";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import { useController, type Control, type FieldErrors } from "react-hook-form";

interface AutocompleteInput {
  name: string;
  control: Control<any>;
  dataOptions: SelectOption[];
  placeholder?: string;
  onClickButton?: () => void;
  errors?: FieldErrors;
}

export const AutocompleteInput: React.FC<AutocompleteInput> = ({
  name,
  control,
  dataOptions,
  placeholder = "Digite algo...",
  onClickButton,
  errors,
}) => {
  const { field } = useController({ name, control });
  const [showOptions, setShowOptions] = useState(false);
  const [inputValueLabel, setInputValueLabel] = useState("");

  const filteredDataOptions = useMemo(() => {
    return dataOptions.filter((s) =>
      s.label.toLowerCase().includes(inputValueLabel?.toLowerCase?.() || "")
    );
  }, [dataOptions, inputValueLabel]);

  const ref = useRef(null);
  useOutsideClick({
    ref,
    handler: () => setShowOptions(false),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValueLabel(value);
    setShowOptions(value.trim() !== "");
  };

  const handleSelect = (item: SelectOption) => {
    setInputValueLabel(item.label);
    field.onChange(item.value);
    setShowOptions(false);
  };

  return (
    <FormControl
      isInvalid={!!errors?.[name]}
      w={"100%"}
      position={"relative"}
      ref={ref}
    >
      <InputGroup size="lg">
        <Input
          placeholder={placeholder}
          value={inputValueLabel}
          onChange={handleChange}
          onFocus={() => setShowOptions(true)}
          bg="white"
          borderColor="gray.200"
          transition="background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease"
          _dark={{
            borderColor: "gray.900",
            bg: "gray.500",
            color: "white",
            _placeholder: { color: "gray.900" },
          }}
        />
        <InputRightElement width="200px">
          <Button
            h="full"
            w={"full"}
            size="lg"
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            borderLeft={"1px"}
            borderColor={"gray.200"}
            onClick={onClickButton}
            transition="background-color 0.3s ease, border-color 0.3s ease"
            _dark={{
              borderColor: "gray.900",
              bg: "gray.600",
              _hover: { bg: "gray.900" },
              color: "white",
            }}
          >
            Pesquisar
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{errors?.[name]?.message as string}</FormErrorMessage>

      {showOptions && filteredDataOptions.length > 0 && (
        <List
          position="absolute"
          mt={1}
          top="100%"
          left={0}
          right={0}
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          maxH="200px"
          overflowY="auto"
          zIndex="dropdown"
          _dark={{
            bg: "gray.700",
            borderColor: "gray.600",
          }}
        >
          {filteredDataOptions.map((option) => (
            <ListItem
              key={option.value}
              px={4}
              py={2}
              _hover={{ bg: "gray.100", cursor: "pointer" }}
              _dark={{ _hover: { bg: "gray.600", cursor: "pointer" } }}
              onClick={() => handleSelect(option)}
            >
              <Text color="black" _dark={{ color: "white" }}>
                {option.label}
              </Text>
            </ListItem>
          ))}
        </List>
      )}
    </FormControl>
  );
};
