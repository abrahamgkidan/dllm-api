import os
import json
from dotenv import load_dotenv
from mistralai import Mistral
from llamaai import LlamaAPI
from flask import Flask, jsonify, request

load_dotenv()

# Create the client for the models
mistral_api_key = os.environ["MISTRAL_API_KEY"]
mistral_client = Mistral(api_key=mistral_api_key)

llama_api_key = os.environ["LLAMA_API_KEY"]
llama_client = LlamaAPI(llama_api_key)

def query_mistral(messages):
    print(messages)
    chat_response = mistral_client.chat.complete(
        model= "mistral-large-latest",
        messages = messages
    )
    return chat_response.choices[0].message.content

#
# Runs   
# 
def query_llama(messages):
    request_json = { "messages": messages }
    print(request_json)
    response = llama_client.run(request_json)
    return json.dumps(response.json(), indent=2)

def query_model(model, messages):
    query_response = ""
    if model == "mistral":
        query_response = query_mistral(messages)
    elif model == "llama":
        query_response = query_llama(messages) 
    else:
        query_response = "Invalid model name"
    print("You: \n" + messages[0]['content'])
    print(query_response)
    return query_response

# Create the Flask app
app = Flask(__name__)

# Fask cors middleware
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Create the default route
@app.route('/', methods=['GET'])
def get_index():
 return jsonify({ "message": "Welcome to the LLM API!" })

# Create the chat route
@app.route('/chat', methods=['POST'])
def chat():
 print(request.data)
 data = json.loads(request.data)
 print(type(data))
 response = query_model(data["model"], data["messages"])
 return jsonify(response)

if __name__ == '__main__':
   app.run(host='0.0.0.0', port=8000)