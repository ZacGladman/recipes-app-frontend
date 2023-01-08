import { Route, Routes } from "react-router-dom";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/meal-search" element={<MealSearch />}></Route>
    </Routes>
  );
}

export default App;
