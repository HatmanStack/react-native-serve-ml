import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View, ScrollView, Text, Pressable} from 'react-native';

import ImageViewerComponent from './components/ImageViewer';
import SliderComponent from './components/Slider';
import PromptInputComponent from './components/PromptInput';
import BreathingComponent from './components/Breathing';
import DropDownComponent from './components/DropDown';
import {useFonts } from 'expo-font'; 

const assetImage = require('./assets/avocado.jpg');

export default function App() {
  useFonts({'Sigmar': require('./assets/Sigmar/Sigmar-Regular.ttf')});
  const [inferredImage, setInferredImage] = useState(assetImage);
  const [steps, setSteps] = useState(45);
  const [guidance, setGuidance] = useState(45);
  const [modelID, setModelID] = useState('stabilityai/stable-diffusion-2-1')
  const [prompt, setPrompt] = useState('Avocado Armchair');
  const [link, setLink] = useState(`api?prompt=${prompt}&steps=${steps}&guidance=${guidance}&modelID=${modelID}`)
  const [activity, setActivity] = useState(false);
  const [returnedPrompt, setReturnedPrompt] = useState('Avocado Armchair');

  const passPromptWrapper = (x) => {setPrompt(x)};
  const passStepsWrapper = (x) => {setSteps(x)};
  const passGuidanceWrapper = (x) => {setGuidance(x)};
  const passModelIDWrapper = (x) => {setModelID(x)};
  
  useEffect(() => {
    if (link != `api?prompt=Avocado Armchair&steps=45&guidance=45&modelID=stabilityai/stable-diffusion-2-1`){
      setActivity(true);
      fetch(link)
    .then(response => {
      console.log(response);
      return response.json(); 
    }).then(holder => {
      setActivity(false);
      setReturnedPrompt(prompt);
      setInferredImage('data:image/png;base64,' + holder.output);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  },[link]);

  return (
      // Main container
      <View style={styles.titlecontainer}>
        <BreathingComponent/>
        <ScrollView scrollY={true} style={{marginTop:50}}> 
      <View style={styles.rowContainer}>
      
        {/* Left column */}
        <View style={styles.columnContainer}>
          <View>
            <PromptInputComponent passPrompt={passPromptWrapper}/>
          </View>
          <View style={styles.rowContainer}>
            <DropDownComponent passModelID={passModelIDWrapper}/>
            {activity ? 
              <ActivityIndicator size="large" color="#B58392" style={styles.activityIndicator}/> :
              <Pressable
                onPress={() => {setLink(`api?prompt=${prompt}&steps=${steps}&guidance=${guidance}&modelID=${modelID}`)}}
                style={({pressed}) => [{backgroundColor: pressed ? '#9DA58D' : '#958DA5',},styles.button]}>
                {({pressed}) => (<Text style={styles.promptText}>{pressed ? 'INFERRED!' : 'Inference'}</Text>)}
              </Pressable>
            }
          </View>
          <View>
            <SliderComponent passSteps={passStepsWrapper} passGuidance={passGuidanceWrapper} />
          </View>
        </View>
        {/* Right column */}
        <View style={styles.columnContainer}> 
          <View style={styles.columnContainer}> 
            <ImageViewerComponent prompt={prompt} PlaceholderImage={inferredImage}/> 
          </View>
          <View style={styles.columnContainer}>    
            <Text style={styles.promptText}>{returnedPrompt}</Text>
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
  rowContainer: {
    flex: 1,
    backgroundColor: '#25292e',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    overflow: 'auto',
    padding: 20
  },
  columnContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  button:{
    fontFamily: 'Sigmar',
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginLeft: 50
  },
  activityIndicator:{
    marginLeft: 50
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