import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Category } from "../types";

interface IPagination {
  setCurrentPage: (page: number) => void;
  currentPage: number;
  total: number;
  firstIndex: number;
  lastIndex: number;
  loadPrevious?: (index?: number | undefined) => void;
  loadNext?: () => void;
  previousTokens?: any[];
  max?: number;
  totalCount?: number;
  shouldCount?: boolean;
  hasNextToken?: boolean;
}

const PaginationBar: React.FC<IPagination> = ({
  setCurrentPage,
  currentPage,
  total,
  firstIndex,
  lastIndex,
  previousTokens = [],
  loadNext,
  loadPrevious,
  totalCount,
  hasNextToken,
  shouldCount
}) => {

  const { currentlyViewing } = useSelector(
    (state: RootState) => state.view
  );
  
  const TypeOfData = () => {
    switch (currentlyViewing) {
      case Category.KYC:
      case Category.AML:
        return 'kycs';
      case Category.Transactions:
        return 'transactions';
      case Category.Vendors:
        return 'vendors';
      default:
        return 'documents';
    }
  };

  return (
    <>
      {shouldCount ? (
        <div className="m-2 float-right text-right">
          <b>Total:</b>&nbsp; {totalCount?.toLocaleString()} {TypeOfData()}
        </div>
      ):null}
      <div className="w-full float-right">
        <div className="flex justify-end z-0">
          {previousTokens?.map((token, index) => (
            <button
              key={index}
              // onClick={() => loadPrevious && loadPrevious(index+1)} // Ensure loadPrevious is defined before calling it
              className="relative inline-flex cursor-pointer items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {index + 1}
            </button>
          ))}
          &nbsp;
          <nav
            className="inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              className="inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => {
                if (previousTokens.length >= 1 && currentPage <= 1) {
                  loadPrevious && loadPrevious();
                } else {
                  setCurrentPage(currentPage - 1);
                }
              }}
              disabled={previousTokens.length <= 0 && currentPage <= 1}
            >
              Previous
            </button>

            <i className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              {firstIndex + 1} - {lastIndex >= total ? total : lastIndex} of{" "}
              {total || 0}
            </i>

            <button
              className="inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => {
                console.log("lastIndex",lastIndex * currentPage);
                console.log("total", total);
                console.log("has token:", hasNextToken);
                console.log("old tokens:", previousTokens);
                if (lastIndex >= total && hasNextToken) {
                  loadNext && loadNext(); // Ensure loadNext is defined before calling it
                } else if (lastIndex < total) {
                  console.log("next page", currentPage + 1);
                  console.log("current page", currentPage);
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default PaginationBar;
