import { useState, SetStateAction, useEffect, Dispatch } from "react";
import { BlockCode } from "../interfaces/BlockCode";
import { useAppSelector } from "../store/hooks";

interface Props {
  tags?: string[];
  data?: any;
  setData?: Dispatch<SetStateAction<any[]>>;
  setTags?: Dispatch<SetStateAction<string[]>>;
  placeholder?: string;
}

const TagInput = ({ tags, setTags, data, setData, placeholder }: Props) => {
  const blockCodes = useAppSelector((state) => state.app.blockCodes);
  const [tagData, setTagData] = useState<string[]>([]);
  const removeTagData = (indexToRemove: number) => {
    const newtags: string[] = [
      ...tagData.filter((_: any, index: number) => index !== indexToRemove),
    ];
    setTagData([...newtags]);
    setData && setData({ ...data, assignedBlockCodes: [...newtags] });

    // setData && setData( assignedBlockCodes: [ ...tagData.filter((_: any, index: number) => index !== indexToRemove)]);
  };
  const addTagData = (event: any) => {
    if (event.target.value !== "") {
      setTagData([...tagData, event.target.value]);
      setData &&
        setData({
          ...data,
          assignedBlockCodes: [...tagData, event.target.value],
        });
      event.target.value = "";
    }
  };
  useEffect(() => {
    tags && setTagData(tags);
  }, [tags]);
  return (
    <>
      <div className="tag-input">
        <ul className="tags">
          {tagData.map((tag: string, index: number) => (
            <li key={index} className="tag">
              <span className="tag-title">{tag}</span>
              <span
                className="tag-close-icon"
                onClick={() => removeTagData(index)}
              >
                x
              </span>
            </li>
          ))}
        </ul>
        <input
          list="brow"
          type="number"
          onKeyUp={(event) =>
            event.key === "Enter" ? addTagData(event) : null
          }
          placeholder={placeholder ? placeholder : "Press enter to add a tag"}
        />
        <datalist id="brow">
          {blockCodes.map((blockCode: BlockCode) => {
            return (
              <option key={blockCode._id} value={`${blockCode.blockCode}`} />
            );
          })}
        </datalist>
      </div>
    </>
  );
};

export default TagInput;
