'use client';

import { useState } from 'react';

interface TableWithPaginationProps {
  data: any[];
  columns: { key: string; label: string }[];
  rowsPerPage?: number;
}

export default function TableWithPagination({
  data,
  columns,
  rowsPerPage = 5,
}: TableWithPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  console.log("Table Data::",data)

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  console.log("currentData::", currentData)

  return (
    <div>
      <table className="table-auto border-collapse w-full border border-gray-300">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="border border-gray-300 px-4 py-2 bg-gray-100 text-left"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (currentData.map((row, rowIndex) => (
            <tr key={rowIndex}>
             
                <td className="border border-gray-300 px-4 py-2">
                  {row.clientName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.quantity*row.unitPrice}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.createdAt}
                </td>
              
            </tr>
          ))): (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No data available
              </td>
            </tr>)}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
