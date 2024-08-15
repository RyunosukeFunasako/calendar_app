import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";

export const CreateEventModal = ({ isOpen, onClose, createEvent }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const clearEvent = () => {
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>イベントを追加</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold">タイトル</Text>
          <Input
            placeholder="タイトル"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            mb="16px"
          />
          <Text fontWeight="bold">ディスクリプション</Text>
          <Input
            placeholder="ディスクリプション"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            mb="16px"
          />
          <Text fontWeight="bold">予定開始日付</Text>
          <Input
            value={startDate}
            type="date"
            mb="16px"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Text fontWeight="bold">予定終了日付</Text>
          <Input
            value={endDate}
            type="date"
            mb="16px"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={() => {
              createEvent({ title, description, startDate, endDate });
              clearEvent();
              onClose();
            }}
          >
            イベントを追加
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};