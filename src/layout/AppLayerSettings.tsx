import { ContextMenuItem, LayerSettings, useEditor, useSelectedLayers, } from '@lidojs/design-editor';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { TextEditor } from '@lidojs/design-editor/common/text-editor/interfaces';
import Sidebar from '../layout/Sidebar'
import delte from '../../public/assets/images/delete-button.png'
import min from '../../public/assets/images/minus.png'
import plus from '../../public/assets/images/add.png'
import rotatess from '../../public/assets/images/responsive.png'
import flipss from '../../public/assets/images/flip.png'
import contrastImage from '../../public/assets/images/contrastimage.jpg'
import backwhite from '../../public/assets/images/backwhite.jpg'
import normal from '../../public/assets/images/normalimage.jpg'
import blurImage from '../../public/assets/images/blurImage.jpg'
import filterIcon from  '../../public/assets/images/filter.png'
// import InputRange from 'react-input-range';
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
  const imageUrlss = useRef("")
  const showDelete = useRef(false)
  const rotates = useRef(0)
  const flip = useRef(1)
  const [flipsss,setFlips] = useState(true)
  const [rangeValue, setRangeValue] = useState(0)
  const [filterShow, setFiltershow] = useState(false)
  const [textLayer,setTextlayer] = useState(false)
  const [images, setImages] = useState<
    { url: string; type: 'svg' | 'image' }[]
  >([]);

  useEffect(() => {
    console.log(query, "checkkkkkrrrrrr", state, "sooo", actions)
    //   if(query.serialize().length != 2){
    setTimeout(() => {
      pagess()
      pagess1()
    }, 500)
    // }

  }, [])


  function clickUploadbutton() {

    let val = imageUrlss.current.slice(0, 5)
    if (val == "https") {
      var inputElement = document.getElementsByClassName('filUploadcheck')[0];
      inputElement.click();
      // setTimeout(()=>{
      //   showDelete.current = false
      // },1000)
    } else {
      // showDelete.current = true
    }

  }

  useEffect(() => {
    // Compare the current and previous selectedLayerIds values
    if (selectedLayerIds.length !== 0 && when === false) {
      if (!arraysEqual(selectedLayerIds, prevSelectedLayerIdsRef.current)) {
        setId(selectedLayerIds);
        idLayers.current = selectedLayerIds
        // console.log("ujjjjj", state, actions);
        setTimeout(() => {
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
        }, 500)
        if (query.serialize().length != 0) {
          let data = query.serialize()[0].layers
          let newData = data;
          let keyv = idLayers.current[0]
          console.log("okkkkssawwww", newData[keyv])
          getObject.current = newData[keyv]
          if (newData[selectedLayerIds[0]].type.resolvedName == "FrameLayer" || newData[selectedLayerIds[0]].type.resolvedName == "ImageLayer") {
            // console.log(newData[selectedLayerIds[0]].props.image.url, "newwwwwwwwwwwwwwwwwwww")
            imageUrlss.current = newData[selectedLayerIds[0]].props.image.url
            setShow(true)
            setTimeout(() => {
              appendInputBox()

            }, 1000)

          } else {
            // console.log(actions.setTextEditor, "pwwpwppw")
            // actions.setTextEditor(0,idLayers.current,TextEdit)
            // actions.closeTextEditor()
            // actions.setOpeningEditor(null)
            const existingInputBox = document.querySelector('.css-3vvhb7-G12 input[type="file"]');
            if (existingInputBox) {
              setTimeout(() => {
                const element = document.querySelector(".filUploadcheck") as HTMLElement | null;
                element.style.display = "none"
              }, 1000)
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
    // showDelete.current = false
    let data = query.serialize()[0].layers[arr1[0]].type.resolvedName

    console.log("checkvalue895623147", query)
    if (data == "TextLayer") {
      showValu.current = true
      showDelete.current = false
      setFiltershow(false)
      setTextlayer(true)
    } else if (data == "RootLayer") {
      showValu.current = true
      showDelete.current == false
      setTextlayer(false)
    }
    else {
      showValu.current = true
      showDelete.current == false
      setTextlayer(false)
    }
    if (data == "FrameLayer" || data == "ImageLayer") {

      setShow(true)
      setTimeout(() => {
        appendInputBox()
        let dataskk = query.serialize()[0].layers[arr1[0]].props.image.url
        // console.log(dataskk,"okkkkkkkkkkkkks")       
        if (dataskk.slice(0, 5) != "https" && showDelete.current == false) {
          showDelete.current = true
          showValu.current = false
        }
      }, 1000)
    } else {
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
        // console.log("Image URL:", imageUrl);

        setImages((prevState) => prevState.concat([{ url: imageUrl, type: file.type === 'image/svg+xml' ? 'svg' : 'image' }]));

        const newData = { ...query.serialize()[0].layers };
        const keyv = idLayers.current[0];

        const updatedImage = { ...newData[keyv].props.image, url: imageUrl, thumb: imageUrl };
        const updatedDataKeyv = { ...newData[keyv], props: { ...newData[keyv].props, image: updatedImage } };
        const updatedLayers = { ...newData, [keyv]: updatedDataKeyv };

        actions.setPage(0, { layers: updatedLayers });
        actions.setPage(1, { layers: { ROOT: { type: { resolvedName: "RootLayer" }, props: { color: "rgb(255, 255, 255)", image: null, "scale": 0.6, rotate: 0, boxSize: { width: 950, height: 790 }, position: { x: 0, y: 0 } }, locked: false, child: [], parent: null } } });
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
      clickUploadbutton()
    } else {
      console.log("okkkkk22222")
      const element = document.querySelector(".filUploadcheck") as HTMLElement | null;
      element.style.display = "block"
    }

  };

  const handleP1Click = () => {
    let data = query.serialize()[0].layers
    console.log("okkkkkks12345", data.ROOT.child.length)
    if (data.ROOT.child.length > 10 && query.serialize().length != 1) {
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
    // console.log("okkkkkks12345", query.serialize())
    if (data.ROOT.child.length < 10 && query.serialize().length != 1) {
      actions.movePageUp(1);
      setTimeout(() => {
        actions.setScale(0.60);
        const element = document.querySelector(".pageschandivssssss") as HTMLElement | null;
        element.style.display = "block"
        activePages.current = false
      }, 10);
    }
  };
  const pagess = () => {
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
    p2.addEventListener('click', handleP2Click);
    newDiv.appendChild(p1);
    newDiv.appendChild(p2);
    smartContainer.appendChild(newDiv);
  }

  const pagess1 = () => {
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

  const deletePrev = () => {
    showDelete.current = false
    showValu.current = false
    setFiltershow(false)
    const newData = { ...query.serialize()[0].layers };
    const keyv = idLayers.current[0];

    const updatedImage = { ...newData[keyv].props.image, url: "https://i.ibb.co/dMvmcF2/AddImage.jpg", thumb: "https://i.ibb.co/dMvmcF2/AddImage.jpg" };
    const updatedDataKeyv = { ...newData[keyv], props: { ...newData[keyv].props, image: updatedImage } };
    const updatedLayers = { ...newData, [keyv]: updatedDataKeyv };

    actions.setPage(0, { layers: updatedLayers });
    actions.setPage(1, { layers: { ROOT: { type: { resolvedName: "RootLayer" }, props: { color: "rgb(255, 255, 255)", image: null, "scale": 0.6, rotate: 0, boxSize: { width: 950, height: 790 }, position: { x: 0, y: 0 } }, locked: false, child: [], parent: null } } });

  }

  const rotate = () => {
    let data = query.serialize()[0].layers
    console.log(idLayers.current, "okkkkkkkkkkkkkk", data)
    if (rotates.current == 0) {
      rotates.current = 90
      actions.setProp(0, idLayers.current[0], { rotate: 90 })
    } else if (rotates.current == 90) {
      rotates.current = 180
      actions.setProp(0, idLayers.current[0], { rotate: 180 })
    } else if (rotates.current == 180) {
      rotates.current = 270
      actions.setProp(0, idLayers.current[0], { rotate: 270 })
    } else if (rotates.current == 270) {
      rotates.current = 360
      actions.setProp(0, idLayers.current[0], { rotate: 360 })
    } else if (rotates.current == 360) {
      rotates.current = 0
      actions.setProp(0, idLayers.current[0], { rotate: 0 })
    }
    // actions.setProp(0, idLayers.current[0], { position: { x: 50, y: 50 } });
    // actions.setProp(0, idLayers.current[0], { scale: 1.5 })
  }









  const [thumbPosition, setThumbPosition] = useState(0);

  const startDrag = (e) => {
    e.preventDefault();
    window.addEventListener('mousemove', dragThumb);
    window.addEventListener('mouseup', stopDrag);
  };

  const stopDrag = () => {
    window.removeEventListener('mousemove', dragThumb);
    window.removeEventListener('mouseup', stopDrag);
  };

  const dragThumb = (e) => {
    const sliderRect = rangeSliderRef.current.getBoundingClientRect();
    let position = e.clientX - sliderRect.left;

    // Ensure the thumb stays within the slider bounds
    position = Math.max(0, Math.min(position, sliderRect.width));

    setThumbPosition(position);
  };

  const moveThumb = (e) => {
    const sliderRect = rangeSliderRef.current.getBoundingClientRect();
    const position = e.clientX - sliderRect.left;
    const imageElement = document.querySelector('.css-bobrjd-Fx');

    // Step 2: Retrieve the src attribute
    const src = imageElement.getAttribute('src');
    console.log("plppppppppppp",src)
    if(src.slice(0,5) != "https"){
    setThumbPosition(position);
    // alert(position)
    // console.log(position / 10, "okkkkkk")
    if (position < 20) {
      imageElement.style.transform = 'scale(1)';
    } else if (position > 20 && position < 60) {
      imageElement.style.transform = 'scale(2)';
    } else if (position > 60 && position < 100) {
      imageElement.style.transform = 'scale(3)';
    } else if (position > 100 && position < 150) {
      imageElement.style.transform = 'scale(4)';
    } else if (position > 150 && position < 200) {
      imageElement.style.transform = 'scale(5)';
    } else if (position > 200 && position < 250) {
      imageElement.style.transform = 'scale(6)';
    }
    // if (position < 20) {
    //   actions.setProp(0, idLayers.current[0], { scale: 0.70 })
    // } else if (position > 20 && position < 60) {
    //   actions.setProp(0, idLayers.current[0], { scale: 1 })
    // } else if (position > 60 && position < 100) {
    //   actions.setProp(0, idLayers.current[0], { scale: 3 })
    // } else if (position > 100 && position < 150) {
    //   actions.setProp(0, idLayers.current[0], { scale: 4 })
    // } else if (position > 150 && position < 200) {
    //   actions.setProp(0, idLayers.current[0], { scale: 4.5 })
    // } else if (position > 200 && position < 250) {
    //   actions.setProp(0, idLayers.current[0], { scale: 5.8 })
    // }
  }
  };

  const rangeSliderRef = React.createRef();

  const flips = () => {
    const imageElement = document.querySelector('.css-bobrjd-Fx');

// Step 2: Retrieve the src attribute
const src = imageElement.getAttribute('src');
console.log("plppppppppppp",src)
if(src.slice(0,5) != "https"){
  if(flip.current == -1){
    flip.current = 1
    imageElement.style.transform = 'scaleX(1)';
  }else{
    flip.current = -1
    imageElement.style.transform = 'scaleX(-1)';
  }
  
}
    // if (flip.current == 0) {
    //   flip.current = 180
    //   actions.setProp(0, idLayers.current[0], { rotate: 180 })
    // } else if (flip.current == 180) {
    //   flip.current = 360
    //   actions.setProp(0, idLayers.current[0], { rotate: 360 })
    // } else if (flip.current == 360) {
    //   flip.current = 0
    //   actions.setProp(0, idLayers.current[0], { rotate: 0 })
    // }
  }


  const filter =(val)=>{
    
    const imageElement = document.querySelector('.css-bobrjd-Fx');

// Step 2: Retrieve the src attribute
const src = imageElement.getAttribute('src');
console.log("plppppppppppp",src)
if(src.slice(0,5) != "https"){
  if(val == "Contrast"){
    imageElement.style.filter = 'contrast(200%)';
  }else if(val == "Grayscale"){
    imageElement.style.filter = 'grayscale(100%)';
  }else if(val == "Normal"){
    imageElement.style.filter = 'none';
  }else if(val == "Blur"){
    imageElement.style.filter = 'blur(5px)';
  }
}
  }



  const handleRangeChange = (event) => {
    // Update the state with the new value of the range input
    setRangeValue(event.target.value);
    if (event.target.value < 20) {
      actions.setScale(0.60)
    } else if (event.target.value > 20 && event.target.value < 60) {
      actions.setScale(0.70)
    } else if (event.target.value > 60 && event.target.value < 80) {
      actions.setScale(0.90)
    }else if(event.target.value > 80 && event.target.value < 100){
      actions.setScale(1)
    }
    // Log the value to the console
    console.log("Range value:", event.target.value);
  };



  return (
    <div className='oksdddddsssss'>
      <div className='oksddddd'>

        <Sidebar />
        {
          showDelete.current == true ? (<div>
            <img src={delte} onClick={deletePrev} style={{ cursor: "pointer", width: 30, height: 30, marginTop: 20 }} />
          </div>) : null
        }

        <div style={{ position: 'absolute', top: 30, right: 50, display: 'flex' }}>
          <p className='pageChange' onClick={handleP2Click} style={{ color: activePages.current == false ? "red" : "black" }}>Front Page </p>
          <p className='pageChange' onClick={handleP1Click} style={{ color: activePages.current == true ? "red" : "black" }}> / Inner Page</p>
        </div>
      </div>
      <div
        css={{
          display: 'flex',
          background: 'white',
          borderBottom: '1px solid rgba(57,76,96,.15)',
          visibility: showDelete.current == true || showValu.current == true ? 'visible' : 'hidden',
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
        {
          showDelete.current == false ? textLayer == true ? <LayerSettings />:null : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={min} style={{ width: 20, marginRight: 10, cursor: 'pointer' }} onClick={() => {
                const imageElement = document.querySelector('.css-bobrjd-Fx');

                // Step 2: Retrieve the src attribute
                const src = imageElement.getAttribute('src');
                console.log("plppppppppppp",src)
                if(src.slice(0,5) != "https"){
                if (thumbPosition > 0) {
                  setThumbPosition(thumbPosition - 20);
                  if (thumbPosition < 20) {
                    imageElement.style.transform = 'scale(1)';
                  } else if (thumbPosition > 20 && thumbPosition < 60) {
                    imageElement.style.transform = 'scale(2)';
                  } else if (thumbPosition > 60 && thumbPosition < 100) {
                    imageElement.style.transform = 'scale(3)';
                  } else if (thumbPosition > 100 && thumbPosition < 150) {
                    imageElement.style.transform = 'scale(4)';
                  } else if (thumbPosition > 150 && thumbPosition < 200) {
                    imageElement.style.transform = 'scale(5)';
                  } else if (thumbPosition > 200 && thumbPosition < 250) {
                    imageElement.style.transform = 'scale(6)';
                  }
                }
              }
                // alert(position)
                // console.log(position / 10, "okkkkkk")

              }} />
              <div className="range-container">
                <div
                  className="range-slider"
                  ref={rangeSliderRef}
                  onClick={moveThumb}
                >
                  <div
                    className="range-thumb"
                    style={{ left: `${thumbPosition}px` }}
                    onMouseDown={startDrag}
                  ></div>
                </div>
              </div>
              <img src={plus} style={{ width: 20, marginLeft: 10, cursor: 'pointer' }} onClick={() => {
                 const imageElement = document.querySelector('.css-bobrjd-Fx');

                 // Step 2: Retrieve the src attribute
                 const src = imageElement.getAttribute('src');
                 console.log("plppppppppppp",src)
                 if(src.slice(0,5) != "https"){
                if (thumbPosition < 250) {
                  setThumbPosition(thumbPosition + 30);
                  if (thumbPosition < 20) {
                    imageElement.style.transform = 'scale(1)';
                  } else if (thumbPosition > 20 && thumbPosition < 60) {
                    imageElement.style.transform = 'scale(2)';
                  } else if (thumbPosition > 60 && thumbPosition < 100) {
                    imageElement.style.transform = 'scale(3)';
                  } else if (thumbPosition > 100 && thumbPosition < 150) {
                    imageElement.style.transform = 'scale(4)';
                  } else if (thumbPosition > 150 && thumbPosition < 200) {
                    imageElement.style.transform = 'scale(5)';
                  } else if (thumbPosition > 200 && thumbPosition < 250) {
                    imageElement.style.transform = 'scale(6)';
                  }
                }
              }
                // alert(position)
                // console.log(position / 10, "okkkkkk")

              }} />
              <div style={{display:'flex',marginLeft:20,cursor:'pointer'}} onClick={rotate}>
              <img src={rotatess} style={{ width: 20 }} />
              <button onClick={rotate} style={{ marginLeft: 10 }} >Rotate</button>
              </div>
              <div style={{display:'flex',marginLeft:20,cursor:'pointer'}}>
              <img src={flipss} style={{ width: 20 }} onClick={flips}/>
              <button onClick={flips} style={{ marginLeft: 10 }}>Flip</button>
              </div>

              <div style={{display:'flex',marginLeft:20,cursor:'pointer'}} onClick={()=>setFiltershow(!filterShow)}>
              <img src={filterIcon} style={{ width: 20 }} />
              <button  style={{ marginLeft: 10 }}>filter</button>
              </div>
            </div>)
        }
        {
          filterShow == true ? (<div style={{display:'flex',}} className='filter-section'>
          <div onClick={()=> filter("Contrast")}> 
            <img src={contrastImage} style={{width:50,height:47}}/>
              <p >Contrast</p>
              </div>
              <div onClick={()=> filter("Grayscale")}>
            <img src={backwhite} style={{width:50,height:47,marginLeft:13}}/>
              <p style={{marginLeft:10}}>Grayscale</p>
              </div>
              <div onClick={()=> filter("Normal")}>
            <img src={normal} style={{width:50,height:47,marginLeft:10}}/>
              <p style={{marginLeft:10}}>Normal</p>
              </div>
              <div onClick={()=> filter("Blur")}>
            <img src={blurImage} style={{width:50,height:47,marginLeft:10}}/>
              <p style={{marginLeft:10}}>Blur</p>
              </div>
            </div>):null
        }

      </div>
      {/* <div style={{display:'flex',position: "absolute",top: 477,left: 355,zIndex: 99}}>
      <p>Innerpage</p>
      <p style={{marginLeft:10}}>frontpage</p>
    </div> */}
    <input type='range' min={0} max={100}  value={rangeValue}
        onChange={handleRangeChange} className='resizepage'/>
    </div>
  );
};

export default AppLayerSettings;



