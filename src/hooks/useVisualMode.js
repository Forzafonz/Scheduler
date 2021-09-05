import {useState} from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {

    if (!replace){
      setMode(mode);
      setHistory(prev => [...prev, mode]);

    } else {
      setMode(mode);
      setHistory(prev => [...prev.splice(0, prev.length - 1), mode])
    }
    
  }

  const back = () => {
    const newHistory = [...history];
    if (history.length > 1) {
      newHistory.splice(newHistory.length - 1)
      setHistory(newHistory)
      setMode(newHistory[newHistory.length - 1])
    }
  }

  return {mode, transition, back}
}