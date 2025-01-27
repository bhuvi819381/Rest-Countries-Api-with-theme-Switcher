import { useState } from "react";
import { FaAngleUp } from "react-icons/fa";

const Filter = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div>
      <label htmlFor="options" onClick={toggleOptions} style={{ cursor: "pointer" }}>
        Filter by Region{" "}
        <span>
          <FaAngleUp />
        </span>
      </label>
      <select
        id="options"
        name="options"
        onFocus={() => setShowOptions(true)}
        onBlur={() => setShowOptions(false)}
      >
        {!showOptions ? null : <option value="option1">Option 1</option>}
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
};

export default Filter;
