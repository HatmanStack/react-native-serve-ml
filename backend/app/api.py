import torch
import fastapi
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from diffusers import StableDiffusionPipeline
import base64

# Model from HuggingFace that you are using to run your workload
model_id = "runwayml/stable-diffusion-v1-5" 

app = FastAPI()

# CORS middleware
origins = ["http://localhost:19006"]
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
        
@app.post("/")
async def inference(item: Item):
    # Check for CUDA
    if torch.cuda.is_available():
        pipe = StableDiffusionPipeline.from_pretrained(model_id,
            torch_dtype=torch.float16,
            use_safetensors=True).to("cuda")
        pipe.enable_sequential_cpu_offload()
    else:
        pipe = StableDiffusionPipeline.from_pretrained(model_id)
    
    image = pipe(item.prompt, 
                num_inference_steps=item.steps, 
                guidance_scale=item.guidance).images[0]
    
    # Save image and return it as base64 to display
    image.save("response.png")
    with open('response.png', 'rb') as f:
        base64image = base64.b64encode(f.read())
        
    return base64image