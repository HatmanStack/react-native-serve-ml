# React Native App with Expo

This repository contains a React Native application built using Expo as the framework and Docker for deployment. The app is intended to serve as a scaffold for building mobile AI applications. It currently demonstrates a simple runwayml/stable-diffusion-v1-5 diffusion model. The code includes baseline components to facilitate implementing different mL workloads. Expo can build the application for web or mobile with the included backend hostable in a container.

## Preview

To preview the application frontend, you can visit the hosted version on the Hugging Face Spaces platform [here](https://huggingface.co/spaces/Hatman/react-native-serve-ml).

## Prerequisites

Before running this application locally, ensure that you have the following dependencies installed on your machine:

### Frontend

- Node
- npm (Node Package Manager)
- Expo

### Backend

- Pytorch for cpu is installed by default for a cuda install refer to the pytorch [download helper](https://pytorch.org/get-started/locally/)

## Installation

To install and run the application, follow these steps:

### Frontend
   
   ```shell
   git clone https://github.com/hatmanstack/react-native-serve-ml.git
   cd react-native-serve-ml
   npm install
   npm start
   ```

The app is running locally at http://localhost:19006. On Linux, you can replace 'npm start' with 'METRO_PORT=<port> WEB_PORT=<port> npm start' to override the defaults. See [this issue](https://github.com/expo/expo/issues/20629) for more details on modifying the Expo CLI config locally.

For Web builds, use 'npm start -- --port 8080' to start Metro on port 8080, which is useful for building the static content for our app.

### Backend
   
   ```shell
   cd backend
   python -m venv venv

   WINDOWS
   cd venv\scripts
   .\activate

   LINUX | MAC
   cd venv\bin
   source activate

   cd ..\..
   pip install -r requirements.txt
   python main.py
   ```

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- This application is built with Expo, a powerful framework for building cross-platform mobile applications. Learn more about Expo: [https://expo.io](https://expo.io)

