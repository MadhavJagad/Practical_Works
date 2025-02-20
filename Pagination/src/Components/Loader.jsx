import React from "react";

const Loader = () => {
  return (
    <>
      <div
        className="spinner-border p-5"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </>
  );
};

export default Loader;
