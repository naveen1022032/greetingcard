import { ContextMenuItem, LayerSettings, useEditor, useSelectedLayers } from '@lidojs/design-editor';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

const AppLayerSettings = () => {
  const { selectedLayerIds } = useSelectedLayers();
  const [templ, setTempl] = useState(localStorage.getItem("js"))
  const [id, setId] = useState(selectedLayerIds)
  const idLayers = useRef([])
  const [when, setWhenupdate] = useState(false)
  const [show, setShow] = useState(false)
  const prevSelectedLayerIdsRef = useRef([]);
  const getObject = useRef(null)
  const imagesRef = useRef([]);
  const { actions, activePage } = useEditor((state) => ({
    activePage: state.activePage,
  }));
  const { query } = useEditor();

  const [images, setImages] = useState<
    { url: string; type: 'svg' | 'image' }[]
  >([]);




  useEffect(() => {
    // Compare the current and previous selectedLayerIds values
    if (selectedLayerIds.length !== 0 && when === false) {
      if (!arraysEqual(selectedLayerIds, prevSelectedLayerIdsRef.current)) {
        setId(selectedLayerIds);
        idLayers.current = selectedLayerIds
        // console.log(query.serialize(), "ujjjjj", id, idLayers.current);
        if (query.serialize().length != 0) {
          let data = query.serialize()[0].layers
          let newData = data;
          let keyv = idLayers.current[0]
          // console.log("okkkkssawwww", newData[keyv])
          getObject.current = newData[keyv]
          if (newData[keyv].type.resolvedName == "FrameLayer" || newData[keyv].type.resolvedName == "ImageLayer") {
            setShow(true)

            setTimeout(() => {
              appendInputBox()
            }, 1000)

          } else {
            const existingInputBox = document.querySelector('.css-3vvhb7-G12 input[type="file"]');
            if(existingInputBox){
            const element = document.querySelector(".filUploadcheck") as HTMLElement | null;
            element.style.display = "none"
          }
            setShow(false)
          }
          prevSelectedLayerIdsRef.current = selectedLayerIds;
        }

      }
    } else {
      // console.log(selectedLayerIds, "okkssssss");
    }
  }, [selectedLayerIds]);

  // ... rest of your component


  // Utility function to check if two arrays are equal
  function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }


 

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setWhenupdate(true)
    let imageUrl = ""
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
         imageUrl = reader.result as string;
        console.log("okssswe",imageUrl)
        setImages((prevState) => {
          return prevState.concat([
            {
              url: reader.result as string,
              type: file.type === 'image/svg+xml' ? 'svg' : 'image',
            },
          ]);
        });
      };
      
      reader.readAsDataURL(file);
      let data = query.serialize()[0].layers
      if (selectedLayerIds.length != 0 || selectedLayerIds[0] != "ROOT") {
        let valu = {
          "layers": {
            "ROOT": {
              "type": {
                "resolvedName": "RootLayer"
              },
              "props": {
                "color": "rgb(255, 255, 255)",
                "image": null,
                "rotate": 0,
                "boxSize": {
                  "width": 950,
                  "height": 790
                },
                "position": {
                  "x": 0,
                  "y": 0
                }
              },
              "locked": false,
              "child": [
              ],
              "parent": null
            }
          }
        }
        let newData = data;
        let keyv = idLayers.current[0]
        setTimeout(() => {
          setWhenupdate(false)
          newData[keyv].props.image.url = imageUrl;
          newData[keyv].props.image.thumb = imageUrl;
          let gff = { "layers": newData }
          actions.setPage(0, gff);
          actions.setPage(1, valu);
        }, 500)
       
      }

    }
  };


 

  const appendInputBox = () => {
    const existingInputBox = document.querySelector('.css-3vvhb7-G12 input[type="file"]');
    if (!existingInputBox) {
      const inputFile = document.createElement('input');
      inputFile.type = 'file';
      inputFile.accept = 'image/*';
      inputFile.classList.add('filUploadcheck');
      inputFile.addEventListener('change', handleUpload);

      // Append the input box to the "smart-container" class
      const smartContainer = document.querySelector('.css-3vvhb7-G12');
      smartContainer.appendChild(inputFile);
    } else {
      console.log("okkkkk22222")
      const element = document.querySelector(".filUploadcheck") as HTMLElement | null;
      element.style.display = "block"
    }

  };




  return (
    <div
      css={{
        display: 'flex',
        background: 'white',
        borderBottom: '1px solid rgba(57,76,96,.15)',
        height: 50,
        overflowX: 'auto',
        flexShrink: 0,
        '@media (max-width: 900px)': {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#fff',
          display: selectedLayerIds.length > 0 ? 'flex' : 'none',
          justifyContent: 'center',
          zIndex: 20,
          height: 72,
        },
      }}
    >
      <LayerSettings />

    </div>
  );
};

export default AppLayerSettings;
