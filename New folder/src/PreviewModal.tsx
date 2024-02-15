import XIcon from '@duyank/icons/regular/X';
import { Preview } from '@lidojs/design-editor';
import React, { FC, useEffect } from 'react';

interface PreviewModalProps {
  onClose: () => void;
}

const PreviewModal: FC<PreviewModalProps> = ({ onClose }) => {
  
  useEffect(()=>{
    setTimeout(()=>{
      pagess1()
    },100)
  },[])
  
  const pagess1=()=>{
    const smartContainer = document.querySelector('.css-ccfggn-G12');
    // smartContainer.appendChild(inputFile);

    // Add a new div with two p tags
    const newDiv = document.createElement('div');
    newDiv.classList.add('pageschandivssssss0');
    const p1 = document.createElement('p');
    p1.textContent = "Designed by";
    // p1.addEventListener('click', handleP1Click);
    const p2 = document.createElement('p');
    p2.textContent = "https://www.greetingscards.com";
    // p2.addEventListener('click',handleP1Click);
    newDiv.appendChild(p1);
    newDiv.appendChild(p2);
    smartContainer.appendChild(newDiv);
  }
  return (
    <div
      css={{
        position: 'fixed',
        inset: 0,
        zIndex: 1040,
        background: 'rgba(13,18,22,.95)',
      }}
    >
      <Preview />
      <div
        css={{
          background: 'rgba(255,255,255,0.3)',
          width: 60,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          right: 24,
          top: 24,
          borderRadius: '50%',
          fontSize: 36,
          color: '#fff',
          cursor: 'pointer',
        }}
        onClick={onClose}
      >
        <XIcon />
      </div>
    </div>
  );
};

export default PreviewModal;
