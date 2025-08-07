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
        >
          {filteredDataOptions.map((option) => (
            <ListItem
              key={option.value}
              px={4}
              py={2}
              _hover={{ bg: "gray.100", cursor: "pointer" }}
              onClick={() => handleSelect(option)}
            >
              <Text>{option.label}</Text>
            </ListItem>
          ))}
        </List>
      )}
    </FormControl>
  );
};
