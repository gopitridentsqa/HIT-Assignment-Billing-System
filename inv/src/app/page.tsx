'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import TableWithPagination from './components/Table';
import { TData } from './api/invoice/route';
import Modal from './components/Modal';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TData[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/invoice');
        console.log("res::",res.data)
        setData(res.data.data);
      } catch (error){
        console.log(`Error fetching data:, ${error}`)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // const delayedFetch = setTimeout(fetchData, 3000);

    // return () => clearTimeout(delayedFetch);


  }, [isSubmitted]);

  console.log("GET DATA::", data)

  const columns = [
    { key: "client", label: "Client" },
    { key: "amount", label: "Total Amount" },
    { key: "created_at", label: "Create At" },
  ];

  return (
    <div className="container mx-auto">
      <p className="text-xl font-bold my-3">HIT Billing System - Invoice Management</p>
      <div className="flex flex-col">
        <div className="text-end">
          <button
            className="my-3 bg-blue-500 p-1 rounded px-1.5 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            Add Invoice
          </button>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <ClipLoader />
          ) : (
            data.length > 0 ? (<TableWithPagination data={data} columns={columns} rowsPerPage={2} />): <p>No data available</p>
            // <table className="min-w-full divide-y divide-gray-200">
            //   <thead className="bg-gray-100 whitespace-nowrap">
            //     <tr>
            //       <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
            //         Client Name
            //       </th>
            //       <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
            //         Total amount
            //       </th>
            //       <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
            //         Created at
            //       </th>
            //     </tr>
            //   </thead>

            //   <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
            //     {data.map((e) => {
            //       const total = e.quantity * e.unitPrice;

            //       return (
            //         <tr key={e.clientName}>
            //           <td className="px-4 py-4 text-sm text-gray-800">
            //             {e.clientName}
            //           </td>
            //           <td className="px-4 py-4 text-sm text-gray-800">
            //             {total}
            //           </td>
            //           <td className="px-4 py-4 text-sm text-gray-800">
            //             {new Date(e.createdAt).toLocaleString()}
            //           </td>
            //         </tr>
            //       );
            //     })}
            //   </tbody>
            // </table>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} setIsSubmitted={setIsSubmitted} />
    </div>
  );
}
