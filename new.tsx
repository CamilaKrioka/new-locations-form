import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { postLocations } from "../../fetcher";
import ModalForm from "./modalFormNew";

const newLocationsPage: React.FC = () => {
  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const router = useRouter();

  const formValid = name && lat && lng;

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLatChange = (event) => {
    setLat(event.target.value);
  };

  const handleLngChange = (event) => {
    setLng(event.target.value);
  };

  const handleClick = async () => {
    const data = {
      name: name,
      geoLocation: {
        lat: lat,
        lng: lng,
      },
    };
    const response = await postLocations(data);
    if (response.status == 200) {
      setIsOpen(true);
    } else {
      setShowErrors(true);
    }
  };

  const onCloseModal = () => {
    setIsOpen(false);
    router.push("/locations");
  };

  return (
    <>
      <Heading as="h4" size="md" mb="6" textAlign="center">
        Carga de locaciones
      </Heading>
      <Flex align="center" justify="center">
        <Box
          padding="4"
          maxW="3xl"
          borderWidth="2px"
          borderRadius="lg"
          overflow="hidden"
        >
          <FormControl>
            <FormLabel>Nombre de locacion</FormLabel>
            <Input
              mb="2"
              type="number"
              color="black"
              required
              value={name}
              onChange={handleNameChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Latitud</FormLabel>
            <Input
              mb="2"
              type="number"
              color="black"
              required
              value={lat}
              onChange={handleLatChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Longitud</FormLabel>
            <Input
              mb="2"
              type="number"
              color="black"
              required
              value={lng}
              onChange={handleLngChange}
            />
          </FormControl>
          {showErrors ? <p>Se produjo un error</p> : null}

          <ButtonGroup d="flex" justifyContent="flex-end" spacing="5">
            <Button
              mt="5"
              ml="5"
              type="button"
              colorScheme="red"
              onClick={() => router.push("/locations")}
            >
              Cancelar
            </Button>
            <Button
              mt="5"
              type="button"
              colorScheme="blue"
              disabled={!formValid}
              onClick={handleClick}
            >
              Guardar
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>

      <ModalForm isOpen={isOpen} onClose={onCloseModal} />
    </>
  );
};
export default newLocationsPage;
