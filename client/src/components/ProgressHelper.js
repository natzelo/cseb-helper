import React from "react";

function ProgressHelper(props) {
  const renderedHouseholds = props.households.map((household) => {
    return (
      <tr>
        <td>{household.BPNo}</td>
        <td>{household.name}</td>
        <td>{household.address}</td>
      </tr>
    );
  });
  return <>{renderedHouseholds}</>;
}

export default ProgressHelper;
