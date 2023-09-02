# React Native App with Expo

This repository contains a React Native application built using Expo as the framework and Docker for deployment. The app is intended to serve as a scaffold for building mobile AI applications. It currently demonstrates a simple runwayml/stable-diffusion-v1-5 diffusion model. The code includes baseline components to facilitate implementing different mL workloads. Expo can build the application for web or mobile with the included backend hostable in a container.

## Preview

To preview the application, you can visit the hosted version on the Hugging Face Spaces platform at [https://huggingface.co/spaces/Hatman/VQGANS-Hourglass](https://huggingface.co/spaces/Hatman/VQGANS-Hourglass).

## Prerequisites

Before running this application locally, ensure that you have the following dependencies installed on your machine:

### Frontend

- Node
- npm (Node Package Manager)
- Expo

### Backend

- Pytorch

## Installation

To install and run the application, follow these steps:

### Frontend
   
   ```shell
   git clone https://github.com/hatmanstack/react-native-serve-ml.git
   cd react-native-serve-ml
   npm install
   npm web run --port 8080
   ```

App running locally at http://localhost:8080

### Backend
   
   ```shell
   cd backend
   pip install -r requirements
   python main.py
   ```

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- This application is built with Expo, a powerful framework for building cross-platform mobile applications. Learn more about Expo: [https://expo.io](https://expo.io)

