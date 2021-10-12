import { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { getBlockCodes } from "../../helpers/BlockCodeManagementHelper";
import { BlockCode } from "../../interfaces/BlockCode";
import { BlockCodeService } from "../../services/BlockCodeService";
import { setMessage, setMessageVariant, StoreState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CModal from "../CModal";
import Loading from "../Loading";
import BlockCodeEntryForm from "./BlockCodeEntryForm";

const BlockCodeManagement = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [isBlockCodeData, setIsBlockCodeData] = useState<boolean>(true);
  const blockCodes = useAppSelector(
    (state: StoreState) => state.app.blockCodes
  );
  const [blockCodeEntryForm, setBlockCodeEntryForm] = useState(false);
  const [updateBlockCodeData, setUpdateBlockCodeData] =
    useState<null | BlockCode>(null);
  const filteredBlockCodeHeadings = useAppSelector(
    (state: StoreState) => state.app.filteredBlockCodeHeadings
  );

  const deleteBlockCode = async (id: string) => {
    setLoading(true);
    const res = await BlockCodeService.deleteBlockCode(id);
    console.log(res);
    if (res === "This record has been deleted successfully") {
      dispatch(setMessageVariant("success"));
      dispatch(setMessage("BlockCode Deleted Successfully"));
    }
    getBlockCodes(dispatch, setLoading, setIsBlockCodeData);
  };

  const onSubmit = (blockCode: BlockCode) => {
    blockCode._id && deleteBlockCode(blockCode._id);
  };
  useEffect(() => {
    getBlockCodes(dispatch, setLoading, setIsBlockCodeData);
  }, []);

  return (
    <>
      <Container
        className="mt-5 align-items-center justify-content-center"
        style={{ minWidth: 1500 + "px !important" }}
      >
        <h4 className="text-center my-1">Block Code Management</h4>
        {!isBlockCodeData && <h3 className="text-center">No BlockCode Data</h3>}
        <div className="d-flex flex-row-reverse m-2">
          <button
            className="btn btn-primary mx-2"
            onClick={() => {
              setBlockCodeEntryForm(!blockCodeEntryForm);
            }}
          >
            Create Block Code
          </button>
        </div>
        {isBlockCodeData && (
          <>
            {loading && <Loading />}
            {!loading && (
              <>
                {!blockCodeEntryForm && (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          {filteredBlockCodeHeadings.map(
                            (heading: string, index: number) => (
                              <th
                                className="text-center"
                                key={index}
                                scope="col"
                              >
                                {heading}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {blockCodes.map(
                          (blockCode: BlockCode, index: number) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td className="text-center">
                                  {blockCode.blockCode}
                                </td>
                                <td className="text-center">
                                  {blockCode.constituencyName}
                                </td>
                                <td className="text-center">
                                  {blockCode.moza}
                                </td>
                                <td className="text-center">
                                  {blockCode.dehya}
                                </td>
                                <td className="text-center">
                                  {blockCode.city}
                                </td>
                                <td className="text-center">
                                  {blockCode.patwarHalka}
                                </td>
                                <td className="text-center">
                                  {blockCode.tapaydar}
                                </td>
                                <td className="text-center">
                                  {blockCode.tehseel}
                                </td>
                                <td className="text-center">
                                  {blockCode.talka}
                                </td>
                                <td className="text-center">
                                  {blockCode.district}
                                </td>
                                <td className="text-center">
                                  {blockCode.unionCouncil}
                                </td>
                                <td className="text-center">
                                  {blockCode.bookNo}
                                </td>
                                <td className="text-center">
                                  {blockCode.constituency}
                                </td>
                                <td className="text-center">
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      setUpdateBlockCodeData(
                                        !blockCodeEntryForm ? blockCode : null
                                      );
                                      setBlockCodeEntryForm(
                                        !blockCodeEntryForm
                                      );
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
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </>
        )}
        {blockCodeEntryForm && (
          <BlockCodeEntryForm
            updateBlockCodeData={updateBlockCodeData}
            setBlockCodeEntryForm={setBlockCodeEntryForm}
          />
        )}
      </Container>
      {/* <hr className="mx-5" /> */}
    </>
  );
};

export default BlockCodeManagement;
