import React, { useState } from "react";

const InputBox = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput("");
  };

  return (
    <>
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter Todo here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="add-btn"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default InputBox;
