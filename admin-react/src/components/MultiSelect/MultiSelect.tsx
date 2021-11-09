import { useState } from "react";
import Down from "../../assets/icons/down.svg";

import "./multiselect.scss";

interface Props {
  options: any[];
}

const MultiSelect = ({ options }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  let arr: any[] = [];

  const [modifiedOptions, setModifiedOptions] = useState([]);

  const muhammadCallKaro = (selectedField: any, index: number) => {
    console.log(selectedField);
    selectedField.isOpen = true;
    const exist = arr.find((x) => x === selectedField);
    if (exist) {
      arr = arr.filter((_, i) => i !== index);
    } else {
      arr.push(selectedField);
    }
    console.log(arr);
  };

  return (
    <div>
      <div className="input-group mb-3">
        <div className="row w-100">
          <button
            onClick={() => setIsOpen((preVal) => !preVal)}
            type="button"
            className=" w-100 btn btn-primary"
          >
            {`Hello World : )`}
            <img className="logo" src={Down} alt="hello world" />
          </button>
        </div>

        <div className="bg-secondary w-100">
          {isOpen &&
            modifiedOptions.map((x, i) => (
              <option
                key={i}
                onClick={() => muhammadCallKaro(x, i)}
                className="optionel"
              >
                {x}
              </option>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
