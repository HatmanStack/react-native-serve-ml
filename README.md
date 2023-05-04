# React Native App with Expo and Docker

This repository contains a React Native application that utilizes Expo as a framework and Docker to host a Node application. The app is designed to generate questions based on provided images using the VQGANS-Hourglass model hosted on the Hugging Face model hub.

## Preview

To preview the application, you can visit the hosted version on the Hugging Face Spaces platform at [https://huggingface.co/spaces/Hatman/VQGANS-Hourglass](https://huggingface.co/spaces/Hatman/VQGANS-Hourglass).

## Inference

Inference can be run from component/Inference.js to an exsisting end-point serving a ml application.  The properties are all meant to be placeholders that can be adjusted for specific use cases. 

## Prerequisites

Before running this application locally, ensure that you have the following dependencies installed on your machine:

- Node.js
- npm (Node Package Manager)
- Docker

## Installation

To install and run the application, follow these steps:

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/your-username/your-repo.git
   ```
   
2. Navigate to the project directory:

	```shell
	cd react-serve-ml
	```

3. Install the required dependencies:

	```shell
	npm install
	```
	
4. Build the Docker container:

	```shell
	docker build -t react-serve-ml .
	```
	
## Usage

To run the application, execute the following command:

```shell
docker run -p 3000:3000 your-app
```

## Contributing

Contributions are welcome! If you find any issues with the application or have any improvements in mind, feel free to open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- This application is built with Expo, a powerful framework for building cross-platform mobile applications. Learn more about Expo: [https://expo.io](https://expo.io)

## Contact

If you have any questions or feedback, please don't hesitate to contact the project maintainer:

GitHub: [Hatmanstack](https://github.com/Hatmanstack)