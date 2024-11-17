import "./App.css";
import { TicTacToeProvider } from "./contexts/TicTacToeContext";
import { TicTacToePage } from "./pages";

function App() {
  return (
    <TicTacToeProvider>
      <TicTacToePage />
    </TicTacToeProvider>
  );
}

export default App;
