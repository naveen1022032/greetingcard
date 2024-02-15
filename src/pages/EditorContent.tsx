import { DesignFrame, useEditor } from '@lidojs/design-editor';
import React, { useEffect } from 'react';
import { data } from './data';

const EditorContent = () => {
  const { actions } = useEditor();
  useEffect(()=>{
    setTimeout(()=>{
      actions.setScale(0.60);
    },500)
  },[])
  return <DesignFrame data={data} />;
};

export default EditorContent;
