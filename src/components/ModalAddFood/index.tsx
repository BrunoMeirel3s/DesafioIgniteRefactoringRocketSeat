import { Component, createRef, FormEvent, useState, useEffect } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Food) => void;
}

function ModalAddFood({ isOpen, setIsOpen, handleAddFood }: ModalAddFoodProps) {
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  async function handleSubmit(event: FormEvent) {
    const newFood = {
      id: Math.random(),
      image,
      name,
      price,
      description,
      available: true,
    };
    handleAddFood(newFood);
    setIsOpen();

    setImage("");
    setName("");
    setPrice(0);
    setDescription("");
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input
          name="image"
          placeholder="Cole o link aqui"
          value={image}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setImage(event.currentTarget.value)
          }
        />
        <Input
          name="name"
          placeholder="Ex: Moda Italiana"
          value={name}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setName(event.currentTarget.value)
          }
        />
        <Input
          type="number"
          name="price"
          placeholder="Ex: 19.90"
          value={price == 0 ? "" : price}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setPrice(Number(event.currentTarget.value))
          }
        />
        <Input
          name="description"
          placeholder="Descrição"
          value={description}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setDescription(event.currentTarget.value)
          }
        />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalAddFood;
