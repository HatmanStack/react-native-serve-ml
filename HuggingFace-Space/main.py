from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import json
import requests
import base64
from PIL import Image
from io import BytesIO

app = FastAPI()


@app.get("/api")
async def inference(prompt, steps, guidance, modelID):
    if "dallinmackay" in modelID:
        prompt = "lvngvncnt, " + prompt
    if "nousr" in modelID:
        prompt = "nousr robot, " + prompt
    data = {"inputs":prompt, "options":{"wait_for_model": True, "use_cache": False}}
    API_URL = "https://api-inference.huggingface.co/models/" + modelID
    print(API_URL)
    print(data)

    headers = {"Authorization": f"Bearer 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"}
    api_data = json.dumps(data)
    response = requests.request("POST", API_URL, headers=headers, data=api_data)
    print(response)

    image_stream = BytesIO(response.content)
    image = Image.open(image_stream)
    image.save("response.png")
    with open('response.png', 'rb') as f:
        base64image = base64.b64encode(f.read())
    
    return {"output": base64image}

app.mount("/", StaticFiles(directory="build", html=True), name="build")

@app.get('/')
def homepage() -> FileResponse:
    return FileResponse(path="/app/build/index.html", media_type="text/html")

