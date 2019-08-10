import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import api from "../../services/api";
import { randomList } from "../../services/helpers";

import Logo from "../../assets/logo.svg";
import Like from "../../assets/like.svg";
import Dislike from "../../assets/dislike.svg";
import ItsAMatchLogo from "../../assets/itsamatch.png";

import "./index.css";

const Main = ({ match }) => {
  const [listDevs, setListDevs] = useState([]);
  const [itsAMatch, setItsAMatch] = useState(null);

  async function handleLike(id) {
    await api.post(`/dev/${id}/like`, null, {
      headers: {
        user: match.params.id
      }
    });

    const filtred = listDevs.filter(dev => dev._id !== id);

    const filteredAndSortedList = randomList(filtred);

    setListDevs(filteredAndSortedList);
  }

  async function handleDislike(id) {
    await api.post(`/dev/${id}/dislike`, null, {
      headers: {
        user: match.params.id
      }
    });

    const filtred = listDevs.filter(dev => dev._id !== id);

    const filteredAndSortedList = randomList(filtred);

    setListDevs(filteredAndSortedList);
  }

  useEffect(() => {
    async function loadUsers() {
      const { data } = await api.get("/devs", {
        headers: {
          user: match.params.id
        }
      });
      setListDevs(data);
    }
    loadUsers();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io("http://localhost:3333", {
      query: {
        user: match.params.id
      }
    });

    socket.on("match", dev => {
      setItsAMatch(dev);
    });
  }, [match.params.id]);

  return (
    <div className="main-container">
      <Link to="/">
        <img src={Logo} alt="Tindev" />
      </Link>
      {listDevs.length > 0 ? (
        <ul>
          {listDevs.map(dev => (
            <li key={dev._id}>
              <img src={dev.avatar} alt={dev.name} />
              <footer>
                <strong>{dev.name}</strong>
                <p>{dev.bio}</p>
              </footer>
              <div className="buttons">
                <button onClick={() => handleDislike(dev._id)} type="button">
                  <img src={Dislike} alt="Button for Dislike" />
                </button>
                <button onClick={() => handleLike(dev._id)} type="button">
                  <img src={Like} alt="Button for Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou! :(</div>
      )}
      {itsAMatch && (
        <div className="match-container">
          <img src={ItsAMatchLogo} alt="It's a Match, congratulations." />
          <img className="avatar" src={itsAMatch.avatar} alt={itsAMatch.name} />
          <strong>{itsAMatch.name}</strong>
          <p>{itsAMatch.bio}</p>
          <button type="button" onClick={() => setItsAMatch(null)}>
            FECHAR
          </button>
        </div>
      )}
    </div>
  );
};

export default Main;
