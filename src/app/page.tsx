'use client';

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import TableWithPagination from './components/Table';
import Modal from './components/Modal';
import { TData } from './api/invoice/route';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TData[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('/api/invoice');
      setData(res.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]); // Optional: Reset data on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleModal = () => setIsOpen((prev) => !prev);

  const columns = [
    { key: 'client', label: 'Client' },
    { key: 'amount', label: 'Total Amount' },
    { key: 'created_at', label: 'Created At' },
  ];

  return (
    <div className="container mx-auto">
      <p className="text-xl font-bold my-3">HIT Billing System - Invoice Management</p>
      <div className="flex flex-col">
        <div className="text-end">
          <button
            className="my-3 bg-blue-500 hover:bg-blue-600 transition-all p-2 rounded text-white"
            onClick={toggleModal}
          >
            Add Invoice
          </button>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <ClipLoader size={50} color="blue" />
            </div>
          ) : data.length > 0 ? (
            <TableWithPagination
              data={data}
              setData={setData}
              columns={columns}
              rowsPerPage={2}
            />
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        setIsSubmitted={() => fetchData()}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
