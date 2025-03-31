import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";

interface IProps {
    text: string;
}

const Copy = ({ text }: IProps) => {
    return (
        <div
            className="inline ml-2 cursor-pointer text-blue-500"
            onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(text);
                toast.success("Copied to clipboard");
            }}
        >
            <FaRegCopy className="inline text-sm" />
            &nbsp;<small>copy</small>
        </div>
    );
};

export default Copy;
