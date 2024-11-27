import React from 'react'
import { IoClose } from 'react-icons/io5'

type ModalType = {
  showDeletePopup: string | boolean;
  onClick: () => void; 
  children: React.ReactNode;
}

const DeleteModalBox: React.FC<ModalType> = ({ showDeletePopup, onClick, children }) => {
  return (
    <div
      className={`fixed inset-0 p-4 ${
        Boolean(showDeletePopup) ? 'flex' : 'hidden'
      } flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto`}>
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-3 relative">
        <div className='flex items-center justify-between gap-2 border-b p-3'>
          <div className="flex items-center gap-2">            
            <h2>Delete</h2>
          </div>
          <span>
            <IoClose
              onClick={onClick}  // Trigger the onClick function
              className='cursor-pointer text-[23px] text-red-600 hover:text-red-700'
            />
          </span>
        </div>
        <div>
          {children}  
        </div>
      </div>
    </div>
  )
}

export default DeleteModalBox