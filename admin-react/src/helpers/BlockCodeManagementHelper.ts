import { Dispatch, SetStateAction } from "react";
import { BlockCode } from "../interfaces/BlockCode";
import { BlockCodeService } from "../services/BlockCodeService";

export const getBlockCodes = async (
  setFilteredBlockCodeHeadings: Dispatch<SetStateAction<string[]>>,
  setBlockCodes: Dispatch<SetStateAction<BlockCode[]>>
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
    setFilteredBlockCodeHeadings(sentenceCaseHeadings);
    setBlockCodes(res);
  }
};
