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
