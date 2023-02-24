import React from 'react';

const TableEmpty = ({ times }) => {
  const rows = [];
  for (let i = 0; i < times; i++) {
    rows.push(
      <tr key={i}>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );
  }
  return <>{rows}</>;
};

export default TableEmpty;
