import { headingsArr, grid } from "../components/DataGrid";
import { Column, FilterSettingsModel } from "@syncfusion/ej2-react-grids";
import { dataArr } from "../App";
// const heading = [
//   "S No",
//   "Block Code",
//   "Constituency Name",
//   "Moza",
//   "Dehya",
//   "City",
//   "Patwar Halka",
//   "Tapaydar",
//   "Tehseel",
//   "Talka",
//   "District",
//   "Union Council",
//   "Book No",
//   "Constituency",
//   "Gender",
//   "Vote S No",
//   "Family No",
//   "Name",
//   "Marital Status",
//   "Father|Husband Name",
//   "NIC",
//   "Age",
//   "House No",
//   "Street",
//   "Phase",
//   "Sector",
//   "Lane",
//   "Boulevard|Avenue",
//   "Other Area",
//   "Count",
//   "Address"
// ];

const columnsHiddenWhilePrinting = [
  "Constituency Name",
  "Moza",
  "Dehya",
  "City",
  "Patwar Halka",
  "Tapaydar",
  "Tehseel",
  "Talka",
  "District",
  "Union Council",
  "Book No",
  "Constituency",
  "Gender",
  "Marital Status",
  "House No",
  "Street",
  "Phase",
  "Sector",
  "Lane",
  "Boulevard|Avenue",
  "Other Area",
  "Count"
];

const onActionBegin = (args: any) => {
  // Check if request type is filterchoicerequest
  if (args.requestType === "filterchoicerequest") {
    // Modify the filter choice count value
    args.filterChoiceCount = dataArr.length;
  }
};

const filterSettings: FilterSettingsModel = {
  ignoreAccent: true,
  type: "Excel"
};

const toolbarClick = (): void => {
  if (grid) {
    const cols: Column[] = grid.getColumns();
    for (const col of cols) {
      // if (col.field === "Address") {
      //   col.visible = true;
      // }
      columnsHiddenWhilePrinting.forEach((column) => {
        if (col.field === column) {
          col.visible = false;
        }
      });
    }
  }
};

const printComplete = (): void => {
  if (grid) {
    const cols: Column[] = grid.getColumns();
    for (const col of cols) {
      columnsHiddenWhilePrinting.forEach((column) => {
        if (col.field === column) {
          col.visible = true;
        }
      });
      // if (col.field === "Address") {
      //   col.visible = true;
      // }
      if (col.field === "Count") {
        col.visible = false;
      }
    }
  }
};

const dataBound = () => {
  if (grid) {
    grid.autoFitColumns([...headingsArr]);
  }
};

const getUniqueData = (options: any, unFilteredData: any) => {
  const filteredData: any = grid?.getFilteredRecords();
  let uniqueBlockcodes: any[] = [];
  console.log(
    filteredData !== undefined ? filteredData : "filtered is undefined"
  );
  // console.log(
  //   filteredData.length >= 1 ?  : 
  // )
  // console.log(filteredData !== [] : "filtered is ");
  console.log(filteredData, "FilteredData");
  if (filteredData !== undefined && filteredData !== []) {
    console.log("infiltered data");
    uniqueBlockcodes = filteredData
      .map((item: any) => item["Block Code"])
      .filter(
        (value: any, index: any, self: any) => self.indexOf(value) === index
      )
      .sort((a: any, b: any) => a - b);
    if (options.uniqueBlockcodes === true) {
      return uniqueBlockcodes;
    }
  } else {
    if (typeof unFilteredData !== "undefined") {
      console.log("inUnfilteredData");
      uniqueBlockcodes = unFilteredData
        .map((item: any) => item["Block Code"])
        .filter(
          (value: any, index: any, self: any) => self.indexOf(value) === index
        )
        .sort((a: any, b: any) => a - b);
      if (options.uniqueBlockcodes === true) {
        return uniqueBlockcodes;
      }
    }
  }
  // }
};

export {
  dataBound,
  printComplete,
  toolbarClick,
  getUniqueData,
  filterSettings,
  onActionBegin
};
