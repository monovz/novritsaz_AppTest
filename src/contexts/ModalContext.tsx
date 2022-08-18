import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { useSelector } from "react-redux";
import React from 'react'
import ContactModal from "../components/ContactModal";

interface PayloadShareModal {
  _id?: string | number | null,
  type?: string,
}

export interface ModalContextProps {
  showModal?: string,
  setShowModal?: Dispatch<SetStateAction<string>>,
  idDetail?: string,
  setIdDetail?: Dispatch<SetStateAction<string>>,
}

export const ModalContext = createContext<ModalContextProps>({})

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(null)
  const [idDetail, setIdDetail] = useState(null)
  return (
    <ModalContext.Provider value={{ showModal, setShowModal, setIdDetail, idDetail }}>
      {children}
      {showModal && <ContactModal idDetail={idDetail} type={showModal} onClose={() => { setShowModal(null); setIdDetail(null) }}/>}
    </ModalContext.Provider>
  )
}