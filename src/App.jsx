import React from "react";
import controlledinput from "./Components/controlled";
import UncontrolledInput from "./Components/uncontrolled";
import Controlledinput from "./Components/controlled";

function App(){
  return(
    <div style={{padding: '40px'}}>
      <Controlledinput />
      <UncontrolledInput />
    </div>
  );
}

export default App;
