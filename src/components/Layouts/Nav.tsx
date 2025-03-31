import {useSelector} from "react-redux"
import {RootState} from "../../redux/store"
import Button from "../Button"
import {AiOutlineMenu} from "react-icons/ai"
import {Category} from "../../types"
import { GrAddCircle } from "react-icons/gr"
interface iNav {
  handleClick: () => void
  isOpen: boolean
}

export default function Nav(props: iNav) {
  const title = useSelector((state: RootState) => state.view.currentlyViewing)
  // const admin = useSelector((state: RootState) => state.admin.adminData);
  const {handleClick} = props

  const capitalizeFirstLetter = (str: string) => {
    // Check if the input is a valid string
    if (typeof str !== "string" || str.length === 0) {
      return str
    }

    // Capitalize the first letter and concatenate the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const TitlesWithBackButton = [Category.CreateTransaction]

  return (
    <div className={`m-auto `}>
      <section className="flex items-center justify-between bg-[#FFF]">
        <>
          <Button
            text=""
            icon={
              <AiOutlineMenu className="text-[#000] text-[25px] inline-block m-1" />
            }
            handleClick={handleClick}
            style="flex items-center  w-[5rem] h-[2rem] justify-center bg-[#FFF] rounded-[50%] lg:hidden"
          />
          <div>
            <b className=" font-extrabold text-lg">
              {TitlesWithBackButton.includes(title) && (
                <span
                  className="cursor-pointer mr-5"
                  onClick={() => window.history.back()}
                >
                  &larr;
                </span>
              )}
              {capitalizeFirstLetter(title)}
            </b>
          </div>
        </>
        <div className="flex items-center w-[40%] md:w-[12rem] justify-evenly">
          <div className="flex float-right mr-0">
            {title === Category.Transactions &&<Button
              text="Create Transaction"
              iconLeft={true}
              icon={
                <GrAddCircle className="text-[black] text-4sm inline-block ml-1 mr-1" />
              }
              handleClick={async () => {
                window.location.href = "/transactions/create"
              }}
              style={`float-right hover:bg-gray-400 px-4 py-3 m-0 rounded-md bg-orange text-black h-12`}
            />}
          </div>
        </div>
      </section>
    </div>
  )
}
