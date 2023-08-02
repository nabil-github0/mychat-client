import UserContext from "./components/AccountContext";
import ToggleColor from "./components/ToggleColor";
import Views from "./components/Views";

function App() {
  return (
    <UserContext>
    <ToggleColor />
    <Views />
    </UserContext>
  );
}

export default App;
