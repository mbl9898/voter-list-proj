export const dummy = 0;
// import { Dispatch } from "react";
// import * as XLSX from "xlsx";
// import { db } from "../firebase";
// import { VotesModel } from "../interfaces/VotesModel";
// import { setData, setHeadings, setIsListDisplay } from "../store";
// const addVoteHandler = async (vote: any) => {
//   db.ref("votes/").set(vote);
// };
// const addVotes = (data: any) => {
//   addVoteHandler(data);
//   // const dataCopy = newData.map((dataEl: any, i: number) => {
//   //   return {
//   //     "S No": dataEl["S No"],
//   //     "Block Code": dataEl["Block Code"],
//   //     "Constituency Name": dataEl["Constituency Name"],
//   //     Moza: dataEl.Moza,
//   //     Dehya: dataEl.Dehya,
//   //     City: dataEl.City,
//   //     "Patwar Halka": dataEl["Patwar Halka"],
//   //     Tapaydar: dataEl.Tapaydar,
//   //     Tehseel: dataEl.Tehseel,
//   //     Talka: dataEl.Talka,
//   //     District: dataEl.District,
//   //     "Union Council": dataEl["Union Council"],
//   //     "Book No": dataEl["Book No"],
//   //     Constituency: dataEl.Constituency,
//   //     Gender: dataEl.Gender,
//   //     "Vote S No": dataEl["Vote S No"],
//   //     "Family No": dataEl["Family No"],
//   //     Name: dataEl.Name,
//   //     "Marital Status": dataEl["Marital Status"],
//   //     "Father|Husband Name": dataEl["Father|Husband Name"],
//   //     NIC: dataEl.NIC,
//   //     Age: dataEl.Age,
//   //     "House No": dataEl["House No"],
//   //     Street: dataEl.Street,
//   //     Phase: dataEl.Phase,
//   //     Sector: dataEl.Sector,
//   //     Lane: dataEl.Lane,
//   //     "Boulevard|Avenue": dataEl["Boulevard|Avenue"],
//   //     "Other Area": dataEl["Other Area"],
//   //     Count: dataEl.Count
//   //   };
//   // });
//   // dataCopy.forEach((copy: any) => {
//   //   addVoteHandler(copy);
//   // });
// };
// // const fetchDataHandler = useCallback(async () => {
// //   // setIsLoading(true);
// //   // setError(null);
// //   try {
// //     const response = await fetch(
// //       "https://ji-voters-list-cc294-default-rtdb.firebaseio.com/votes.json"
// //     );
// //     if (!response.ok) {
// //       throw new Error("Something went wrong!");
// //     }

// //     const data = await response.json();
// //     console.log(data);

// //     // const transformedMovies = data.results.map((movieData) => {
// //     //   return {
// //     //     id: movieData.episode_id,
// //     //     title: movieData.title,
// //     //     openingText: movieData.opening_crawl,
// //     //     releaseDate: movieData.release_date
// //     //   };
// //     // });
// //     // setMovies(transformedMovies);
// //   } catch (error) {
// //     // setError(error.message);
// //   }
// //   // setIsLoading(false);
// // }, []);

// const createAddress = (d: VotesModel[]) => {
//   if (d) {
//     const actualData = d;
//     actualData.forEach((data, i) => {
//       actualData[i].Address = `
//       ${data["House No"] === "-" ? "" : "House:"}
//       ${data["House No"] === "-" ? "" : data["House No"]}
//       ${data.Street === "-" ? "" : "Street:"}
//       ${data.Street === "-" ? "" : data.Street}
//       ${data.Phase === "-" ? "" : data.Phase}
//       ${data.Sector === "-" ? "" : "Sector:"}
//       ${data.Sector === "-" ? "" : data.Sector}
//       ${data.Lane === "-" ? "" : "Lane:"}
//       ${data.Lane === "-" ? "" : data.Lane}
//       ${data["Boulevard|Avenue"] === "-" ? "" : data["Boulevard|Avenue"]}
//       ${data["Other Area"] === "-" ? "" : data["Other Area"]}
//       ${data.City === "-" ? "" : data.City}`;
//     });

//     // ${data.Phase == "-" ? "" : "Phase:"}
//     // ${data["Boulevard/Avenue"] == "-" ? "" : "Boulevard/Avenue:"}
//     return actualData;
//   }
// };

// const readExcel = (
//   file: Blob,
//   dispatch: Dispatch<{ payload: any; type: string }>
// ) => {
//   const promise = new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.readAsArrayBuffer(file);

//     fileReader.onload = (e) => {
//       if (e.target?.result) {
//         const bufferArray = e.target.result;
//         const wb = XLSX.read(bufferArray, { type: "buffer" });
//         const wsname = wb.SheetNames[0];
//         const ws = wb.Sheets[wsname];
//         const data = XLSX.utils.sheet_to_json(ws);
//         resolve(data);
//       }
//     };

//     fileReader.onerror = (error) => {
//       reject(error);
//     };
//   });

//   promise.then((d: any) => {
//     addVotes(d);
//     const newData = createAddress(d);
//     if (newData) {
//       dispatch(setData(newData));
//       const headings: string[] = Object.keys(newData[0]);
//       console.log(headings);
//       const filteredHeadings = headings.filter((heading) => heading !== "S No");
//       const againFilteredHeadings = filteredHeadings.filter(
//         (heading) => heading !== "Count"
//       );
//       dispatch(setHeadings(againFilteredHeadings));
//       dispatch(setIsListDisplay(true));
//     }
//   });
// };

// export { readExcel };
