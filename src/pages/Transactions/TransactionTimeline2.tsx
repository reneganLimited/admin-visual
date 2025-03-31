import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TransactionTimeline2: React.FC = () => {
  const { currentTransaction } = useSelector(
    (state: RootState) => state.transactions,
  );

  const timeline = currentTransaction
    ? (currentTransaction as any)?.AdditionalDetails?.TransactionStatus
    : null;

  const filteredTimeline: any[] = Object.entries(timeline ? timeline : [])
    .filter(([key, value]: any) => value?.DateTime!) // Filter out statuses with null DateTime
    .sort((a: any, b: any) => {
      return (
        new Date(a[1]?.DateTime).getTime() - new Date(b[1]?.DateTime).getTime()
      );
    });

  return (
    <>
      {filteredTimeline.length > 0 && (
        <div className="float-left m-3 w-full">
          <ol className="relative text-gray-500 border-l-[3px] border-[#CACACA]">
            {filteredTimeline.map(([status, value]) => (
              <li className="mb-6 ml-6 items-center w-full">
                <p className=" text-sm mr-5">
                  {value.DateTime
                    ? new Date(value.DateTime).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true, // This will display time in 12-hour AM/PM format
                      })
                    : ""}
                </p>
                <span
                  className={`items-center justify-center w-3 h-3 rounded-full -left-[7.5px] mt-0.5`}
                ></span>
                <p className={`text-sm`}> {status}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
};

export default TransactionTimeline2;