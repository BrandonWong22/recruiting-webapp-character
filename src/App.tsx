import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts'; // i had to edit the import to make it work for me

function App() {
  const [attributes, setAttributes] = useState({
    Strength: 0,
    Dexterity: 0,
    Constitution: 0,
    Intelligence: 0,
    Wisdom: 0,
    Charisma: 0,
  });

  const incrementAttribute = (attribute: string) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: prev[attribute] + 1
    }));
  }

  const decrementAttribute = (attribute: string) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: prev[attribute] - 1
    }));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className='attribute-controls'>
          {ATTRIBUTE_LIST.map((attribute) => {
            return (
              <div key={attribute}>
                <strong style={{marginRight: "8px"}}>{attribute}: {attributes[attribute]}</strong>
                <button onClick={() => incrementAttribute(attribute)}>+</button>
                <button onClick={() => decrementAttribute(attribute)}>-</button>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
