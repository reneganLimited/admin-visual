/* eslint-disable react-hooks/exhaustive-deps */
// src/components/UserManagement.js
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {ApolloProvider} from "@apollo/client"
import client from "../../features/services/GraphqlClient"
import {AppDispatch, RootState} from "../../redux/store"
import CustomerCard from "./CustomerCard"
import {setCurrentlyViewing} from "../../redux/slices/View"
import {toast, ToastContainer} from "react-toastify"
import {Category} from "../../types"
import CustomerSearch from "./CustomerSearch"
import SearchResults from "./NameSearchResults"
import PlaceHolder from "../../components/PlaceHolder"

export default function CustomerManagement() {
  const dispatch = useDispatch<AppDispatch>()
  const {status, error, searchResults} = useSelector((state: RootState) => state.customer)
  useEffect(() => {
    dispatch(setCurrentlyViewing(Category.Customer))
  }, []) // Add dependencies to trigger the effect

  useEffect(() => {
    status === "failed" && toast.error(`${error}`)
  }, [error, status]) // Add dependencies to trigger the effect

  return (
    <>
      <ToastContainer />
      <ApolloProvider client={client}>
        <div className="min-h-screen bg-white text-black p-6">
         
          <CustomerSearch />
          {(status === "failed" || error) && <p className="text-red-500">Error: {error}</p>}
          {status === "loading" ?
           <p>Loading...</p>:
           <>
          <SearchResults />
          <br/>
          <br/>
          <hr/>
          {(!searchResults.length && status !== "idle") && <CustomerCard />}
          </>}
          
          {status === "idle" && <PlaceHolder text="Search for customers"/>}
          {(status === "failed" || error) && <p className="text-red-500">Error: {error}</p>}
         
         </div>
      </ApolloProvider>
    </>
  )
}
