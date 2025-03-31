interface IPagination {
  setCurrentPage: any;
  currentPage: number;
  total: number;
}

const PagePaginationBar = ({
  setCurrentPage,
  currentPage,
  total,
}: IPagination) => {
  return (
    <div className="flex justify-end mt-4 float-right">
      <nav
        className="relative inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <button
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage + 1 <= 1}
        >
          Previous
        </button>

        <i className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          {currentPage + 1} / {total || 0}
        </i>

        <button
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage + 1 >= total}
        >
          Next
        </button>
      </nav>
    </div>
  );
};
export default PagePaginationBar;
