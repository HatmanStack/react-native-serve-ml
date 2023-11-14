import torch
import base64
from PIL import Image
from io import BytesIO
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from diffusers import StableDiffusionPipeline

app = FastAPI()

class Item(BaseModel):
    prompt: str
    steps: int
    guidance: float
    modelID: str

@app.post("/api")
async def inference(item: Item):
    print("check")
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
    data = {"prompt":prompt, "num_inference_steps":item.steps, "guidance": item.guidance}

    if torch.cuda.is_available():
        pipe = StableDiffusionPipeline.from_pretrained(item.modelID,
            torch_dtype=torch.float16,
            use_safetensors=True).to("cuda")
        pipe.enable_sequential_cpu_offload()
    else:
        pipe = StableDiffusionPipeline.from_pretrained(item.modelID)
    
    image = pipe(data).images[0]

    image.save("response.png")
    with open('response.png', 'rb') as f:
        base64image = base64.b64encode(f.read())
    
    return {"output": base64image}


