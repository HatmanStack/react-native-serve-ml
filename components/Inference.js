import React, { useState, child_process } from 'react';

export default function MyInference({prompt, cs, temp, sp, ss, passImage}) {

//const mobilenet = require('@tensorflow-models/mobilenet');

//const img = document.getElementById('img');

// Load the model.
//const model = await mobilenet.load();

// Classify the image.
//const predictions = await model.classify(img);

//console.log('Predictions: ');
//console.log(predictions);

  return (
    <div>
      <div tobackend={x => {passImage}}></div>
      <div name = {cs}/>
      <div name = {temp}/>
      <div name = {sp}/>
      <div name = {ss}/>
      
    </div>
  );
};