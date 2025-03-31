import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { Typography, Box } from "@mui/material";
import { convertToUpperCase, getTransactionClass } from "../../utils/helper";
import { TransactionStateEnum } from "../../types";

const TransactionTimeline: React.FC = () => {
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

  // Determine if the last state is COMPLETED
  const lastState = filteredTimeline[filteredTimeline.length - 1]?.[0];
  const overrideDotColor =
  convertToUpperCase(lastState) === "COMPLETED" ? "success" : null; // Use success for COMPLETED

  return (
    <>
      {filteredTimeline.length > 0 && (
        <>
        <small>Transaction Status</small>
        <Box sx={{ padding: 1, border: "1px solid #e0e0e0", borderRadius: 1, marginBottom: 3 }}>
          <Timeline className="h-auto">
            {filteredTimeline.map(([status, value], index) => (
                <TimelineItem className="w-full min-h-auto float-left" key={index}><TimelineOppositeContent
                  sx={{
                    flex: 0.3,
                    textAlign: "left",
                    color: "gray",
                    padding: "0 18px 0 0",
                    height: "auto",
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    {value.DateTime
                      ? new Date(value.DateTime).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true, // Displays time in 12-hour AM/PM format
                        })
                      : ""}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                  color={overrideDotColor || getTransactionClass(convertToUpperCase(status) as TransactionStateEnum)}
                  sx={{ height: 0, marginBottom: 2 }}
                  />
                  {index !== filteredTimeline.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography sx={{marginTop: 0.25}} variant="body2" fontWeight="bold" className="mt-2">
                  {convertToUpperCase(status)}{" "}&nbsp;
                  {value.Admin && (
                    <Typography variant="caption" component="span">
                    (by <b>{value.Admin}</b>)
                    </Typography>
                  )}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>
        </>
      )}
    </>
  );
};

export default TransactionTimeline;