---
title: React Native Serve Ml
emoji: 🔥
colorFrom: red
colorTo: blue
sdk: docker
pinned: false
license: mit
---


# React Native App with Expo

This repository contains a static React Native application built using Expo with FastApi and Docker for deployment. It's a single container that's running [here](https://huggingface.co/spaces/Hatman/react-native-serve-ml).  It's serving several diffusion models that use the huggingface [inference-api](https://huggingface.co/docs/api-inference/index). The code uses baseline components to demonstrate deployment techniques for ML endpoints. 

## Installation

To generate the static content for this container, replace the App.js file in the react-native-serve-ml folder with the App.js file located in this subfolder. 

```shell
npx expo export:web
```

Builds the static files, which will output to a web-build folder in the main directory. Copy that web-build folder to this directory. You can then delete the existing build folder and rename web-build to build. Once that's done, the app can be packaged as a single container for deployment. This version uses the fetch method in React for calling the backend API.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- This application is built with Expo, a powerful framework for building cross-platform mobile applications. Learn more about Expo: [https://expo.io](https://expo.io)

