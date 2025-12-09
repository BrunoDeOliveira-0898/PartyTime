import React from "react";

import partyFetch from "../axios/config";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import useToast from "../hook/useToast.jsx";

import "./CreateParty.css";

const CreateParty = () => {
  const [services, setServices] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);
  const [image, setImage] = useState("");
  const [partyServices, setPartyServices] = useState([]);

  const navigate = useNavigate();

  //Load services
  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get("/services");
      setServices(res.data);
    };
    loadServices();
  }, []);

  // Add or remove services

  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const filteredServices = services.filter((s) => s._id === value);

    console.log(filteredServices);

    if (checked) {
      setPartyServices((services) => [...services, filteredServices[0]]);
    } else {
      setPartyServices((services) => services.filter((s) => s._id !== value));
    }
    console.log(partyServices);
  };

  //Create a new party

  const createParty = async (e) => {
    e.preventDefault();

    try {
      const party = {
        title,
        author,
        description,
        budget,
        image,
        services: partyServices,
      };

      const res = await partyFetch.post("/parties", party);

      if (res.status === 201) {
        navigate("/");
        useToast(res.data.msg);
      }
    } catch (error) {
      useToast(error.response.data.msg, "error");
    }
  };

  return (
    <div className="form-page">
      <h2>Crie sua própria festa! 🥳🥳🥳</h2>
      <p>
        Defina o seu orçamento - escolha os servicos | PROMOÇÃO BLACK FRIDAY %50
        de Desconto 😮
      </p>

      <form onSubmit={(e) => createParty(e)}>
        <label>
          <span>Nome: </span>
          <input
            type="text"
            placeholder="O que está celebrando?"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Anfitrião 😎: </span>
          <input
            type="text"
            placeholder="Quem está celebrando?"
            required
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </label>
        <label>
          <span>Descrição 📄: </span>
          <textarea
            placeholder="Conte nos mais sobre essa celebração..."
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </label>
        <label>
          <span>Verba 💰: </span>
          <input
            type="number"
            placeholder="Qual sua verba/vaquinha/orçamento?"
            required
            onChange={(e) => setBudget(e.target.value)}
            value={budget}
          />
        </label>
        <label>
          <span>Imagem para referencia 🖼️:</span>
          <input
            type="text"
            placeholder="Insira a imagem por uma URL"
            required
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <div>
          <h2>Marque os serviços que deseja 🛠️</h2>
          <div className="sevices-container">
            {services.length === 0 && <p>Aguarde...</p>}
            {services.length > 0 &&
              services.map((service) => (
                <div className="service" key={service._id}>
                  <img src={service.image} alt={service.name} />
                  <p className="service-name">{service.name}</p>
                  <p className="description">{service.description}</p>
                  <p className="service-price">R${service.price}</p>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      value={service._id}
                      onChange={(e) => handleServices(e)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <input type="submit" value="Criar Festa🥳" className="btn" />
      </form>
    </div>
  );
};

export default CreateParty;
