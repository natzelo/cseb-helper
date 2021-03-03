import React from "react";
import comp from "../utils/comp";

function ViewHouseholdsHelper(props) {
  props.households.sort((a, b) => comp(a.bookNo, b.bookNo));

  const renderedHouseholds = props.households.map((household) => {
    return (
      <tr>
        <td>{household.BPNo}</td>
        <td>{household.serviceNo}</td>
        <td>{household.name}</td>
        <td>{household.address}</td>
        <td>{household.meterNo}</td>
        <td>{household.capacity}</td>
        {household.readings.length !== 0 ? (
          <>
            <td>{household.readings[household.readings.length - 1].energy}</td>
            <td>{household.readings[household.readings.length - 1].PF}</td>
            <td>{household.readings[household.readings.length - 1].MD}</td>
          </>
        ) : (
          <>
            <td></td>
            <td></td>
            <td></td>
          </>
        )}

        <td>{household.bookNo}</td>
      </tr>
    );
  });

  return <>{renderedHouseholds}</>;
}

export default ViewHouseholdsHelper;
