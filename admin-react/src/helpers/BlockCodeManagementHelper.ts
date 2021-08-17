import { Dispatch, SetStateAction } from "react";
import { BlockCode } from "../interfaces/BlockCode";
import { BlockCodeService } from "../services/BlockCodeService";
import { setBlockCodes, setFilteredBlockCodeHeadings } from "../store";

export const blockCodeFormInitial: BlockCode = {
  blockCodeNo: null,
  constituencyName: "",
  moza: "",
  dehya: "",
  city: "",
  patwarHalka: "",
  tapaydar: "",
  tehseel: "",
  talka: "",
  district: "",
  unionCouncil: "",
  bookNo: "",
  constituency: "",
};

export const getBlockCodes = async (
  // setFilteredBlockCodeHeadings: Dispatch<SetStateAction<string[]>>,
  dispatch: any
) => {
  const res = await BlockCodeService.getBlockCodes();
  if (res) {
    let resHeadings = Object.keys(res[0]);
    let sentenceCaseHeadings: string[] = [];
    resHeadings.unshift("Sr");
    resHeadings = resHeadings.filter(
      (heading: string) =>
        heading !== "status" &&
        heading !== "_id" &&
        heading !== "enteredBy" &&
        heading !== "createdAt" &&
        heading !== "__v"
    );
    resHeadings.forEach((heading) => {
      const result = heading.replace(/([A-Z])/g, " $1");
      sentenceCaseHeadings.push(
        result.charAt(0).toUpperCase() + result.slice(1)
      );
    });
    dispatch(setFilteredBlockCodeHeadings(sentenceCaseHeadings));
    dispatch(setBlockCodes(res));
  }
};
