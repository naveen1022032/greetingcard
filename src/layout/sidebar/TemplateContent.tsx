import XIcon from '@duyank/icons/regular/X';
import { SerializedPage } from '@lidojs/design-core';
import { useEditor } from '@lidojs/design-editor';
import axios from 'axios';
import React, { FC, useState, useRef } from 'react';
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
    const [newJ, setNewjson] = useState([])
    const width = useRef();
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
        const response20 = await axios.get('https://api.jsonbin.io/v3/b/657fe44d266cfc3fde6a399b', { headers });
        console.log("check", response20.data.record)
        // setNewjson(response20.data.record)
        const response2 = await axios.get('/json/file.json');
        // console.log("okkkkkkk", response2)
        setTemplates(response2.data);
        setIsLoading(false);

        const response3 = await axios.get('/json/Happy-Thanksgiving-Card.html');
        const parser_DOM = new DOMParser();
        const doc = parser_DOM.parseFromString(response3.data, 'text/html');
        const divElements = doc.body.querySelector('div');
        let zinde: any = [];
        const __zinde = fn_element(doc.body, zinde)
        zinde = zinde.sort((a: any, b: any) => a.zindex - b.zindex);
        let layers: any = {};
        let child: string[] = [];
        for (let index = 0; index < zinde.length; index++) {
            const uniqeId = uuid();
            child.push(uniqeId);
            var data_ = setDataInObj(zinde[index].data, zinde[index].bodywidth);
            layers[uniqeId] = data_;
        }
        const ROOT = getRootData(divElements, child);

        layers["ROOT"] = ROOT;
        const temp = [
            {
                "layers": layers
            }
        ]
        // console.log(temp);
    }, []);


    const addPage = async (data: any) => {
        actions.changePageSize({
            width: data.layers.ROOT.props.boxSize.width,
            height: data.layers.ROOT.props.boxSize.height
        });
        
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
        console.log(0, "checkdata", data)
        console.log(1, "checkdata", data)
      // actions.setPage(activePage, data);
      let news = {
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
                        "1180e828-8455-4b27-85dd-b65924ef49b7",
                        "b57ff8b9-ea20-4596-8b53-85072c1f20d5",
                        "48b139a8-c191-4599-8028-15fef6a11b12",
                        "7b7cf1cb-4151-421f-808a-1b7456f92c6d",
                        "506fe29d-f89b-4bdb-acb6-8982cb42edd2",
                        "15abdeda-bddd-4852-a8df-5c098d1c2a0f",
                        "259d6161-7404-48fd-8798-fbce7ceb075b",
                        "d92d6e2d-dddd-4bc3-a7c9-0e361c4d21f7",
                        "d87396ce-ca31-4ced-a75f-6aa16217c13a",
                        "03e676b3-6fe9-4d49-a681-9237a3e5d172",
                        "034ef3ba-e8f4-4dec-9386-8e9f422c2335",
                        "1995c300-1fe7-464a-8dd1-ae06f3029a02",
                        "f14790a1-cf58-4d09-9f3c-befde3784137"
                    ],
                    "parent": null
                },
                "1180e828-8455-4b27-85dd-b65924ef49b7": {
                    "type": {
                        "resolvedName": "FrameLayer"
                    },
                    "props": {
                        "clipPath": "M 0 458.6 V 41.4 C 0 18.5 18.5 0 41.4 0 h 806 c 22.9 0 41.4 18.5 41.4 41.4 v 417.1 c 0 22.9 -18.5 41.4 -41.4 41.4 h -806 C 18.6 500 0 481.5 0 458.6 C 0 458.6 0 458.6 0 458.6 Z",
                        "position": {
                            "x": 474.99999999999994,
                            "y": 469.42294713160857
                        },
                        "boxSize": {
                            "width": 587.014,
                            "height": 330.15410573678287,
                            "x": 475,
                            "y": 462.84589426321713
                        },
                        "rotate": 0,
                        "scale": 0.6603082114735658,
                        "image": {
                            "url": "https://i.postimg.cc/GmC7KXk1/cizKhDe.png",
                            "thumb": "https://i.postimg.cc/GmC7KXk1/cizKhDe.png",
                            "boxSize": {
                                "width": 889,
                                "height": 554.5585412667946
                            },
                            "rotate": 0,
                            "position": {
                                "x": 0,
                                "y": -27.279270633397317
                            }
                        }
                    },
                    "locked": false,
                    "child": [],
                    "parent": "ROOT"
                },
                "b57ff8b9-ea20-4596-8b53-85072c1f20d5": {
                    "type": {
                        "resolvedName": "TextLayer"
                    },
                    "props": {
                        "position": {
                            "x": 150,
                            "y": 700
                        },
                        "boxSize": {
                            "width": 200,
                            "height": 30,
                            "x": 150,
                            "y": 700
                        },
                        "rotate": 0,
                        "text": "<p style=\"text-align: center;                      font-size: 20px;                      margin-bottom: 0;                      margin-top: 0;                      color: rgb(81, 44, 42);                      font-family: Oswald;  line-height: 1.4; letter-spacing: 0em;\">Designed by</p>",
                        "fonts": [
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
                        ],
                        "scale": 1,
                        "colors": [
                            "rgb(255, 223, 43)"
                        ],
                        "fontSizes": [
                            100
                        ]
                    },
                    "locked": false,
                    "child": [],
                    "parent": "ROOT"
                },
                "48b139a8-c191-4599-8028-15fef6a11b12": {
                    "type": {
                        "resolvedName": "TextLayer"
                    },
                    "props": {
                        "position": {
                            "x": 150,
                            "y": 730
                        },
                        "boxSize": {
                            "width": 208,
                            "height": 25,
                            "x": 150,
                            "y": 730
                        },
                        "rotate": 0,
                        "text": "<p style=\"text-align: center;                      color: rgb(81, 44, 42);                      margin-bottom: 0;                      margin-top: 0;                      font-family: Oswald;line-height: 1.4; letter-spacing: 0em;\">https://www.greetingscards.com</p>",
                        "fonts": [
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
                        ],
                        "scale": 1,
                        "colors": [
                            "rgb(255, 223, 43)"
                        ],
                        "fontSizes": [
                            100
                        ]
                    },
                    "locked": false,
                    "child": [],
                    "parent": "ROOT"
                },
                "7b7cf1cb-4151-421f-808a-1b7456f92c6d": {
                    "type": {
                        "resolvedName": "ImageLayer"
                    },
                    "props": {
                        "position": {
                            "x": 475,
                            "y": -15
                        },
                        "boxSize": {
                            "width": 475,
                            "height": 678,
                            "x": 475,
                            "y": -15
                        },
                        "rotate": 0,
                        "image": {
                            "url": "https://i.ibb.co/TPcvNGt/background-card-2.png",
                            "thumb": "https://i.ibb.co/TPcvNGt/background-card-2.png",
                            "boxSize": {
                                "width": 475,
                                "height": 678
                            },
                            "position": {
                                "x": 0,
                                "y": 0
                            },
                            "rotate": 0
                        }
                    },
                    "locked": false,
                    "child": [],
                    "parent": "ROOT"
                },
                "506fe29d-f89b-4bdb-acb6-8982cb42edd2": {
                    "type": {
                        "resolvedName": "ImageLayer"
                    },
                    "props": {
                        "position": {
                            "x": 475,
                            "y": 0
                        },
                        "boxSize": {
                            "width": 80,
                            "height": 80,
                            "x": 475,
                            "y": 0
                        },
                        "rotate": 0,
                        "image": {
                            "url": "https://i.ibb.co/nBP7zBZ/Imagethank4.png",
                            "thumb": "https://i.ibb.co/nBP7zBZ/Imagethank4.png",
                            "boxSize": {
                                "width": 80,
                                "height": 80
                            },
                            "position": {
                                "x": 0,
                                "y": 0
                            },
                            "rotate": 0
                        }
                    },
                    "locked": false,
                    "child": [],
                    "parent": "ROOT"
                },
                "15abdeda-bddd-4852-a8df-5c098d1c2a0f": {
                    "type": {
                        "resolvedName": "ImageLayer"
                    },
                    "props": {
                        "position": {
                            "x": 850,
                            "y": 0
                        },
                        "boxSize": {
                            "width": 100,
                            "height": 151,
                            "x": 850,
                            "y": 0
                        },
                        "rotate": 0,
                        "image": {
                            "url": "https://i.ibb.co/Wcp1vsD/Imagethank5.png",
                            "thumb": "https://i.ibb.co/Wcp1vsD/Imagethank5.png",
                            "boxSize": {
                                "width": 100,
                                "height": 151
                            },
                            "position": {
                                "x": 0,
                                "y": 0
                            },
                            "rotate": 0
                        }
                    },
                    "locked": false,
                    "child": [],
                    "parent": "ROOT"
                },
                "259d6161-7404-48fd-8798-fbce7ceb075b": {
                    "type": {
                        "resolvedName": "TextLayer"
                    },
                    "props": {
                        "position": {
                            "x": 550,
                            "y": 300
                        },
                        "boxSize": {
                            "width": 375,
                            "height": 110,
                            "x": 550,
                            "y": 300
                        },
                        "rotate": 0,
                        "text": "<p style=\"color: #512c2a;                      font-style: italic;                      font-size: 18px;line-height: 1.4; letter-spacing: 0em;\">\"Wishing you a Thanksgiving filled with warmth, joy,and cherished moments.             Grateful for your presence in our lives. </p>",
                        "fonts": [
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
                        ],
                        "scale": 1,
                        "colors": [
                            "rgb(255, 223, 43)"
                        ],
                        "fontSizes": [
                            100
                        ]
                    },
                    "locked": false,
                    "child": [],
                    "parent": "ROOT"
                },
                "d92d6e2d-dddd-4bc3-a7c9-0e361c4d21f7": {
                    "type": {
                        "resolvedName": "TextLayer"
                    },
                    "props": {
                        "position": {
                            "x": 550,
                            "y": 400
                        },
                        "boxSize": {
                            "width": 375,
                            "height": 80,
                            "x": 550,
                            "y": 400
                        },
                        "rotate": 0,
                        "text": "<p style=\"color: #512c2a;                      font-style: italic;                      font-size: 18px;line-height: 1.4; letter-spacing: 0em;\">Happy Thanksgiving!\"</p>",
                        "fonts": [
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
                        ],
                        "scale": 1,
                        "colors": [
                            "rgb(255, 223, 43)"
                        ],
                        "fontSizes": [
                            100
                        ]
                    },
                    "locked": false,
                    "child": [],
                    "parent": "ROOT"
                },
                "d87396ce-ca31-4ced-a75f-6aa16217c13a": {
                    "type": {
                        "resolvedName": "ImageLayer"
                    },
                    "props": {
                        "position": {
                            "x": 900,
                            "y": 403
                        },
                        "boxSize": {
                            "width": 50,
                            "height": 92,
                            "x": 900,
                            "y": 403
                        },
                        "rotate": 0,
                        "image": {
                            "url": "https://i.ibb.co/7rV8pDF/Imagethank1.png",
                            "thumb": "https://i.ibb.co/7rV8pDF/Imagethank1.png",
                            "boxSize": {
                                "width": 50,
                                "height": 92
                            },
                            "position": {
                                "x": 0,
                                "y": 0
                            },
                            "rotate": 0
                        }
                    },
                    "locked": false,
                    "child": [],
                    "parent": "ROOT"
                },
                "03e676b3-6fe9-4d49-a681-9237a3e5d172": {
                    "type": {
                        "resolvedName": "ImageLayer"
                    },
                    "props": {
                        "position": {
                            "x": 475,
                            "y": 553
                        },
                        "boxSize": {
                            "width": 60,
                            "height": 127,
                            "x": 475,
                            "y": 553
                        },
                        "rotate": 0,
                        "image": {
                            "url": "https://i.ibb.co/QFMx0LB/Imagethank3.png",
                            "thumb": "https://i.ibb.co/QFMx0LB/Imagethank3.png",
                            "boxSize": {
                                "width": 60,
                                "height": 127
                            },
                            "position": {
                                "x": 0,
                                "y": 0
                            },
                            "rotate": 0
                        }
                    },
                    "locked": false,
                    "child": [],
                    "parent": "ROOT"
                },
                "034ef3ba-e8f4-4dec-9386-8e9f422c2335": {
                    "type": {
                        "resolvedName": "TextLayer"
                    },
                    "props": {
                        "position": {
                            "x": 550,
                            "y": 70
                        },
                        "boxSize": {
                            "width": 237,
                            "height": 68,
                            "x": 550,
                            "y": 70
                        },
                        "rotate": 0,
                        "text": "<p style=\"                      font-size: 60px;                      color: rgb(162,155,77);                      margin-bottom: 0;                      margin-top: 0;                      font-weight: 500;                      font-style: italic;  line-height: 1.4; letter-spacing: 0em;                      \">Happy</p>",
                        "fonts": [
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
                        ],
                        "scale": 1,
                        "colors": [
                            "rgb(255, 223, 43)"
                        ],
                        "fontSizes": [
                            100
                        ]
                    },
                    "locked": false,
                    "child": [],
                    "parent": "ROOT"
                },
                "1995c300-1fe7-464a-8dd1-ae06f3029a02": {
                    "type": {
                        "resolvedName": "TextLayer"
                    },
                    "props": {
                        "position": {
                            "x": 550,
                            "y": 130
                        },
                        "boxSize": {
                            "width": 278,
                            "height": 68,
                            "x": 550,
                            "y": 130
                        },
                        "rotate": 0,
                        "text": "<p style=\"font-size: 80px; color: rgb(232,108,106); margin-bottom: 0; font-style: italic;  margin-top: 0; line-height: 1.4; letter-spacing: 0em;\">             Thanks</p>",
                        "fonts": [
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
                        ],
                        "scale": 1,
                        "colors": [
                            "rgb(255, 223, 43)"
                        ],
                        "fontSizes": [
                            100
                        ]
                    },
                    "locked": false,
                    "child": [],
                    "parent": "ROOT"
                },
                "f14790a1-cf58-4d09-9f3c-befde3784137": {
                    "type": {
                        "resolvedName": "TextLayer"
                    },
                    "props": {
                        "position": {
                            "x": 550,
                            "y": 200
                        },
                        "boxSize": {
                            "width": 237,
                            "height": 68,
                            "x": 550,
                            "y": 200
                        },
                        "rotate": 0,
                        "text": "<p style=\"font-size: 80px; color: rgb(232,108,106); margin-bottom: 0; font-style: italic;margin-top: 0; line-height: 1.4; letter-spacing: 0em;\">          Giving</p>",
                        "fonts": [
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
                        ],
                        "scale": 1,
                        "colors": [
                            "rgb(255, 223, 43)"
                        ],
                        "fontSizes": [
                            100
                        ]
                    },
                    "locked": false,
                    "child": [],
                    "parent": "ROOT"
                }
            }
        }
        // localStorage.setItem("js",JSON.stringify(data))
        actions.setPage(0, data);
        actions.setPage(1, valu);
        setTimeout(()=>{
            actions.setScale(0.60)
            const element = document.querySelector(".css-u54x7d-G12 > .css-85dqxi-G12");
      
            // Check if the element is found before clicking
            if (element) {
            //   element.click();
              actions.setScale(0.60)
            } else {
              console.error("Element not found");
            }
        },500)
        if (isMobile) {
            onClose();
        }
    };

    function getRootData(div: any, child: any) {
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
    const fn_element = (div: any, zinde: any) => {
        // div.forEach((element:any,in_:number) => {
        // console.log(div.children);
        const allDive = div.querySelector('div');
        if (div.tagName == 'BODY') {
            width.current = allDive.style.width
        }
        if (allDive?.children.length > 0) {
            for (let index = 0; index < allDive.children.length; index++) {
                const element = allDive.children[index];
                fn_element(element, zinde)
            }
        }
        else {
            const data = {
                "id": uuid(),
                "data": div,
                "zindex": parseInt(div.style.zIndex ? div.style.zIndex : 0),
                "bodywidth": width.current
            }
            zinde.push(data);
        }
        // if(element.style.zIndex){

        // }
        // });
        return zinde;
    }

    const setDataInObj = (data: any, bodywidth: any) => {
        let style_css: any = {};
        Object.keys(data.style).forEach(key => {
            if (data.style[key] && (key.match(/^[0-9]+$/) == null)) {
                const att = {
                    [key]: data.style[key]
                }
                style_css[key] = data.style[key];
            }
        });
        let Layer = "";

        let props: any = {
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
            if (data.children[index].nodeName == "img".toLocaleUpperCase()) {
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
            if (data.children[index].nodeName == "p".toLocaleUpperCase()) {
                Layer = "TextLayer"
                props["text"] = data.innerHTML.replaceAll('\n', "").trim()
                props["fonts"] = [
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
                props["fontSizes"] = [100]

            }
        }

        let ddd = {
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

    function getHeightWidthNumber(value: string) {
        return parseInt(value.replace("px", ""))
    }

   return  (
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
                    <img src={"http://numplateapi.nubiz.co.in/images//cardimage/Happy-Thanksgiving.png"} loading="lazy" onClick={() => addPage(newJ)} />
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
