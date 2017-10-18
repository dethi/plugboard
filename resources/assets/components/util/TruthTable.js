import React from 'react';

export default function TruthTable(props) {
  const { truth_table, nbInput, nbOutput } = props.objectif;
  return (
    <table className="table is-bordered">
      <thead>
        <tr>
          {Array.apply(null, Array(nbInput + nbOutput)).map((item, i) => (
            <th key={i}>
              {i < nbInput
                ? (i + 1).toString()
                : String.fromCharCode('A'.charCodeAt(0) + i - nbInput)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {truth_table.map((row, i) => (
          <tr key={i}>
            {row.map((value, j) => (
              <th key={j}>
                {value}
              </th>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
