import React, { Dispatch, SetStateAction } from "react";
interface Props {
  setArePaymentsHidden: Dispatch<SetStateAction<boolean>>;
  arePaymentsHidden: boolean;
  setIsGridView: Dispatch<SetStateAction<boolean>>;
  isGridView: boolean;
}
const PaymentSwitches = ({
  setArePaymentsHidden,
  arePaymentsHidden,
  setIsGridView,
  isGridView,
}: Props) => {
  return (
    <div className="d-flex flex-row-reverse m-2">
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onClick={() => {
            setArePaymentsHidden((prevValue) => !prevValue);
          }}
        />
        <label className="form-check-label">
          {arePaymentsHidden ? "View Payments" : "Hide Payments"}
        </label>
      </div>
      {!arePaymentsHidden && (
        <div className="form-check form-switch me-3">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onClick={() => {
              setIsGridView((prevValue) => !prevValue);
            }}
          />
          <label className="form-check-label">
            {isGridView ? "Table View" : "Grid View"}
          </label>
        </div>
      )}
    </div>
  );
};

export default PaymentSwitches;
