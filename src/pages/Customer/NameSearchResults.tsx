/* eslint-disable react-hooks/exhaustive-deps */
// src/components/UserManagement.js
import {useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootState} from "../../redux/store"
import {
  clearSearchResults,
  fetchUserByEmail,
} from "../../redux/slices/CustomerSlice"

export default function SearchResults() {
  const dispatch = useDispatch<AppDispatch>()
  const searchResults = useSelector(
    (state: RootState) => state.customer.searchResults
  )

  const handleSelectResult = (result: any) => {
    dispatch(fetchUserByEmail(result?.Email));
    dispatch(clearSearchResults()); // Clear dropdown after selecting
  }

  return (
    <>
      {searchResults?.length > 0 && (
        <div className="w-full bg-white border border-gray-300 rounded-md z-10">
          <legend className="text-bold p-2">
            Results ({searchResults?.length || 0}) :
          </legend>
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="cursor-pointer p-4 hover:bg-gray-100 border border-[#cccdcf]"
              onClick={() => handleSelectResult(result)}
            >
              {result?.FirstName}&nbsp;
              {result?.MiddleName}&nbsp;
              {result?.LastName}
              &nbsp; - &nbsp;
              <b>{result?.Email}</b>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
