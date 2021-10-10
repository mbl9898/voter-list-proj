import { Dispatch, SetStateAction } from "react";
import { BlockCode } from "../interfaces/BlockCode";
import { BlockCodeService } from "../services/BlockCodeService";
import { setBlockCodes, setFilteredBlockCodeHeadings } from "../store";

export const blockCodeFormInitial: BlockCode = {
  blockCode: null,
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
  dispatch: any,
  setLoading?: Dispatch<SetStateAction<boolean>>,
  setIsBlockCodeData?: Dispatch<SetStateAction<boolean>>
) => {
  const res = await BlockCodeService.getBlockCodes();
  if (res[0]) {
    let resHeadings = res[0] && Object.keys(res[0]);
    let sentenceCaseHeadings: string[] = [];
    if (resHeadings) {
      resHeadings.unshift("Sr");
      resHeadings = resHeadings.filter(
        (heading: string) =>
          heading !== "status" &&
          heading !== "_id" &&
          heading !== "enteredBy" &&
          heading !== "createdAt" &&
          heading !== "__v"
      );
      // resHeadings.push("Update");
      // resHeadings.push("Delete");
      resHeadings.forEach((heading: string) => {
        const result = heading.replace(/([A-Z])/g, " $1");
        sentenceCaseHeadings.push(
          result.charAt(0).toUpperCase() + result.slice(1)
        );
      });
      dispatch(setFilteredBlockCodeHeadings(sentenceCaseHeadings));
      dispatch(setBlockCodes(res));
      setFilteredBlockCodeHeadings(false);
      setLoading && setLoading(false);
    }
  } else {
    setIsBlockCodeData && setIsBlockCodeData(false);
  }
};
