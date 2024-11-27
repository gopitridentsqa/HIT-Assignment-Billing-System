'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { IoClose } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

type ModalProps = {
  isOpen: boolean;
  setIsSubmitted: (e: boolean) => void;
  setIsOpen: (e: boolean) => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, setIsSubmitted, setIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    clientName: '',
    description: '',
    quantity: 0,
    unitPrice: 0,
    totalAmount: 0
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const initalRow = {
    description: '',
    quantity: 0,
    unitPrice: 0
  };

  const [rows, setRows] = useState([initalRow]);

  const rowSchema = z.object({
    description: z.string().min(1, 'Description is required'),
    quantity: z.number().nonnegative('Quantity must be a positive number'),
    unitPrice: z.number().nonnegative('Unit price must be a positive number')
  });

  const invoiceSchema = z.object({
    clientName: z.string().min(1, 'Client name is required'),
    rows: z.array(rowSchema).min(1, 'At least one row is required'),
    totalAmount: z.number()
  });

  useEffect(() => {
    if (!isOpen) {
      setData({
        clientName: '',
        description: '',
        quantity: 0,
        unitPrice: 0,
        totalAmount: 0
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      [field]: value
    }));

    setErrors((prevErrors) => {
      const { [field]: _, ...rest } = prevErrors;
      return rest;
    });
  };

  const handleRowChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof rowSchema.shape,
    idx: number
  ) => {
    const value =
      field === 'quantity' || field === 'unitPrice'
        ? parseFloat(e.target.value) || 0
        : e.target.value;

    const updatedRows = rows.map((row, i) =>
      i === idx ? { ...row, [field]: value } : row
    );

    setRows(updatedRows);

    // Update total amount dynamically
    const total = updatedRows.reduce(
      (sum, row) => sum + row.quantity * row.unitPrice,
      0
    );
    setData((prev) => ({ ...prev, totalAmount: total }));

    setErrors((prevErrors) => {
      const errorKey = `rows.${idx}.${field}`;
      const { [errorKey]: _, ...rest } = prevErrors;
      return rest;
    });
  };

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      invoiceSchema.parse({ ...data, rows });
      const payload = {
        clientName: data.clientName,
        rows,
        totalAmount: data.totalAmount
      };
      console.log('payload', payload);

      await axios.post('/api/invoice', payload);

      setIsSubmitted(true);
      setIsOpen(false);
      setRows([initalRow]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length) {
            newErrors[err.path.join('.')] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error('Error submitting data:', error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 p-4 flex justify-center items-center z-50 bg-[rgba(0,0,0,0.5)] overflow-auto">
      <div className="min-w-[300px] w-[40vw] bg-white shadow-lg rounded-lg p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Add Invoice</h3>
          <IoClose
            onClick={() => {
              setIsOpen(false);
              setRows([initalRow]);
            }} // Trigger the onClick function
            className="cursor-pointer text-[23px] text-red-600 hover:text-red-700"
            aria-label="Close Modal"
          />
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={data.clientName}
              onChange={(e) => handleChange(e, 'clientName')}
            />
            {errors.clientName && (
              <p className="text-red-500 text-sm">{errors.clientName}</p>
            )}
          </div>

          <div>
            <div className="grid grid-cols-12 gap-4">
              <label className="block col-span-4 md:col-span-5 text-sm font-medium text-gray-700">
                Description
              </label>

              <label className="block col-span-3 text-sm font-medium text-gray-700">
                Quantity
              </label>

              <label className="block col-span-4 md:col-span-3 text-sm font-medium text-gray-700">
                Unit Price
              </label>

              <label className="block md:col-span-1 text-sm font-medium text-gray-700"></label>
            </div>

            {rows?.map((row, idx) => {
              return (
                <div key={idx} className="grid grid-cols-12 gap-4 mt-3">
                  <div className=" col-span-4 md:col-span-5">
                    <input
                      className="w-full p-2 border rounded-md"
                      value={row.description}
                      onChange={(e) => handleRowChange(e, 'description', idx)}
                    />
                    {errors[`rows.${idx}.description`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`rows.${idx}.description`]}
                      </p>
                    )}
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      className="w-full p-2 border rounded-md"
                      value={row.quantity}
                      onChange={(e) => handleRowChange(e, 'quantity', idx)}
                    />
                    {errors[`rows.${idx}.quantity`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`rows.${idx}.quantity`]}
                      </p>
                    )}
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      className="w-full p-2 border rounded-md"
                      value={row.unitPrice}
                      onChange={(e) => handleRowChange(e, 'unitPrice', idx)}
                    />
                    {errors[`rows.${idx}.unitPrice`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`rows.${idx}.unitPrice`]}
                      </p>
                    )}
                  </div>
                  <div className="col-span-1 mt-2">
                    <MdDelete
                      onClick={() =>
                        idx !== 0 &&
                        setRows((prevState) =>
                          prevState?.filter((_, i) => i !== idx)
                        )
                      }
                      className={`rounded-full p-1 text-[27px] cursor-pointer ${
                        idx !== 0 ? 'text-[#e6472c]' : 'text-gray-300'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end my-2">
            <button
              className="text-[13px] text-blue-500"
              onClick={() => setRows((prev) => [...prev, initalRow])}>
              Add More +
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Amount
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-md bg-gray-100"
              value={data.totalAmount}
              readOnly
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
            onClick={() => {
              setIsOpen(false);
              setRows([initalRow]);
            }}>
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
            onClick={() => handleSubmit()}
            disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
