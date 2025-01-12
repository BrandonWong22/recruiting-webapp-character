import { useEffect, useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts"; // i had to edit the import to make it work for me
import { Attributes } from "./types";
import { getModifier } from "./helperFunctions";

function App() {
  const [attributes, setAttributes] = useState<Attributes>({
    Strength: 0,
    Dexterity: 0,
    Constitution: 0,
    Intelligence: 10,
    Wisdom: 0,
    Charisma: 0,
  });
  const [selectedClass, setSelectedClass] = useState("");
  const [totalSkillPoints, setTotalSkillPoints] = useState(0);
  const [totalSkillPointsSpent, setTotalSkillPointSpent] = useState(0);

  const [skillPoints, setSkillPoints] = useState<Record<string, number>>(
    SKILL_LIST.reduce((accumulator, skill) => {
      accumulator[skill.name] = 0;
      return accumulator;
    }, {} as Record<string, number>)
  );

  const incrementAttribute = (attribute: string) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: prev[attribute] + 1,
    }));
  };

  const decrementAttribute = (attribute: string) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: prev[attribute] - 1,
    }));
  };

  useEffect(() => {
    setTotalSkillPoints(10 + 4 * getModifier(attributes.Intelligence));
  }, [attributes.Intelligence]);

  const meetsClassRequirements = (requirements: Attributes): boolean => {
    const {
      Strength,
      Dexterity,
      Constitution,
      Intelligence,
      Wisdom,
      Charisma,
    } = requirements;

    if (
      attributes.Strength >= Strength &&
      attributes.Dexterity >= Dexterity &&
      attributes.Constitution >= Constitution &&
      attributes.Intelligence >= Intelligence &&
      attributes.Wisdom >= Wisdom &&
      attributes.Charisma >= Charisma
    ) {
      return true;
    }

    return false;
  };

  const incrementSkill = (skill: string) => {
    setTotalSkillPointSpent((prev) => prev + 1);
    setSkillPoints((prev) => ({
      ...prev,
      [skill]: prev[skill] + 1,
    }));
  };

  const decrementSkill = (skill: string) => {
    setTotalSkillPointSpent((prev) => prev - 1);
    setSkillPoints((prev) => ({
      ...prev,
      [skill]: prev[skill] - 1,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className="attribute-controls" style={{ marginBottom: "10px" }}>
          {ATTRIBUTE_LIST.map((attribute) => {
            const value = attributes[attribute as keyof Attributes];
            const modifier = getModifier(value);
            return (
              <div key={attribute}>
                <strong style={{ marginRight: "8px" }}>
                  {attribute}: {attributes[attribute]}{" "}
                  <em>
                    (Modifier: {modifier >= 0 ? `+${modifier}` : modifier})
                  </em>{" "}
                </strong>
                <button onClick={() => incrementAttribute(attribute)}>+</button>
                <button onClick={() => decrementAttribute(attribute)}>-</button>
              </div>
            );
          })}
        </div>
        <div className="class-list" style={{ marginBottom: "10px" }}>
          {Object.entries(CLASS_LIST).map(([className, requirements]) => {
            const meetsRequirements = meetsClassRequirements(requirements);
            return (
              <div key={className}>
                <strong
                  className="class-list-classname"
                  onClick={() => setSelectedClass(className)}
                  style={{ color: meetsRequirements && "green" }}
                >
                  {className}
                </strong>
              </div>
            );
          })}
        </div>
        {selectedClass && (
          <div>
            <h2>{selectedClass} Minimum Requirements</h2>
            <ul>
              {ATTRIBUTE_LIST.map((attribute) => {
                return (
                  <li key={attribute}>
                    <strong>
                      {attribute} {CLASS_LIST[selectedClass][attribute]}
                    </strong>
                  </li>
                );
              })}
            </ul>
            <button
              className="clear-selection-button"
              onClick={() => setSelectedClass("")}
            >
              Clear Selection
            </button>
          </div>
        )}
        <div>
          <h2>Skills</h2>
          <h3>Total skill points available: {totalSkillPoints}</h3>
          <h3>Total skill points spent {totalSkillPointsSpent}</h3>
          <ul className="skills-list">
            {SKILL_LIST.map(
              (skill: { name: string; attributeModifier: string }) => {
                const { name, attributeModifier } = skill;
                const modifier = getModifier(attributes[attributeModifier]);
                // const totalSkillPointsSpent = Object.values(skillPoints).reduce(
                //   (acc, points) => acc + points,
                //   0
                // );
                console.log(totalSkillPointsSpent);
                return (
                  <li key={name} className="skill-item">
                    {name}: {skillPoints[name]} (Modifier: {attributeModifier}:{" "}
                    {modifier})
                    <button
                      onClick={() => incrementSkill(name)}
                      style={{ marginLeft: "10px" }}
                      disabled={totalSkillPointsSpent >= totalSkillPoints}
                    >
                      +
                    </button>
                    <button
                      onClick={() => decrementSkill(name)}
                      style={{ marginLeft: "5px", marginRight: "5px" }}
                    >
                      -
                    </button>
                    total: {skillPoints[name] + modifier}
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;
