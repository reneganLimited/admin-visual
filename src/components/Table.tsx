/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "./Button";
import { getDateTime } from "../constants";

interface ITable {
  thead: Array<string>;
  theadRatio?: number[];
  tdata: Array<{ [key: string]: any }> | null;
  tbodyStyles?: string[] | string;
  actionBtns?: { [key: string]: (idKey: string) => void };
  actionStyles?: { [key: string]: string };
  actionConditions?: {
    [key: string]: (item: { [key: string]: any }) => boolean;
  };
  idKey: string;
  headers?: string[];
  onRowClick: (idKey: string) => void;
}

const Table = ({
  thead,
  tdata,
  tbodyStyles,
  theadRatio,
  actionBtns,
  idKey,
  headers,
  onRowClick,
  actionStyles,
  actionConditions,
}: ITable) => {
  const tableStyles = " xxs:w-max sm:w-full  text-[15px] ";
  const trLightStyle = " bg-gray-100";
  const trDarkStyle = " bg-gray-300";
  const restPercentage = actionBtns ? 100 : 100;
  const initialwidthRatio = new Array(thead.length).fill(
    restPercentage / thead.length,
    0,
    thead.length,
  );
  const widthRatio = theadRatio
    ? theadRatio.map((el) => (el * restPercentage) / 100)
    : initialwidthRatio;

  const getColor = (head: any) => {
    switch (head) {
      case "IN_TRANSIT":
        return "blue";
      case "COMPLETED":
        return "green";
      case "KYC_PENDING":
        return "black";
      case "PENDING":
        return "yellow";
      case "FAILED":
        return "danger";
      case "CANCELLED":
        return "danger";
      case "DAILY_LIMIT_EXCEEDED":
        return "black";
      default:
        break;
    }
  };
  return (
    <>
      {tdata === null || tdata.length === 0 ? (
        <>
          <colgroup>
            <col width="17%" />
            {thead.map((el, index) => {
              return (
                <col
                  key={"theadcol" + el + index}
                  width={`${widthRatio[index]}%`}
                />
              );
            })}
            {actionBtns && <col width="10%" />}
          </colgroup>
          <tbody className="overflow-y-scroll cursor-pointer">
            <tr className={`border-b border-gray-300`}>
              {/* <td className="py-5 font-bold">S/N</td> */}
              {thead.map((el, index) => {
                return (
                  <>
                    <td key={index} className="py-7 font-bold">
                      {headers ? headers[index] : el}
                    </td>
                  </>
                );
              })}
              <td className="py-5 font-bold flex justify-start">Actions</td>
            </tr>
          </tbody>
          {!tdata ? (
            <div className="w-full mt-5 ">
              <div className="animate-pulse flex w-full ">
                <div className="flex-1 space-y-6 w-full ">
                  <div className="h-2 bg-slate-700 py-[10%]  w-full "></div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-center text-xl font-bold">No Data Yet</p>
            </div>
          )}
        </>
      ) : (
        <table className={`w-full ${tableStyles} `}>
          <colgroup>
            <col width="25%" />
            {thead.map((el, index) => {
              return (
                <col key={index + "col" + el} width={`${widthRatio[index]}%`} />
              );
            })}
            {actionBtns && <col width="10%" />}
          </colgroup>
          <tbody className="overflow-y-scroll cursor-pointer">
            <tr className={`border-b border-gray-300`}>
              {/* <td className="py-5 font-bold ">S/N</td> */}
              {thead.map((el, index) => {
                return (
                  <>
                    <td
                      key={index + el + "head"}
                      className="group relative py-5 font-bold"
                    >
                      {headers ? headers[index] : el}
                      <span
                        className="group-hover:opacity-100 transition-opacity bg-gray-300 px-4 text-sm text-gray-500 rounded-md absolute left-1/2 
-translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto"
                      >
                        {el}
                      </span>
                    </td>
                  </>
                );
              })}
              <td className="py-5 font-bold flex justify-start">Actions</td>
            </tr>
            {tdata.map((item, index) => {
              return (
                <tr
                  key={item[idKey] + index + "tr"}
                  className={
                    `border-b border-gray-300` +
                    (index % 2 === 0 ? trLightStyle : trDarkStyle)
                  }
                >
                  {/* <td
                    className="flex justify-center items-center py-5"
                    onClick={() => onRowClick(item[idKey])}>

                    {" "}
                    {index + 1}
                  </td> */}
                  {thead.map((head, index) => (
                    <>
                      <td
                        key={item[idKey] + index + "td"}
                        className="pt-3"
                        onClick={() => onRowClick(item[idKey])}
                      >
                        <p
                          className={
                            Array.isArray(tbodyStyles)
                              ? tbodyStyles[index]
                              : tbodyStyles || ""
                          }
                        >
                          <p
                            className={
                              head == "State" ||
                              (headers && headers[index] == "State")
                                ? getColor(item[head])
                                : ""
                            }
                          >
                            {head == "Date" ||
                            (headers && headers[index] == "Date") ? (
                              getDateTime(item[head])
                            ) : head == "Rate" ? (
                              <p></p>
                            ) : (
                              item[head]
                            )}
                          </p>
                        </p>
                      </td>
                    </>
                  ))}
                  <td
                    className="pt-3 "
                    onClick={(e) => {
                      if (e.target === e.currentTarget) onRowClick(item[idKey]);
                    }}
                  >
                    <div className="flex items-center">
                      {actionBtns &&
                        Object.keys(actionBtns).map((action, index) => {
                          return (
                            <>
                              {(!actionConditions ||
                                actionConditions[action](item)) && (
                                <Button
                                  key={
                                    item.TransactionIdentifier +
                                    index +
                                    "cancel"
                                  }
                                  style={
                                    actionStyles
                                      ? actionStyles[action]
                                      : " z-5 hover:bg-gray-400 text-sm text-black px-2 py-1 rounded-[15px] bg-[red] text-white mr-2"
                                  }
                                  text={action}
                                  handleClick={() => {
                                    actionBtns[action](item[idKey]);
                                  }}
                                />
                              )}
                            </>
                          );
                        })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;
