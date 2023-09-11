import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, Text} from 'react-native';
import axios from "axios";

import ImageViewer from './components/ImageViewer';
import MySlider from './components/Slider';
import PromptInput from './components/PromptInput';
import Breathing from './components/breathing';
import {useFonts } from 'expo-font'; 

const assetImage = require('./assets/avocado.jpg');

export default function App() {
  const [inferredImage, setInferredImage] = useState(assetImage);
  const [fontsLoaded] = useFonts({'Sigmar': require('./assets/Sigmar/Sigmar-Regular.ttf')});
  const [steps, setSteps] = useState(1);
  const [guidance, setGuidance] = useState(5);
  const [prompt, setPrompt] = useState('Avocado Armchair');

  const passPromptWrapper = (x) => {setPrompt(x)};
  const passStepsWrapper = (x) => {setSteps(x)};
  const passGuidanceWrapper = (x) => {setGuidance(x)};
  
  
  useEffect(() => {
    if (prompt != 'Avocado Armchair'){
      axios.post("http://localhost:8081/", {
      // Create Body to send to our backend
      prompt: prompt,
      steps: steps,
      guidance: guidance
    })
    .then(function (response) {
        setInferredImage('data:image/png;base64,' + response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  },[prompt]);
  
  
  
  return (
      // Main container
      <View style={styles.titlecontainer}>
        <Breathing/>
        <ScrollView scrollY={true} style={{marginTop:50}}> 
      <View style={styles.container}>
      
        {/* Left column */}
        <View style={styles.columnContainer}>
          <View>
            <PromptInput passPrompt={passPromptWrapper}/>
          </View>
          <View>
            <MySlider passSteps={passStepsWrapper} passGuidance={passGuidanceWrapper}/>
          </View>
        </View>
        {/* Right column */}
        <View style={styles.columnContainer}> 
          <View style={styles.columnContainer}> 
            <ImageViewer prompt={prompt} PlaceholderImage={inferredImage}/> 
          </View>
          <View style={styles.columnContainer}>    
            <Text style={styles.promptText}>{prompt}</Text>
          </View>
        </View>
      
    {/* Component for inference */}
      </View>
      </ScrollView>
    <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  titlecontainer: {
    backgroundColor: '#25292e',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,  
    padding: 50
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    overflow: 'auto'
  },
  columnContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  promptText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'italic',
    textAlign: 'center',
    wordWrap: 'break-word',
    fontFamily: 'Sigmar',
    letterSpacing: 2,
    lineHeight: 30
  }
});

registerRootComponent(App);