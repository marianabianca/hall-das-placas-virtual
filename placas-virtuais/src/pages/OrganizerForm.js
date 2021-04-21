import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import {
  BreadCrumbs,
  ButtonPrimary,
  ButtonSecondary,
  ButtonTertiary,
} from "../components";
import { Link } from "react-router-dom";
import { IconClose } from "../icons";

const Dialog = ({ isOpen, cancelRef, onClose, onConfirm, time }) => (
  <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Atenção!
        </AlertDialogHeader>

        <AlertDialogBody>
          Você tem certeza que deseja <b>atualizar</b> os dados da placa da
          turma de <b>{time}</b>?
        </AlertDialogBody>

        <AlertDialogFooter>
          <ButtonTertiary ref={cancelRef} onClick={onClose}>
            Cancelar
          </ButtonTertiary>
          <Button colorScheme="red" onClick={onConfirm} ml={3}>
            Atualizar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
);

const CloseButton = ({ onClick }) => (
  <IconButton
    variant="ghost"
    color="red.500"
    colorScheme="red"
    icon={<IconClose size="1.25rem" />}
    mr="1rem"
    onClick={onClick}
  />
);

const OrganizerForm = () => {
  const toast = useToast();
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef();
  const onConfirm = () => {
    setIsOpen(false);
    toast({
      title: "Sucesso",
      description: "Dados da turma foram salvos!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
  const [fields, setFields] = React.useState([]);
  let hiddenInput = null;

  return (
    <>
      <BreadCrumbs
        pages={[
          { title: "Página inicial", to: "/", isCurrentPage: false },
          { title: "Seus dados", to: "/estudante", isCurrentPage: true },
        ]}
      />
      <Flex align="center" justify="center" direction="column">
        <Flex align="start" direction="column" mt="1.25rem">
          <Flex justify="space-between" align="center" width="50vw">
            <Text fontSize="5xl">Seus dados</Text>
            {/* TODO remover token */}
            <Link to="/">
              <ButtonTertiary>Sair</ButtonTertiary>
            </Link>
          </Flex>
          <Flex justify="center" align="center" direction="column">
            <Box
              borderRadius="0.5rem"
              border="1px"
              borderColor="gray.300"
              bg="white"
              p="2.5rem"
              minW="50vw"
            >
              <FormControl id="time" isRequired>
                <FormLabel>Período da turma</FormLabel>
                <Input placeholder="Digite no formato AAAA.P ex.: 2019.1" />
              </FormControl>
              {/* TODO VALIDAÇÃO */}
              <FormControl id="name" isRequired mt="0.75rem">
                <FormLabel>Nome da turma</FormLabel>
                <Input placeholder="Digite o nome da turma" />
              </FormControl>
              <FormControl id="name" isRequired mt="0.75rem">
                <FormLabel>Foto da turma completa</FormLabel>
                <ButtonSecondary onClick={() => hiddenInput.click()}>
                  Escolher arquivo
                </ButtonSecondary>
                <input
                  hidden
                  type="file"
                  ref={(el) => (hiddenInput = el)}
                  onChange={() => console.log("foi")}
                />
                {/* TODO mostrar nome do arquivo */}
              </FormControl>
              {fields.map((field, i) => (
                <Flex justify="center" align="center">
                  <CloseButton
                    onClick={() =>
                      setFields(fields.filter((_, index) => index !== i))
                    }
                  />
                  <FormControl id={`title-${i}`} mt="1rem">
                    <Select placeholder="Selecione o tipo de seção">
                      <option value="option1">Texto com título</option>
                      <option value="option2">Lista de nomes com título</option>
                    </Select>
                    <Input
                      placeholder="Digite o título da sessão"
                      value={field === "" ? undefined : field}
                      my="1rem"
                    />
                    <Textarea placeholder="Digite o texto da seção" />
                  </FormControl>
                </Flex>
              ))}
              <Flex direction="column">
                <ButtonSecondary
                  onClick={() => setFields([...fields, ""])}
                  mt="1rem"
                >
                  Adicionar nova sessão
                </ButtonSecondary>
              </Flex>
            </Box>
            <ButtonPrimary
              mt="1.25rem"
              mb="1.25rem"
              onClick={() => setIsOpen(true)}
            >
              Salvar
            </ButtonPrimary>

            <Dialog
              cancelRef={cancelRef}
              onClose={() => setIsOpen(false)}
              isOpen={isOpen}
              onConfirm={onConfirm}
              time="2021.1"
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default OrganizerForm;
