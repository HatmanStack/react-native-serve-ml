from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import torch
from diffusers import StableDiffusionPipeline
from fastapi.responses import FileResponse

model_id = "CompVis/stable-diffusion-v1-4"
device = "cpu"

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/{prompt}", tags=["root"])
async def inference(prompt: str = 'Avacado Armchair',) -> dict:
    pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
    pipe = pipe.to(device)
    pipe.enable_attention_slicing()
    sent_prompt = prompt
    image = pipe(sent_prompt).images[0]  
        
    image.save("response.png")
    
    return FileResponse("./response.png")