import React, { useRef } from "react";

function UncontrolledInput() {
  const inputRef = useRef();

  const handleUncontrolledChange = (event) => {
    event.preventDefault();
    alert(inputRef.current.value);
  };

  return (
    <div>
      <h2>Uncontrolled Comp</h2>
      <form onSubmit={handleUncontrolledChange}>
        <input
          type="text"
          ref={inputRef}
        />
        <button type='submit'>submit</button>
      </form>
      
    </div>
  );
}

export default UncontrolledInput;
