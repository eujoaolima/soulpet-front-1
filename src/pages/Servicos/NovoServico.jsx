import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import avatar from "../../assets/icons/avatarServico.png";


export function NovoServico() {
  const [nome, setNome] = useState("");

  function handleNomeChange(event) {
    setNome(event.target.value);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  function onSubmit(data) {
    axios
      .post("http://localhost:3001/servicos", data)
      .then((response) => {
        toast.success("Serviço adicionado.", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/servicos");
      })
      .catch((error) => {
        toast.error("Algo deu errado.", {
          position: "bottom-right",
          duration: 2000,
        });
        console.log(error);
      });
  }
  return (
    <div className="form">
      <div className="container">
        <Button as={Link} to="/servicos" className="btn-brown">
          <i className="bi bi-arrow-bar-left"></i> Voltar
        </Button>
        <div className="container-form">
          <div className="d-flex flex-column align-items-center gap-3">
            <div className="avatar-pet">
              <img src={avatar} alt="SoulPet" />
            </div>
            <h3>{nome ? nome : "Serviço"}</h3>
          </div>
          <div className="form-content">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.nome && "is-invalid"}
                  {...register("nome", {
                    required: "O nome é obrigatório.",
                    maxLength: {
                      value: 130,
                      message: "Limite de 130 caracteres.",
                    },
                  })}
                  onChange={handleNomeChange}
                />
                {errors.nome && (
                  <Form.Text className="invalid-feedback">
                    {errors.nome.message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.preco && "is-invalid"}
                  {...register("preco", {
                    required: "O preço é obrigatório.",
                    maxLength: {
                      value: 255,
                      message: "Limite de 255 caracteres.",
                    },
                  })}
                />
                {errors.preco && (
                  <Form.Text className="invalid-feedback">
                    {errors.preco.message}
                  </Form.Text>
                )}
              </Form.Group>
              <Button className="btn-formPet" type="submit">
                Cadastrar
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
