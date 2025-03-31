/* eslint-disable react-hooks/exhaustive-deps */
// src/components/UserManagement.js
import {useState} from "react"
import {useDispatch} from "react-redux"
import {
    clearSearchResults,
  fetchUserByEmail,
  fetchUserByName,
} from "../../redux/slices/CustomerSlice"
import {AppDispatch} from "../../redux/store"
import Button from "../../components/Button"
import {SearchBy} from "../../types"

export default function CustomerSearch() {
  const [searchBy, setSearchBy] = useState<SearchBy>(SearchBy.Email)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [lastName, setLastName] = useState("")
  const dispatch = useDispatch<AppDispatch>()

  const handleSearchByChange = (e: any) => {
    e.preventDefault()
    setSearchBy(e.target.value)
  }
  const handleFirstNameChange = (e: any) => {
    e.preventDefault()
    setFirstName(e.target.value.toLowerCase().replace(/\s/g, ""))
  }

  const handleMiddleNameChange = (e: any) => {
    e.preventDefault()
    setMiddleName(e.target.value.toLowerCase().replace(/\s/g, ""))
  }

  const handleLastNameChange = (e: any) => {
    e.preventDefault()
    setLastName(e.target.value.toLowerCase().replace(/\s/g, ""))
  }

  const handleSearch = () => {
    if (searchBy === SearchBy.Email) {
      dispatch(clearSearchResults()) // Clear dropdown after selecting
        dispatch(fetchUserByEmail(email))
    } else if (searchBy === SearchBy.Name) {
      dispatch(clearSearchResults()) // Clear dropdown after selecting
      dispatch(fetchUserByName({firstName, middleName, lastName}))
    }
  }

  return (
    <>
      <div className="float-left w-full">
        <div className="flex float-left mb-4 w-full  space-x-1">
    
          <div className="float-left flex">
            <div className="float-left ml-1 flex">
              <select
                name="SearchBy"
                value={searchBy}
                onChange={handleSearchByChange}
                className={`text-[14px] text-black border mb-1 py-2 pr-1 outline-none rounded-md h-12 float-left flex`}
              >
                {Object.keys(SearchBy).map((key, index) => {
                  return (
                    <option key={index} value={key}>
                      {key}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className="ml-1 flex w-full space-x-1">
                {searchBy === SearchBy.Email && (
                <input
                  type="text"
                  placeholder={`Enter ${searchBy}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase().replace(/\s/g, ""))}
                  className="flex-grow w-full border border-black text-[14px] text-[#747A80] mb-1 py-2 pl-2 outline-none rounded-md h-12"
                />
                )}

              {searchBy === SearchBy.Name && (
                <div className="w-auto float-left">
                  <input
                    className="text-[14px] text-[#747A80] border mb-1 py-2 pl-2 outline-none rounded-md h-12 w-4 float-left"
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    placeholder="Enter first name"
                  />
                  <input
                    className="text-[14px] text-[#747A80] border mb-1 py-2 pl-2 outline-none rounded-md h-12 w-4 float-left"
                    type="text"
                    name="middleName"
                    value={middleName}
                    onChange={handleMiddleNameChange}
                    placeholder="Enter middle name"
                  />
                  <input
                    className="text-[14px] text-[#747A80] border mb-1 py-2 pl-2 outline-none rounded-md h-12 w-4 float-left"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleLastNameChange}
                    placeholder="Enter last name"
                  />
                </div>
              )}

              <Button
                text="Scan"
                handleClick={handleSearch}
                style={`hover:bg-gray-400 px-4 py-3 rounded-md bg-black text-white flex h-12 ml-1 w-auto`}
              />

            </div>
          </div>
        </div>
      </div>

    </>
  )
}
