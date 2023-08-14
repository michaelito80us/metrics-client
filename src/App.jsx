import { useState } from "react";
import Home from "./components/Home";
import Body from "./components/Body";

function App() {
  const [start, setStart] = useState(false);
  return (
    <div className="bg-bgpri font-poppins">
      {start ? <Body /> : <Home setStart={setStart} />}
    </div>
  );
}

export default App;
