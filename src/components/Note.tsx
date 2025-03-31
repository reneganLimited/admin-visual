import { MdInfo } from "react-icons/md";

interface IProps {
    text: string;
}

const Note = ({text}:IProps)=>{
    return (<>
    <div className={`p-2 w-full text-left mt-3`}>
          <i><MdInfo className="float-left mt-1 mr-1"/> <b>Note:</b> {text}</i>
        </div>
    </>)
}

export default Note;