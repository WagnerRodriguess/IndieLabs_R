'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom'; 
import { AlertTriangle, X } from 'lucide-react';

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDanger?: boolean;
};

export default function ConfirmModal({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel,
  isDanger = false 
}: ConfirmModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div className="modal-overlay">
      <div className="modal-box">
        <button onClick={onCancel} className="modal-close-btn">
          <X size={20} />
        </button>

        <div className="modal-content">
          <div className="modal-icon-wrapper">
            <AlertTriangle size={32} color={isDanger ? "#ef4444" : "#9B65EC"} />
          </div>
          
          <h3 className="modal-title">{title}</h3>
          <p className="modal-message">{message}</p>

          <div className="modal-actions">
            <button onClick={onCancel} className="modal-btn cancel">
              Cancelar
            </button>
            <button 
              onClick={onConfirm} 
              className={`modal-btn confirm ${isDanger ? 'danger' : ''}`}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}