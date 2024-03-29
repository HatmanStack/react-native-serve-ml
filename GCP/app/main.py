import torch
import base64
import os
from PIL import Image
from io import BytesIO
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi import Request
from diffusers import StableDiffusionPipeline

origins = ["*"]

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*']
    )
]

app = FastAPI(middleware=middleware)

class Item(BaseModel):
    prompt: str
    steps: int
    guidance: float
    modelID: str

@app.post("/api")
async def inference(item: Item, request: Request):
    print(dict(request.headers))
    
    if "dallinmackay" in item.modelID:
        prompt = "lvngvncnt, " + item.prompt
    if "nousr" in item.modelID:
        prompt = "nousr robot, " + item.prompt
    if "nitrosocke" in item.modelID:
        prompt = "arcane, " + item.prompt
    if "dreamlike" in item.modelID:
        prompt = "photo, " + item.prompt
    if "prompthero" in item.modelID:
        prompt = "mdjrny-v4 style, " + item.prompt 

    if torch.cuda.is_available():
        pipe = StableDiffusionPipeline.from_pretrained(item.modelID,safety_checker=None,
            torch_dtype=torch.float16,
            use_safetensors=True).to("cuda")
        pipe.enable_sequential_cpu_offload()
    else:
        pipe = StableDiffusionPipeline.from_pretrained(item.modelID, safety_checker=None)
    
    image = pipe(prompt=prompt, num_inference_steps=item.steps, guidance=item.guidance).images[0]

    image.save("response.png")
    with open('response.png', 'rb') as f:
        base64image = base64.b64encode(f.read())
    
    return {"output": base64image}
    
    

