interface ITimeline {
  filteredStateChange: any;
}

const Timeline = ({ filteredStateChange }: ITimeline) => {
  const StateHistoryValue = (value: any) => {
    if (typeof value !== 'string') {
      console.error("Value is not a string:", value);
      return null;
    }
    const parts = value.split("||");

    // The first part is the initial message
    const message = parts[0].trim();

    // The second part is the JSON string of the array, if it exists
    const jsonString = parts[1]?.trim();

    // Initialize the flagsArray
    let flagsArray: string[] = [];

    // Check if jsonString is present and try parsing it
    if (jsonString) {
      try {
        flagsArray = JSON.parse(jsonString);
      } catch (error) {
        console.error("Failed to parse JSON string:", error);
      }
    }

    return (
      <>
        {message}
        {flagsArray.length > 0 && (
          <>
            <br />
            <ul className="ml-6">Reasons:
              {flagsArray.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  };

  return (
    <div className="scroll-box">
      <ul className="padding">
        {filteredStateChange?.map(([timestamp, value]: any) => (
          <li key={timestamp} className="font-bold text-dark font-small">
            <span className="orange">
              [
              {new Date(timestamp).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true, // This will display time in 12-hour AM/PM format
              })}
              ]
            </span>
            &nbsp;- {value && StateHistoryValue(value)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
