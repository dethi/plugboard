import React from 'react';

export default function TruthTable(props) {
  const { truth_table, nbInput, nbOutput, IONames } = props.objectif;

  const IONAmesArray = IONames.split(',');
  return (
    <table className="table is-bordered">
      <thead>
        <tr>
          {Array.apply(null, Array(nbInput + nbOutput)).map((item, i) => (
            <th key={i}>
              {IONAmesArray[i]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {truth_table.map((row, i) => (
          <tr key={i}>
            {row.map((value, j) => (
              <th key={j}>
                {!props.truthTableFromBoard ||
                  (props.truthTableFromBoard &&
                    props.truthTableFromBoard[i][j] === value)
                  ? value
                  : <strong>
                      {props.truthTableFromBoard[i][j] + ' should be ' + value}
                    </strong>}
              </th>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
