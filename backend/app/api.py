from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import torch
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler
from pydantic import BaseModel
import base64

model_id = "runwayml/stable-diffusion-v1-5"

app = FastAPI()

origins = [
    "http://localhost:19006"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Item(BaseModel):
    prompt: str
    steps: int
    guidance: float
    

@app.post("/")
async def inference(item: Item):
    pipe = StableDiffusionPipeline.from_pretrained(model_id)
    image = pipe(item.prompt, num_inference_steps=item.steps, guidance_scale=item.guidance).images[0]  
    image.save("response.png")
    with open('response.png', 'rb') as f:
        base64image = base64.b64encode(f.read())
    return base64image
    
    