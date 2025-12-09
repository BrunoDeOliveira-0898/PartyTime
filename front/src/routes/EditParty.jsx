import partyFetch from "../axios/config";

import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import useToast from "../hook/useToast.jsx";

import "./CreateParty.css";

const EditParty = () => {
  const { id } = useParams();

  const [party, setParty] = useState(null);

  const [services, setServices] = useState([]);

  const navigate = useNavigate();

  //Load services
  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get("/services");
      setServices(res.data);
      loadParty();
    };
    const loadParty = async () => {
      const res = await partyFetch.get(`/parties/${id}`);
      setParty(res.data);
    };

    loadServices();
  }, []);

  // Add or remove services

  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const filteredServices = services.filter((s) => s._id === value);

    let partyServices = party.services;

    if (checked) {
      partyServices = [...partyServices, filteredServices[0]];
    } else {
      partyServices = partyServices.filter((s) => s._id !== value);
    }
    setParty({ ...party, services: partyServices });
  };

  const updateParty = async (e) => {
    e.preventDefault();
    try {
      const res = await partyFetch.put(`/parties/${party._id}`, party);
      if (res.status === 200) {
        navigate(`/party/${id}`);
      }
    } catch (err) {
      useToast(err.response.data.msg, "error");
    }
  };

  if (!party) return <p>Carregando...</p>;
  return (
    <div className="form-page">
      <h2>Editando: {party.title}</h2>
      <p>Mudou de ideia? Sem problemas! Edite a seu gosto!</p>
      <form onSubmit={(e) => updateParty(e)}>
        <label>
          <span>Nome: </span>
          <input
            type="text"
            placeholder="O que está celebrando?"
            required
            onChange={(e) => setParty({ ...party, title: e.target.value })}
            value={party.title}
          />
        </label>
        <label>
          <span>Anfitrião 😎: </span>
          <input
            type="text"
            placeholder="Quem está celebrando?"
            required
            onChange={(e) => setParty({ ...party, author: e.target.value })}
            value={party.author}
          />
        </label>
        <label>
          <span>Descrição 📄: </span>
          <textarea
            placeholder="Conte nos mais sobre essa celebração..."
            required
            onChange={(e) =>
              setParty({ ...party, description: e.target.value })
            }
            value={party.description}
          ></textarea>
        </label>
        <label>
          <span>Verba 💰: </span>
          <input
            type="number"
            placeholder="Qual sua verba/vaquinha/orçamento?"
            required
            onChange={(e) => setParty({ ...party, budget: e.target.value })}
            value={party.budget}
          />
        </label>
        <label>
          <span>Imagem para referencia 🖼️:</span>
          <input
            type="text"
            placeholder="Insira a imagem por uma URL"
            required
            onChange={(e) => setParty({ ...party, image: e.target.value })}
            value={party.image}
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
                      checked={
                        party.services.find(
                          (partyService) => partyService._id === service._id
                        ) || ""
                      }
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <input type="submit" value="Atualizar🥳" className="btn" />
      </form>
    </div>
  );
};

export default EditParty;
