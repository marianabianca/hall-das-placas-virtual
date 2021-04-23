import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { ButtonTertiary } from "../../components";

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

export default Dialog;
