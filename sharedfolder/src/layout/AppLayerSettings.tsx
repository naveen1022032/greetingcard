import { ContextMenuItem, LayerSettings, useEditor, useSelectedLayers, } from '@lidojs/design-editor';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { TextEditor } from '@lidojs/design-editor/common/text-editor/interfaces';
import Sidebar from '../layout/Sidebar'

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
  const showValu = useRef(false)
  const { actions, activePage } = useEditor((state) => ({
    activePage: state.activePage,
  }));
  const { query } = useEditor();
  const { state } = useEditor();
  const activePages = useRef(false)

  const [images, setImages] = useState<
    { url: string; type: 'svg' | 'image' }[]
  >([]);

useEffect(()=>{
console.log(query,"checkkkkkrrrrrr",state,"sooo",actions)
//   if(query.serialize().length != 2){
    setTimeout(()=>{
      pagess()
      pagess1()
    },500)
  // }
 
},[])

  useEffect(() => {
    // Compare the current and previous selectedLayerIds values
    if (selectedLayerIds.length !== 0 && when === false) {
      if (!arraysEqual(selectedLayerIds, prevSelectedLayerIdsRef.current)) {
        setId(selectedLayerIds);
        idLayers.current = selectedLayerIds
        console.log("ujjjjj",state,actions);
        setTimeout(()=>{
          const element = document.querySelector(".css-u54x7d-G12 > .css-85dqxi-G12");
    
          // Check if the element is found before clicking
          if (element) {
            // element.click();
            // actions.movePageUp(1)
            // setTimeout(()=>{
            //   actions.setScale(0.30)
            // },500)
           
            
          } else {
            console.error("Element not found");
          }
      },500)
        if (query.serialize().length != 0) {
          let data = query.serialize()[0].layers
          let newData = data;
          let keyv = idLayers.current[0]
          // console.log("okkkkssawwww", newData[keyv])
          getObject.current = newData[keyv]
          if (newData[selectedLayerIds[0]].type.resolvedName == "FrameLayer" || newData[selectedLayerIds[0]].type.resolvedName == "ImageLayer") {
            setShow(true)
            setTimeout(() => {
              appendInputBox()
              handleUpload()
            }, 1000)

          } else {
            console.log(actions.setTextEditor,"pwwpwppw")
            // actions.setTextEditor(0,idLayers.current,TextEdit)
            // actions.closeTextEditor()
            // actions.setOpeningEditor(null)
            const existingInputBox = document.querySelector('.css-3vvhb7-G12 input[type="file"]');
            
            if(existingInputBox){
             
              setTimeout(()=>{
                const element = document.querySelector(".filUploadcheck") as HTMLElement | null;
                element.style.display = "none"
              },1000)
              return;
           
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
    let data = query.serialize()[0].layers[arr1[0]].type.resolvedName
    console.log("checkvalue",data)
    if(data == "TextLayer"){
      showValu.current = true
    }else{
      showValu.current = false
    }
    if(data == "FrameLayer" || data == "ImageLayer"){
      setShow(true)
            setTimeout(() => {
              appendInputBox()
            }, 1000)

    }else{
      return JSON.stringify(arr1) === JSON.stringify(arr2);
    }
  }


 

  // const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
  //   setWhenupdate(true)
  //   let imageUrl = ""
  //   const file = e.target.files && e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //        imageUrl = reader.result as string;
  //       console.log("okssswe",imageUrl)
  //       setImages((prevState) => {
  //         return prevState.concat([
  //           {
  //             url: reader.result as string,
  //             type: file.type === 'image/svg+xml' ? 'svg' : 'image',
  //           },
  //         ]);
  //       });
  //     };
      
  //     reader.readAsDataURL(file);
  //     let data = query.serialize()[0].layers
  //     if (selectedLayerIds.length != 0 || selectedLayerIds[0] != "ROOT") {
  //       let valu = {
  //         "layers": {
  //           "ROOT": {
  //             "type": {
  //               "resolvedName": "RootLayer"
  //             },
  //             "props": {
  //               "color": "rgb(255, 255, 255)",
  //               "image": null,
  //               "rotate": 0,
  //               "boxSize": {
  //                 "width": 950,
  //                 "height": 790
  //               },
  //               "position": {
  //                 "x": 0,
  //                 "y": 0
  //               }
  //             },
  //             "locked": false,
  //             "child": [
  //             ],
  //             "parent": null
  //           }
  //         }
  //       }
  //       let newData = data;
  //       let keyv = idLayers.current[0]
  //       setTimeout(() => {
          
  //         setWhenupdate(false)
  //         // console.log(newData[keyv].props.image,"checkkkkkkddd")
  //         // newData[keyv].props.image.url = imageUrl;
  //         // console.log(newData[keyv].props.image,"checkkkkkkddd12222")
  //         // newData[keyv].props.image.thumb = imageUrl;
  //         const updatedImage = {
  //           ...newData[keyv].props.image,
  //           url: imageUrl,
  //           thumb: imageUrl
  //         };
          
  //         // Create a new newData[keyv] object with the updated image
  //         const updatedDataKeyv = {
  //           ...newData[keyv],
  //           props: {
  //             ...newData[keyv].props,
  //             image: updatedImage
  //           }
  //         };
          
  //         // Create a new layers object with the updated newData[keyv]
  //         const updatedLayers = {
  //           ...newData,
  //           [keyv]: updatedDataKeyv
  //         };
          

  //         let gff = { "layers": newData }
          
  //         actions.setPage(0, gff);
  //         actions.setPage(1, valu);
  //       }, 1000)
       
  //     }

  //   }
  // };



  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setWhenupdate(true);
  
    const file = e.target.files && e.target.files[0];
  
    if (file && selectedLayerIds.length !== 0 && selectedLayerIds[0] !== "ROOT") {
      try {
        const imageUrl = await readFileAsDataURL(file);
        console.log("Image URL:", imageUrl);
  
        setImages((prevState) => prevState.concat([{ url: imageUrl, type: file.type === 'image/svg+xml' ? 'svg' : 'image' }]));
  
        const newData = { ...query.serialize()[0].layers };
        const keyv = idLayers.current[0];
  
        const updatedImage = { ...newData[keyv].props.image, url: imageUrl, thumb: imageUrl };
        const updatedDataKeyv = { ...newData[keyv], props: { ...newData[keyv].props, image: updatedImage } };
        const updatedLayers = { ...newData, [keyv]: updatedDataKeyv };
  
        actions.setPage(0, { layers: updatedLayers });
        actions.setPage(1, { layers: { ROOT: { type: { resolvedName: "RootLayer" }, props: { color: "rgb(255, 255, 255)", image: null,"scale": 0.6, rotate: 0, boxSize: { width: 950, height: 790 }, position: { x: 0, y: 0 } }, locked: false, child: [], parent: null } } });
      } catch (error) {
        console.error("Error reading file:", error);
      } finally {
        setWhenupdate(false);
      }
    }
  };
  
  const readFileAsDataURL = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
  
    reader.onloadend = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error("Failed to read file as Data URL."));
    reader.readAsDataURL(file);
  });
 

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

  const handleP1Click = () => {
    let data = query.serialize()[0].layers
    console.log("okkkkkks12345",data.ROOT.child.length)
    if(data.ROOT.child.length > 10 && query.serialize().length != 1){
      actions.movePageUp(1);
      setTimeout(() => {
        actions.setScale(0.60);
        const element = document.querySelector(".pageschandivssssss") as HTMLElement | null;
                element.style.display = "none"
                activePages.current = true
      }, 10);
    }
    // Add the specific actions for p1 here
   
  };

  const handleP2Click = () => {
    // Add the specific actions for p1 here
    let data = query.serialize()[0].layers
    console.log("okkkkkks12345",query.serialize())
    if(data.ROOT.child.length < 10 && query.serialize().length != 1){
      actions.movePageUp(1);
      setTimeout(() => {
        actions.setScale(0.60);
        const element = document.querySelector(".pageschandivssssss") as HTMLElement | null;
        element.style.display = "block"
        activePages.current = false
      }, 10);
    }
  };
  const pagess=()=>{
    const smartContainer = document.querySelector('.css-1circcy-G12 >div:nth-child(1)>div');
    // smartContainer.appendChild(inputFile);

    // Add a new div with two p tags
    const newDiv = document.createElement('div');
    newDiv.classList.add('pageschandiv');
    const p1 = document.createElement('p');
    p1.textContent = 'innerpage';
    p1.addEventListener('click', handleP1Click);
    const p2 = document.createElement('p');
    p2.textContent = 'frontpage';
    p2.addEventListener('click',handleP2Click);
    newDiv.appendChild(p1);
    newDiv.appendChild(p2);
    smartContainer.appendChild(newDiv);
  }

  const pagess1=()=>{
    const smartContainer = document.querySelector('.css-1circcy-G12');
    // smartContainer.appendChild(inputFile);

    // Add a new div with two p tags
    const newDiv = document.createElement('div');
    newDiv.classList.add('pageschandivssssss');
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
    <div>
      <div className='oksddddd'>
       
      <Sidebar/>
      <div style={{position:'absolute',top:30,right:50,display:'flex'}}>
      <p className='pageChange' onClick={handleP2Click} style={{color:activePages.current == false ? "red":"black"}}>Front Page </p>
      <p className='pageChange' onClick={handleP1Click} style={{color:activePages.current == true ? "red":"black"}}> / Inner Page</p>
      </div>
      </div>
    <div
      css={{
        display: 'flex',
        background: 'white',
        borderBottom: '1px solid rgba(57,76,96,.15)',
        visibility:showValu.current == true ? 'visible':'hidden',
        // height: 50,
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
          // height: 72,
        },
      }}
    >
      <LayerSettings />
     
    </div>
    {/* <div style={{display:'flex',position: "absolute",top: 477,left: 355,zIndex: 99}}>
      <p>Innerpage</p>
      <p style={{marginLeft:10}}>frontpage</p>
    </div> */}
    </div>
  );
};

export default AppLayerSettings;



