import React from 'react';
import classNames from 'classnames';

export default function TruthTable(props) {
  const { truth_table, nbInput, nbOutput, IONames } = props.objectif;

  const IONAmesArray = IONames.split(',');
  return (
    <table className="table is-bordered is-striped">
      <thead>
        <tr className="headerCell">
          {Array.apply(null, Array(nbInput + nbOutput)).map((item, i) => (
            <th className="is-size-4	" key={i}>
              <strong>{IONAmesArray[i]}</strong>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {truth_table.map((row, i) => (
          <tr key={i}>
            {row.map((value, j) => (
              <th
                className={classNames({
                  redCell: props.truthTableFromBoard &&
                    props.truthTableFromBoard[i][j] !== value
                })}
                key={j}
              >
                {value}
              </th>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
