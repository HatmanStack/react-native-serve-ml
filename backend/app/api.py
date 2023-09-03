import torch
import fastapi
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from diffusion import StableDiffusionPipeline
import base64

model_id = "runwayml/stable-diffusion-v1-5" 

app = FastAPI()

# CORS middleware
origins = ["http://localhost:19006"]
app.add_middleware(
    fastapi.middleware.CORSMiddleware, 
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

    # Check for CUDA
    device = "cpu"
    if torch.cuda.is_available():
        device = "cuda"

    pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16, device=device)
    
    image = pipe(item.prompt, 
                num_inference_steps=item.steps, 
                guidance_scale=item.guidance).images[0]
    
    image.save("response.png")
    
    with open('response.png', 'rb') as f:
        base64image = base64.b64encode(f.read())
        
    return base64image