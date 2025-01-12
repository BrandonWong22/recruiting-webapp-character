import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts'; // i had to edit the import to make it work for me
import { Attributes } from './types';

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

  const meetsClassRequirements = (requirements: Attributes): boolean => {
    const {Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma} = requirements;
    
    if (
      attributes.Strength >= Strength &&
      attributes.Dexterity >= Dexterity &&
      attributes.Constitution >= Constitution &&
      attributes.Intelligence >= Intelligence &&
      attributes.Wisdom >= Wisdom &&
      attributes.Charisma >= Charisma
    ) {
      return true
    }

    return false
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className='attribute-controls' style={{marginBottom: '10px'}}>
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
        <div className='class-list'>
        {Object.entries(CLASS_LIST).map(([className, requirements]) => {
          const meetsRequirements = meetsClassRequirements(requirements)
          return (
            <div key={className}>
              <strong style={{color: meetsRequirements && 'green'}}>{className}</strong>
            </div>
          );
        })}
        </div>
      </section>
    </div>
  );
}

export default App;
