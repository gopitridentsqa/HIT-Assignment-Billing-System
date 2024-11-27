'use client';

import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

function Modal({
  isOpen,
  setIsSubmitted,
}: Readonly<{ isOpen: boolean; setIsSubmitted: (e: boolean) => void }>) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  useEffect(() => {
    setShowModal(isOpen);
    setData(undefined);
  }, [isOpen]);

  const addData = useCallback(async () => {
    if (data) {
      setIsLoading(false);
      await axios.post("/api/invoice", {
        clientName: data?.clientName,
        description: data?.description,
        quantity: data?.quantity,
        unitPrice: data?.unitPrice,
      });
      setIsSubmitted(true);
      setIsLoading(false);

      setShowModal(false);
    }
  }, [data]);

  return (
    <div
      className={`fixed inset-0 p-4 ${
        showModal ? "flex" : "hidden"
      } flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto`}
    >
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <div className="flex items-center pb-3">
          <h3 className="text-gray-800 text-xl font-bold flex-1">
            Add invoice
          </h3>
          <button onClick={() => setShowModal(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col justify-center max-w-lg mx-auto px-4 space-y-6 font-[sans-serif] text-[#333] mt-3">
          <input
            type="text"
            placeholder="Client name"
            className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            value={data?.clientName ?? ""}
            onChange={(e) => setData({ ...data, clientName: e.target.value })}
          />
          <textarea
            placeholder="Description"
            rows={3}
            className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500 resize-none"
            value={data?.description ?? ""}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            value={data?.quantity ?? 0}
            onChange={(e) =>
              setData({ ...data, quantity: parseInt(e.target.value) })
            }
          />
          <input
            type="number"
            placeholder="Unit price"
            className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            value={data?.unitPrice ?? 0}
            onChange={(e) =>
              setData({ ...data, unitPrice: parseInt(e.target.value) })
            }
          />

          <div className="pt-6 flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600 disabled:bg-gray-400"
              onClick={addData}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
