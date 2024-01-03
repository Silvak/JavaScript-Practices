import { useEffect, useState } from "react";
import "./App.css";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/:text?fontSize=:size&fontColor=:color`;
const CAT_PREFIX_IMAGE_URL = `https://cataas.com`;

export function App() {
  const [fact, setFact] = useState();
  const [word, setWord] = useState();
  const [factError, setFactError] = useState();

  // recuperar la cita al cargar la pagina
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((response) => {
        // si hay un error con la respuesta
        if (!response.ok) throw new Error("Error fetching fact");
        return response.json();
      })
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      })
      .catch((err) => {
        // tanto si hay un error con la respuesta
        // como si hay un error con la petición
        console.log(err);
      });
  }, []);

  // recuperar el texto de imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return;
    let firstWord = fact.split(" ", 3).join(" ");
    setWord(firstWord);
  }, [fact]);

  return (
    <main>
      <h1>App gatos</h1>
      {fact && <p>{fact}</p>}
      {word && (
        <img
          src={`https://cataas.com/cat/says/${word}?fontSize=50&fontColor=red`}
          alt={`Image extracted using the first three words for ${fact}`}
        />
      )}
    </main>
  );
}

/*
import { useEffect, useState } from "react";

export function App() {
  const [sentence, setSentence] = useState("");
  const [word, setWord] = useState("");

  const getFact = () => {
    fetch("https://catfact.ninja/fact")
      .then((response) => response.json())
      .then((cat) => setSentence(cat.fact))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setWord(sentence.split(" ")[1] || "");
  }, [sentence]);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem 8rem",
        gap: "1rem",
      }}
    >
      <h1>App gatos</h1>
      <button onClick={() => getFact()}>Get new fact</button>
      <p>{sentence}</p>

      {word != "" && (
        <img
          src={`https://cataas.com/cat/says/${word}`}
          width={600}
          alt={word}
        />
      )}
    </main>
  );
}

*/
