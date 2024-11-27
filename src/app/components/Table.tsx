'use client';

import { useState } from 'react';
import moment from 'moment';
import DeleteInvoice from './Delete';
import { MdDelete } from 'react-icons/md';

interface TableWithPaginationProps {
  data: any[];
  columns: { key: string; label: string }[];
  rowsPerPage?: number;
  setData:(data:any)=>void;
}

export default function TableWithPagination({
  data,
  columns,
  rowsPerPage = 5,
  setData
}: TableWithPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeletePopup, setShowDeletePopup] = useState<string>("");

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);  

  const handleDelete = async (id: string) => {
    const updatedData = data?.filter((item) => item.clientName !== id);
    setData(updatedData);
    if (currentPage > 1 && updatedData.length <= (currentPage - 1) * rowsPerPage) {
      setCurrentPage(currentPage - 1); 
    }
    setShowDeletePopup("");
  };

  console.log("currentData",currentData);

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
             <th className="border border-gray-300 w-[80px] px-4 py-2 bg-gray-100 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-gray-300 px-4 py-2">
                  {row.clientName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.totalAmount || 0}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {moment(row.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                </td>
                <td className="border border-gray-300  px-4 py-2">
                  <span className="flex items-center justify-center">
                    <MdDelete
                      onClick={() => setShowDeletePopup(row?.clientName)}
                      className="text-red-600  rounded-full p-1 text-[27px] hover:bg-gray-100 active:bg-gray-50 cursor-pointer"
                    />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
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
      
      <DeleteInvoice
        showDeletePopup={showDeletePopup}
        onClick={() => setShowDeletePopup('')}
        >
          <div className='p-4'>
            <p>Are you sure you want to delete <strong>' {showDeletePopup} '</strong> ?</p>
            <div className='flex items-center justify-end gap-3 mt-10 mb-3'>
              <button onClick={() => setShowDeletePopup('')} className='px-2 py-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-100 w-[100px] rounded' >No</button>
              <button onClick={() => handleDelete(showDeletePopup)} className='px-2 py-1  w-[100px] bg-red-400 hover:bg-red-500 active:bg-red-400 text-white rounded' >Confirm</button>
            </div>
          </div>
      </DeleteInvoice>
    </div>
  );
}
