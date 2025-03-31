
import { AiOutlineAlignCenter } from "react-icons/ai";
import Button from "./Button";
import {BsSearch} from "react-icons/bs"

interface IPlaceHolder {
    text: string,
    buttonAction?: () => void;
  }
  
export default function PlaceHolder({text, buttonAction}:IPlaceHolder) {
  return (
    <div className="w-full mt-[70px] justify-center items-center h-[40vh] text-center">
      <br/>
      <section className="bg-white rounded-lg mt-20 relative p-20 border border-[#E8E8E8]">
        <span className="text-[40px] justify-center items-center flex pb-4">
          <span>
            <AiOutlineAlignCenter />
          </span>
        </span>
        <p>{text}</p>

       {buttonAction &&
        <div className="justify-center items-center flex m-auto mt-5">
            <Button
              text="Scan"
              icon={
                <BsSearch className="text-[white] text-2sm inline-block m-1" />
              }
              handleClick={() => buttonAction()}
              style={`hover:bg-gray-400 px-4 py-3 rounded-md bg-black text-white flex h-12`}
            />
          </div>}
      </section>
    </div>
  );
}