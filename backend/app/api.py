import torch
import fastapi
import base64
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from diffusers import StableDiffusionPipeline

app = FastAPI()

# CORS middleware
origins = ["http://127.0.0.1:19006"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic BaseModel to catch the body of our Request
class Item(BaseModel):
    prompt: str
    steps: int
    guidance: float
    modelID: str

@app.post("/api")
async def inference(item: Item):
    if "dallinmackay" in item.modelID:
        prompt = "lvngvncnt, " + item.prompt
    if "nousr" in item.modelID:
        prompt = "nousr robot, " + item.prompt
    
    # Check for CUDA
    if torch.cuda.is_available():
        pipe = StableDiffusionPipeline.from_pretrained(item.modelID,
            torch_dtype=torch.float16,
            use_safetensors=True).to("cuda")
        pipe.enable_sequential_cpu_offload()
    else:
        pipe = StableDiffusionPipeline.from_pretrained(item.modelID)
    
    image = pipe(prompt, 
                num_inference_steps=item.steps, 
                guidance_scale=item.guidance).images[0]
    
    # Save image and return it as base64 to display
    image.save("response.png")
    with open('response.png', 'rb') as f:
        base64image = base64.b64encode(f.read())
    
    return {"output": base64image}


