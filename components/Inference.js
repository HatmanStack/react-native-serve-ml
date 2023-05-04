import React, { useState } from 'react';


export default function MyInference({prompt, cs, temp, sp, ss, passImage}) {

  return (
    <div>
      <div whateverPropWillBeInferred={x => {passImage}}></div>
      <div name = {cs}/>
      <div name = {temp}/>
      <div name = {sp}/>
      <div name = {ss}/>
    </div>
  );
};