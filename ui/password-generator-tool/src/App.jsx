import { useState, useEffect } from 'react';
import Generate from './components/Generate';
import Header from './components/Header';
import Description from './components/Description';
import Social from './components/Social';

const DARK_MODE_KEY = 'rpg-dark-mode';

function App() {

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem(DARK_MODE_KEY);
    return stored !== null ? stored === 'true' : false;
  });

  useEffect(() => {
    localStorage.setItem(DARK_MODE_KEY, darkMode);
  }, [darkMode]);

  function handleOnClick(){
    setDarkMode(!darkMode);
  }

  return (
    <>
      <div
      className=
      {
        (darkMode == false) ? "bg-slate-950 text-gray-300 min-h-screen" : "text-gray-800 bg-gray-200 min-h-screen"
      }
      >
        <Header handleOnClick={handleOnClick} darkMode={darkMode} />
        <Description darkMode={darkMode} />
        <Generate darkMode={darkMode} />
        <Social/>
      </div>
    </>
  )
}

export default App;