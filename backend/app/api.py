from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import torch
from diffusers import StableDiffusionPipeline
from fastapi.responses import FileResponse
from pydantic import BaseModel

model_id = "CompVis/stable-diffusion-v1-4"
device = "cpu"

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3001"
]
print("logs")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Item(BaseModel):
    prompt: str
    

@app.post("/")
async def inference(item: Item):
    print(str(item.prompt))
    pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
    pipe = pipe.to(device)
    pipe.enable_attention_slicing()
    image = pipe(item.prompt).images[0]  
    print("Success")
    image.save("response.png")
    
    return FileResponse("./response.png", "image/png")