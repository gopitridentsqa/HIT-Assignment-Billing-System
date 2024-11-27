'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { IoClose } from 'react-icons/io5'

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
    totalAmount: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const invoiceSchema = z.object({
    clientName: z.string().min(1, 'Client name is required'),
    description: z.string().min(1, 'Description is required'),
    quantity: z.number().positive('Quantity must be a positive number'),
    unitPrice: z.number().positive('Unit price must be a positive number'),
    totalAmount: z.number(),
  });

  // Reset state when modal visibility changes
  useEffect(() => {
    if (!isOpen) {
      setData({
        clientName: '',
        description: '',
        quantity: 0,
        unitPrice: 0,
        totalAmount: 0,
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    const value = e.target.value;
    setData((prev) => {
      const updatedData = {
        ...prev,
        [field]: field === 'quantity' || field === 'unitPrice' ? parseFloat(value) || 0 : value,
      };
      updatedData.totalAmount = updatedData.quantity * updatedData.unitPrice;
      return updatedData;
    });

    // Clear the error for the field when user types
    setErrors((prevErrors) => {
      const { [field]: _, ...rest } = prevErrors;
      return rest;
    });
  };

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      // Validate data with Zod
      invoiceSchema.parse(data);

      // Submit the data to the server
      await axios.post('/api/invoice', {
        clientName: data.clientName,
        description: data.description,
        quantity: data.quantity,
        unitPrice: data.unitPrice,
        totalAmount: data.totalAmount,
      });

      // Notify parent component and close the modal
      setIsSubmitted(true);
      setIsOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error('Error submitting data:', error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [data, setIsOpen, setIsSubmitted]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 p-4 flex justify-center items-center z-50 bg-[rgba(0,0,0,0.5)] overflow-auto"
    >
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
          <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Add Invoice</h3>
          <IoClose
            onClick={() => setIsOpen(false)} // Trigger the onClick function
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
            {errors.clientName && <p className="text-red-500 text-sm">{errors.clientName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full p-2 border rounded-md resize-none"
              value={data.description}
              onChange={(e) => handleChange(e, 'description')}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={data.quantity}
              onChange={(e) => handleChange(e, 'quantity')}
            />
            {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Unit Price
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={data.unitPrice}
              onChange={(e) => handleChange(e, 'unitPrice')}
            />
            {errors.unitPrice && <p className="text-red-500 text-sm">{errors.unitPrice}</p>}
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
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
