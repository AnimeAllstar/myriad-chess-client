import { ReactNode, createContext, useContext, useState } from "react";

type GameStateContextType = {
  Ai1: { color: string; model: string };
setAi1: React.Dispatch<React.SetStateAction<{ color: string; model: string }>>;
  Ai2: { color: string; model: string };
  setAi2: React.Dispatch<React.SetStateAction<{ color: string; model: string }>>;
  player: { color: string };
  setPlayer: React.Dispatch<React.SetStateAction<{ color: string }>>;
  gameMode: "ai_vs_ai" | "human_vs_ai";
  setGameMode: React.Dispatch<React.SetStateAction<"ai_vs_ai" | "human_vs_ai">>;
  gameStarted: boolean;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

interface GameStateProviderProps {
  children: ReactNode;
}

const GameStateContext = createContext<GameStateContextType>({
  Ai1: { color: "white", model: "minimax" }, setAi1: () => { },
  Ai2: { color: "black", model: "minimax" }, setAi2: () => { },
  player: { color: "white" }, setPlayer: () => { },
  gameMode: "ai_vs_ai", setGameMode: () => { },
  gameStarted: false, setGameStarted: () => { },
});

export const GameStateProvider: React.FC<GameStateProviderProps> = ({ children }) => {
  const [Ai1, setAi1] = useState({ color: "white", model: "minimax" });
  const [Ai2, setAi2] = useState({ color: "black", model: "minimax" });
  const [player, setPlayer] = useState({ color: "white" });
  const [gameMode, setGameMode] = useState<"ai_vs_ai" | "human_vs_ai">("ai_vs_ai");
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <GameStateContext.Provider
      value={{ Ai1, setAi1, Ai2, setAi2, player, setPlayer, gameMode, setGameMode, gameStarted, setGameStarted }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => useContext(GameStateContext);
