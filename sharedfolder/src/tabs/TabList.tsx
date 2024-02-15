import { useEditor } from '@lidojs/design-editor';
import React, { FC, ReactNode, useRef, useState } from 'react';

import { addAHeading } from 'src/constant/text-effects';
interface SidebarTabProps {
  tabs: {
    name: string;
    icon: ReactNode;
  }[];
  active: string | null;
  onChange: (e: React.MouseEvent, tab: string) => void;
}

const SidebarTab: FC<SidebarTabProps> = ({ tabs, active, onChange }) => {
  const { actions } = useEditor();
  const activeIdx = tabs.findIndex((tab) => tab.name === active);
  const inputFileRefs = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<
  { url: string; type: 'svg' | 'image' }[]
>([]);


  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
   
  
    const file = e.target.files && e.target.files[0];
  
   
      try {
        const imageUrl = await readFileAsDataURL(file);
        console.log("Image URL:", imageUrl);
  
        setImages((prevState) => prevState.concat([{ url: imageUrl, type: file.type === 'image/svg+xml' ? 'svg' : 'image' }]));
        actions.addImageLayer(
          { url:imageUrl, thumb: imageUrl },
          { width: 300, height: 300 }
        );
      } catch (error) {
        console.error("Error reading file:", error);
      } finally {
       console.log("pk")
      }
  };
  
  const readFileAsDataURL = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
  
    reader.onloadend = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error("Failed to read file as Data URL."));
    reader.readAsDataURL(file);
  });





  return (
    <div
      css={{
        color: '#5E6278',
        borderRight: '1px solid rgba(217, 219, 228, 0.6)',
        '@media (max-width: 900px)': {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#fff',
          display: 'flex',
          justifyContent: 'center',
        },
      }}
    >
      <div
        css={{
          overflow: 'hidden',
          position: 'relative',
          '@media (max-width: 900px)': {
            display: 'flex',
          },
        }}
      >
        {activeIdx >= 0 && (
          <div
            css={{
              background: '#fff',
              width: 72,
              height: 72,
              position: 'absolute',
              left: 0,
              top: 0,
              transform: `translateY(${activeIdx * 100}%)`,
              '@media (max-width: 900px)': {
                display: 'none',
              },
            }}
          >
            <div
              css={{
                position: 'absolute',
                height: 8,
                width: 8,
                right: 0,
                top: -8,
                background:
                  'radial-gradient(circle closest-side,transparent 0,transparent 50%,#fff 0) 200% 200% /400% 400%',
              }}
            />
            <div
              css={{
                position: 'absolute',
                height: 8,
                width: 8,
                right: 0,
                bottom: -8,
                transform: 'scaleY(-1)',
                background:
                  'radial-gradient(circle closest-side,transparent 0,transparent 50%,#fff 0) 200% 200% /400% 400%',
              }}
            />
          </div>
        )}
        {tabs.map((tab, idx) => {
          // console.log(tab.name,"okddd")
          if(tab.name != "Frame" && tab.name != "Video" && tab.name != "Image" && tab.name != "Shape"){
            return(
              <div
              key={idx}
              css={{
                color: idx === activeIdx ? '#009ef7' : undefined,
                borderBottomRightRadius: idx === activeIdx - 1 ? 8 : 0,
                borderTopRightRadius: idx === activeIdx + 1 ? 8 : 0,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 2px',
                height: 72,
                width: 72,
                cursor: 'pointer',
                ':hover': {
                  color: '#009ef7',
                },
              }}
              onClick={(e) => {
                if(tab.name == "Text"){
                  actions.addLayerTree(addAHeading)
                }else if(tab.name == "Upload"){
                  inputFileRefs.current?.click()
                }
                else{
                  onChange(e, tab.name)
                }
                
              }}
            >
              <div css={{ fontSize: 24 }}>{tab.icon}</div>
              <span css={{ fontSize: 10, lineHeight: 1.6, fontWeight: 600 }}>
                {tab.name}
              </span>
            </div>
            )
          }
          
        })}
      </div>
      <input
        ref={inputFileRefs}
        accept="image/*"
        css={{ display: 'none' }}
        type={'file'}
        onChange={handleUpload}
      />
    </div>
  );
};

export default SidebarTab;
