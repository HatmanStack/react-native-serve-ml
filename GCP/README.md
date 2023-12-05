# React Native App with Expo

This repository contains a static React Native application built using Expo with FastApi and Docker for deployment. It's a single container that's running [here](https://huggingface.co/spaces/Hatman/react-native-serve-ml).  It's serving several diffusion models that use the huggingface [inference-api](https://huggingface.co/docs/api-inference/index). The code uses baseline components to demonstrate deployment techniques for ML endpoints. The root repository and alternative deployments are [here](https://github.com/HatmanStack/react-native-serve-ml). A blog post explaining this deployment and Google Cloud Run can be found [here]() ***Coming Soon***.

## Installation

To generate the content for this container have a working Node/npm installation and clone this [github repo](https://github.com/HatmanStack/react-native-serve-ml). 

```shell
npm install -g yarn
yarn
npx expo export:web
```

You can build an Android or IOS version of the app by using Expo EAS and then updating the backend with the url of the container deployed with this architecture to Google Cloud Run. To reach the endpoint from the axios call use "http://<container url>:<port>/api" not "http://localhost:8081/api".</b>

## Deployment

***Under Construction***
To deploy to cloud run have a working gcloud installation have run all the models that you'd like to include locally. Then link your .cache directory to the TRANSFORMERS_CACHE variable located in the Dockerfile and update the url of your Android or IOS app with Expo EAS updates to reach the backend.

## License

This project is licensed under the [MIT License](LICENSE)

## Acknowledgments

- This application is built with Expo, a powerful framework for building cross-platform mobile applications. Learn more about Expo: [https://expo.io](https://expo.io)
