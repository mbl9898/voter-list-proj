import React from "react";
import { useDispatch } from "react-redux";
import { readExcel } from "../services/index";

const ChooseFile = () => {
  const dispatch = useDispatch();
  return (
    <div className="input-group mb-3">
      <input
        type="file"
        className="form-control"
        onChange={(e) => {
          if (e.target.files) {
            const file = e.target.files[0];
            readExcel(file, dispatch);
          }
        }}
      />
    </div>
  );
};

export default ChooseFile;
