import React from 'react';

export default function EntityTable({ columns, items }) {
  if (!items || items.length === 0) {
    return <div className="alert alert-light">No records found.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-secondary">
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id || item.pk || JSON.stringify(item)}>
              {columns.map((column) => (
                <td key={column.accessor}>{column.render ? column.render(item) : item[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
