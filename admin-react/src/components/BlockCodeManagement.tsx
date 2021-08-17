import React, { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { getBlockCodes } from "../helpers/BlockCodeManagementHelper";
import { BlockCode } from "../interfaces/BlockCode";
import { BlockCodeService } from "../services/BlockCodeService";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import BlockCodeEntryForm from "./BlockCodeEntryForm";
import CModal from "./CModal";

const BlockCodeManagement = () => {
  const dispatch = useAppDispatch();
  const blockCodes = useAppSelector((state) => state.app.blockCodes);
  const [blockCodeEntryForm, setBlockCodeEntryForm] = useState(false);
  const [updateBlockCodeData, setUpdateBlockCodeData] =
    useState<null | BlockCode>(null);
  const [filteredBlockCodeHeadings, setFilteredBlockCodeHeadings] = useState<
    string[]
  >([]);
  // const [showModalProp, setShowModalProp] = useState<null | number>(null);

  const deleteBlockCode = async (id: string) => {
    const res = await BlockCodeService.deleteBlockCode(id);
    getBlockCodes(setFilteredBlockCodeHeadings, dispatch);
  };

  const onSubmit = (blockCode: BlockCode) => {
    blockCode._id && deleteBlockCode(blockCode._id);
  };
  useEffect(() => {
    getBlockCodes(setFilteredBlockCodeHeadings, dispatch);
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
              setBlockCodeEntryForm(!blockCodeEntryForm);
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
            {blockCodes.map((blockCode: BlockCode, index: number) => {
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
                  <td className="text-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setUpdateBlockCodeData(
                          !blockCodeEntryForm ? blockCode : null
                        );
                        setBlockCodeEntryForm(!blockCodeEntryForm);
                      }}
                    >
                      update
                    </button>
                  </td>
                  <td>
                    <CModal
                      heading={
                        "Are you sure you want to delete this Block Code?"
                      }
                      triggerButtonContent="delete"
                      triggerButtonVarient="danger"
                      onSubmit={() => {
                        onSubmit(blockCode);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {blockCodeEntryForm && (
          <BlockCodeEntryForm
            updateBlockCodeData={updateBlockCodeData}
            setFilteredBlockCodeHeadings={setFilteredBlockCodeHeadings}
            setBlockCodeEntryForm={setBlockCodeEntryForm}
          />
        )}
      </Container>
      <hr className="mx-5" />
    </>
  );
};

export default BlockCodeManagement;
