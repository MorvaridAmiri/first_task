import React, {useState} from "react";

function Controlledinput() {
    const [controlledinputvalue, setcontrolledinputalue] = useState('');
  
    const handlecontrolledchange = (event) => {
      setcontrolledinputalue(event.target.value);
    };
  
    return (
      <div>
        <h2>controlled comp</h2>
        <input
          type="text"
          value={controlledinputvalue}
          onChange={handlecontrolledchange}
        />
        <p>you type:{controlledinputvalue}</p>
          
      </div>
    );
  }

  export default Controlledinput;
  