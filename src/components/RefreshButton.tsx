
import { BsRepeat } from "react-icons/bs";
import Button from "./Button";
interface IProps{
    handleClick: () => void;
}
const RefreshButton = ({ handleClick }:IProps) => {
return (
    <Button
              iconLeft={true}
              icon={
                <BsRepeat className="text-[black] text-2xl inline-block mr-3" />
              }
              text="Refresh"
              handleClick={() => {
                handleClick();
              }}
              style="text-sm pull-left px-4 py-2 rounded-md border border-black text-black float-right flex"
            />
)
}

export default RefreshButton;