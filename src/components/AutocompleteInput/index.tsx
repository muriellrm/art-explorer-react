import type { SelectOption } from "#/utils/interface";
import {
  Box,
  Input,
  List,
  ListItem,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import { useState, useRef, useMemo } from "react";

interface AutocompleteInput {
  dataOptions: SelectOption[];
  placeholder?: string;
  onSelect: (value: string) => void;
}

export const AutocompleteInput: React.FC<AutocompleteInput> = ({
  dataOptions,
  placeholder = "Digite algo...",
  onSelect,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const filteredDataOptions = useMemo(
    () =>
      dataOptions.filter((s) =>
        s.label.toLowerCase().includes(inputValue.toLowerCase())
      ),
    [dataOptions, inputValue]
  );
  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: () => setShowOptions(false),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(e.target.value);
    setShowOptions(value.trim() !== "");
  };

  const handleSelect = (item: SelectOption) => {
    setInputValue(item.label);
    setShowOptions(false);
    onSelect(item?.value?.toString());
  };

  return (
    <Box width="100%" ref={ref} display={"flex"} position="relative">
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        mx={4}
        height={"50px"}
      />
      {showOptions && filteredDataOptions.length > 0 && (
        <List
          position="absolute"
          mx={4}
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
    </Box>
  );
};
