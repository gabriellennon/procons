"use client"
import { useState } from "react";

export function OldCode() {
  const [title, setTitle] = useState("");
  const [pros, setPros] = useState([]);
  const [cons, setCons] = useState([]);
  const [input, setInput] = useState("");
  const [type, setType] = useState("pro");

  const addItem = () => {
    if (!input.trim()) return;
    if (type === "pro") {
      setPros([...pros, input]);
    } else {
      setCons([...cons, input]);
    }
    setInput("");
  };

  const prosPercentage = (pros.length / (pros.length + cons.length)) * 100 || 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 p-6">
      <h1 className="text-3xl font-bold mb-4">Lista de Prós e Contras</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded w-64 mb-4"
        placeholder="Digite o título da lista."
      />
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 border rounded w-64"
          placeholder="Digite um item"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="pro">Pró</option>
          <option value="con">Contra</option>
        </select>
        <button onClick={addItem} className="p-2 bg-blue-500 text-white rounded">Adicionar</button>
      </div>
      <div className="flex w-full max-w-3xl border-t border-gray-300 mt-4">
        <div className="w-1/2 p-4 bg-green-100">
          <h2 className="text-xl font-semibold mb-2">Prós</h2>
          <ul>
            {pros.map((pro, index) => (
              <li key={index} className="p-1 border-b">{pro}</li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 p-4 bg-red-100 border-l border-gray-300">
          <h2 className="text-xl font-semibold mb-2">Contras</h2>
          <ul>
            {cons.map((con, index) => (
              <li key={index} className="p-1 border-b">{con}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-lg font-bold">Prós: {pros.length} | Contras: {cons.length}</p>
        <p className="mt-2">Decisão recomendada: {prosPercentage > 50 ? "Seguir em frente!" : "Repensar a decisão!"}</p>
      </div>
    </div>
  );
}
