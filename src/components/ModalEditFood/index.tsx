import { Component, createRef, useState, FormEvent } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import { useEffect } from "react";

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

interface ModalEditFoodProps {
  isOpen: boolean;
  handleUpdateFood: (food: Food) => void;
  setIsOpen: () => void;
  editingFood: Food;
}

function ModalEditFood({
  isOpen,
  handleUpdateFood,
  setIsOpen,
  editingFood,
}: ModalEditFoodProps) {
  /*
  constructor(props) {
    super(props);

    this.formRef = createRef()
  }*/
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  console.log(editingFood);

  //iniciar os campos
  useEffect(() => {
    setImage(editingFood.image);
    setName(editingFood.name);
    setPrice(editingFood.price);
    setDescription(editingFood.description);
  }, []);

  async function handleSubmit(event: FormEvent) {
    const newFood = {
      id: Math.random(),
      image,
      name,
      price,
      description,
      available: true,
    };
    handleUpdateFood(newFood);
    setIsOpen();
  }
  /*
  async function handleSubmit() {
    const { setIsOpen, handleUpdateFood } = this.props;

    handleUpdateFood(data);
    setIsOpen();
  }*/

  //const { isOpen, setIsOpen, editingFood } = this.props;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit}>
        <h1>Editar Prato</h1>
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
          name="price"
          placeholder="Ex: 19.90"
          value={price}
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

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalEditFood;
