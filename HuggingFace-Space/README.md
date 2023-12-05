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

This repository contains a static React Native application built using Expo with FastApi and Docker for deployment. It's a single container that's running [here](https://huggingface.co/spaces/Hatman/react-native-serve-ml).  It's serving several diffusion models that use the huggingface [inference-api](https://huggingface.co/docs/api-inference/index). The code uses baseline components to demonstrate deployment techniques for ML endpoints. The root repository and alternative deployments are [here](https://github.com/HatmanStack/react-native-serve-ml). A blog post explaining this deployment and the HuggingFace Inference API can be found [here](https://medium.com/@HatmanStack/cloud-bound-hugging-face-spaces-1101c569690d).

## Installation

To generate the static content for this container have a working Node/npm installation and clone this [github repo](https://github.com/HatmanStack/react-native-serve-ml). In your huggingface space Settings add your HF_TOKEN variable as a secret.

```shell
npm install -g yarn
yarn
npx expo export:web
```

Static files are output to the web-build folder in the root directory. Replace the web-build folder in the Huggingface-Space directory with the web-build folder in the root directory. Once that's done, the static content of the app will be updated. The Huggingface-Space directory can be deployed as a single container.<b>In a single container to reach the endpoint from the axios call use "http://localhost:<port>/api" not "http://localhost:8081/api".</b>

## License

This project is licensed under the [MIT License](LICENSE)

## Acknowledgments

- This application is built with Expo, a powerful framework for building cross-platform mobile applications. Learn more about Expo: [https://expo.io](https://expo.io)

