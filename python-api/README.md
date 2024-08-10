# DLLMPythonAPI
A simple API for interacting with LLM models (Llama or Mistral).

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install the necessary packages.

```bash
pip install -r requirements.txt

```

## Running locally

To start the python API server, just type the following in the terminal:

```bash
python3 main.py

```

## Running with Docker

To run the Python API server using Docker, follow these steps:

1. Make sure you have Docker installed on your machine. If not, you can download and install it from the [official Docker website](https://www.docker.com/get-started).

2. Build the Docker image by running the following command in the terminal:

```bash
docker build -t llm-api .
```

3. Once the image is built, you can start the Docker container using the following command:

```bash
docker run -p 8000:8000 llm-api
```

This will start the Python API server inside a Docker container and map port 8000 on your local machine to port 8000 inside the container.

4. You can now access the API by opening your web browser and navigating to `http://localhost:8000`.







