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

This repository contains a React Native application built using Expo as the framework and Docker for deployment. The app is intended to serve as a scaffold for building mobile AI applications. It currently demonstrates a simple runwayml/stable-diffusion-v1-5 diffusion model. The code includes baseline components to facilitate implementing different mL workloads. Expo can build the application for web or mobile with the included backend hostable in a container.

## Installation

To generate the static content for this container, replace the App.js file in the react-native-serve-ml folder with the App.js file located in this subfolder. 

```shell
npx expo export:web
```

Builds the static files, which will output to a web-build folder in the main directory. Copy that web-build folder to this directory. You can then delete the existing build folder and rename web-build to build. Once that's done, the app can be packaged as a single container for deployment.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- This application is built with Expo, a powerful framework for building cross-platform mobile applications. Learn more about Expo: [https://expo.io](https://expo.io)

