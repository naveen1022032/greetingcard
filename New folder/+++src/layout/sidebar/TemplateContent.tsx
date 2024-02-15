import XIcon from '@duyank/icons/regular/X';
import { SerializedPage } from '@lidojs/design-core';
import { useEditor } from '@lidojs/design-editor';
import axios from 'axios';
import React, { FC, useState,useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { useAsync } from 'react-use';
import { v4 as uuid } from "uuid";
interface Template {
  img: string;
  elements: SerializedPage;
}

const TemplateContent: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newJ,setNewjson] = useState([])
  const width  = useRef();
  const { actions, activePage } = useEditor((state) => ({
      activePage: state.activePage,
  }));
  useAsync(async () => {
      // const response = await axios.get<Template[]>('/templates');
      const headers = {
          'Content-Type': 'application/json',
          'X-MASTER-KEY': '$2a$10$GdhmRhGHOSNrLf0xo4yrK.T8a8eAGFysLrblplAMRRmx8OzZK7K4y', // replace with your actual secret key
          // Add any other headers you need
        };
      const response20 = await axios.get('https://api.jsonbin.io/v3/b/657fe44d266cfc3fde6a399b',{headers});
      console.log("check",response20.data.record)
      setNewjson(response20.data.record)
      const response2 = await axios.get('/json/file.json');
      console.log("okkkkkkk",response2)
      setTemplates(response2.data);
      setIsLoading(false);

      const response3 = await axios.get('/json/Happy-Thanksgiving-Card.html');
      const parser_DOM = new DOMParser(); 
      const doc = parser_DOM.parseFromString(response3.data, 'text/html');
      const divElements = doc.body.querySelector('div');
      let zinde:any =[];
      const __zinde = fn_element(doc.body,zinde)
      zinde = zinde.sort((a:any, b:any) => a.zindex - b.zindex);
      let layers: any = {};
      let child: string[] = [];
      for (let index = 0; index < zinde.length; index++) {
          const uniqeId = uuid();
          child.push(uniqeId);
          var data_ = setDataInObj(zinde[index].data,zinde[index].bodywidth);
          layers[uniqeId] = data_;
      }
      const ROOT= getRootData(divElements,child);

      layers["ROOT"]=ROOT;
      const temp = [
          {
              "layers": layers
          }
      ]
      console.log(temp);
  }, []);

  
  const addPage = async (data: any) => {
      actions.changePageSize({
          width: data.layers.ROOT.props.boxSize.width,
          height: data.layers.ROOT.props.boxSize.height
      });
      let valu =  {"layers": {
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
    }}
      console.log(0,"checkdata",data)
      console.log(1,"checkdata",data)
      // actions.setPage(activePage, data);
      actions.setPage(0, data);
      actions.setPage(1, valu);
      if (isMobile) {
          onClose();
      }
  };

  function getRootData(div: any, child: any){
      return {
          "type": {
              "resolvedName": "RootLayer"
          },
          "props": {
              "color": div.style.backgroundColor,
              "image": null,
              "rotate": 0,
              "boxSize": {
                  "width": getHeightWidthNumber(div.style.width),
                  "height": getHeightWidthNumber(div.style.height)
              },
              "position": {
                  "x": 0,
                  "y": 0
              }
          },
          "locked": false,
          "child": child,
          "parent": null
      }
  }
  const fn_element = (div:any,zinde:any) =>{
      // div.forEach((element:any,in_:number) => {
          // console.log(div.children);
          const allDive = div.querySelector('div');
          if(div.tagName == 'BODY'){
              width.current = allDive.style.width
          }
          if(allDive?.children.length > 0){
              for (let index = 0; index < allDive.children.length; index++) {
                  const element = allDive.children[index];
                  fn_element(element,zinde)
              }
          }
          else{
              const data ={
                  "id":uuid(),
                  "data": div,
                  "zindex":parseInt(div.style.zIndex? div.style.zIndex : 0) ,
                  "bodywidth":width.current
              }
              zinde.push(data);
          }
          // if(element.style.zIndex){
              
          // }
      // });
      return zinde;
  }

  const setDataInObj = (data:any, bodywidth:any)=> {
      let style_css: any={};
      Object.keys(data.style).forEach(key => {
          if (data.style[key] && (key.match(/^[0-9]+$/) == null)){
              const att ={
                  [key]:data.style[key]
              }
              style_css[key] = data.style[key];
          }
        });
      let Layer = "";
     
      let props :any ={
          "position": {
              "x": getHeightWidthNumber(style_css.left),
              "y": getHeightWidthNumber(style_css.top)
          },
          "boxSize": {
              "width": getHeightWidthNumber(style_css.width),
              "height": getHeightWidthNumber(style_css.height),
              "x": getHeightWidthNumber(style_css.left),
              "y": getHeightWidthNumber(style_css.top)
          },
          "rotate": 0
      }
      for (let index = 0; index < data.children.length; index++) {
          if(data.children[index].nodeName == "img".toLocaleUpperCase()){
              Layer = "ImageLayer"
              props["image"] = {
                  "url": data.children[index].src,
                  "thumb": data.children[index].src,
                  "boxSize": {
                      "width": getHeightWidthNumber(style_css.width),
                      "height": getHeightWidthNumber(style_css.height),
                  },
                  "position": {
                      "x": 0,
                      "y": 0
                  },
                  "rotate": 0
              }
          }
          if(data.children[index].nodeName == "p".toLocaleUpperCase()){
              Layer = "TextLayer"
              props["text"] = data.innerHTML.replaceAll('\n',"").trim()
              props["fonts"]= [
                  {
                      "name": "Oswald",
                      "fonts": [
                          {
                              "style": "Bold",
                              "urls": [
                                  "https://api-gilt-one.vercel.app/assets/liquid-editor/fonts/raw/master/src/fonts/Oswald/Oswald-Bold.woff2"
                              ]
                          },
                          {
                              "urls": [
                                  "https://api-gilt-one.vercel.app/assets/liquid-editor/fonts/raw/master/src/fonts/Oswald/Oswald-Regular.woff2"
                              ]
                          }
                      ]
                  }
              ]
              props["scale"] = 1
              props["colors"] = ["rgb(255, 223, 43)"]
              props["fontSizes"] = [ 100]
            
          }
      }

      let ddd=  {
          "type": {
              "resolvedName": Layer
          },
          "props": props,
          "locked": false,
          "child": [],
          "parent": "ROOT"
      }
      return ddd;
      // console.log("style_css", ddd);
  }

  function getHeightWidthNumber(value: string){
      return parseInt(value.replace("px",""))        
  }

  return (
      <div
          css={{
              width: '100%',
              height: '100%',
              flexDirection: 'column',
              overflowY: 'auto',
              display: 'flex',
          }}
      >
          <div
              css={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  height: 48,
                  borderBottom: '1px solid rgba(57,76,96,.15)',
                  padding: '0 20px',
              }}
          >
              <p
                  css={{
                      lineHeight: '48px',
                      fontWeight: 600,
                      color: '#181C32',
                      flexGrow: 1,
                  }}
              >
                  Templates
              </p>
              <div
                  css={{
                      fontSize: 20,
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                  }}
                  onClick={onClose}
              >
                  <XIcon />
              </div>
          </div>
          <div css={{ flexDirection: 'column', overflowY: 'auto', display: 'flex' }}>
              <div
                  css={{
                      flexGrow: 1,
                      overflowY: 'auto',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
                      gridGap: 8,
                      padding: '16px',
                  }}
              >
                  {/* {isLoading && <div>Loading...</div>} */}
                  <img src={"http://numplateapi.nubiz.co.in/images//cardimage/Happy-Thanksgiving.png"} loading="lazy" onClick={() => addPage(newJ)}/>
                  {templates.map((item, index) => (
                      <div key={index} css={{ cursor: 'pointer' }} onClick={() => addPage(newJ)}>
                          <img src={item.img} loading="lazy" />
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );
};

export default TemplateContent;
