import React, { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { BlockCode } from "../interfaces/BlockCode";
import { BlockCodeService } from "../services/BlockCodeService";
import BlockCodeEntryForm from "./BlockCodeEntryForm";
import VoteDisplayModal from "./VoteDisplayModal";

const BlockCodeManagement = () => {
  const [createBlockCode, setCreateBlockCode] = useState(false);
  const [showModalProp, setShowModalProp] = useState<null | number>(null);
  const [blockCodes, setBlockCodes] = useState<BlockCode[]>([]);
  const [filteredBlockCodeHeadings, setFilteredBlockCodeHeadings] = useState<
    string[]
  >([]);

  const getBlockCodes = async () => {
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
  const deleteBlockCode = async (id: string) => {
    const res = await BlockCodeService.deleteBlockCode(id);
    console.log(res);
  };
  useEffect(() => {
    getBlockCodes();
  }, []);

  return (
    <>
      <Container
        className="mt-5 align-items-center justify-content-center"
        style={{ minWidth: 1000 + "px !important" }}
      >
        <h4 className="text-center my-1">Block Code Management</h4>
        <div className="d-flex flex-row-reverse m-2">
          <button
            className="btn btn-primary mx-2"
            onClick={() => {
              setCreateBlockCode(!createBlockCode);
            }}
          >
            Create
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              {filteredBlockCodeHeadings.map((heading, index) => (
                <th key={index} scope="col">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {blockCodes.map((blockCode, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td className="text-center">{blockCode.blockCodeNo}</td>
                  <td className="text-center">{blockCode.constituencyName}</td>
                  <td className="text-center">{blockCode.moza}</td>
                  <td className="text-center">{blockCode.dehya}</td>
                  <td className="text-center">{blockCode.city}</td>
                  <td className="text-center">{blockCode.patwarHalka}</td>
                  <td className="text-center">{blockCode.tapaydar}</td>
                  <td className="text-center">{blockCode.tehseel}</td>
                  <td className="text-center">{blockCode.talka}</td>
                  <td className="text-center">{blockCode.district}</td>
                  <td className="text-center">{blockCode.unionCouncil}</td>
                  <td className="text-center">{blockCode.bookNo}</td>
                  <td className="text-center">{blockCode.constituency}</td>
                  <button
                    className="btn btn-danger ms-2 bg-danger"
                    onClick={() => {
                      setShowModalProp(index);
                    }}
                  >
                    delete
                  </button>

                  <div>
                    <VoteDisplayModal
                      heading={"Delete BlockCode"}
                      body={"Are You Sure You Want To Delete This Block Code?"}
                      showModalProp={showModalProp}
                      setShowModalProp={setShowModalProp}
                      index={index}
                      onSubmit={() => {
                        blockCode._id && deleteBlockCode(blockCode._id);
                      }}
                    />
                  </div>
                </tr>
              );
            })}
          </tbody>
        </table>
        {createBlockCode && <BlockCodeEntryForm />}
      </Container>
      <hr className="mx-5" />
    </>
  );
};

export default BlockCodeManagement;
