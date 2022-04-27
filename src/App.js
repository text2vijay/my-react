import "./App.css";

import ClassEnzymeCounter from "./enzyme/RangeCounterClass";
import ClassRtlCounter from "./rtl/RangeCounterFunctional";

function App() {
  return (
    <div className="App">
      <ClassEnzymeCounter min={0} max={8} />
      <br />
      <br />
      <ClassRtlCounter min={0} max={10}></ClassRtlCounter>
    </div>
  );
}

export default App;
