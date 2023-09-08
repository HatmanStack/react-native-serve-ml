from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from diffusers import StableDiffusionPipeline
import torch
import base64

app = FastAPI()

# Model from HuggingFace that you are using to run your workload
model_id = "runwayml/stable-diffusion-v1-5" 

@app.get("/api")
async def inference(prompt, steps, guidance):
    # Check for CUDA
    if torch.cuda.is_available():
        pipe = StableDiffusionPipeline.from_pretrained(model_id,
            torch_dtype=torch.float16,
            use_safetensors=True).to("cuda")
        pipe.enable_sequential_cpu_offload()
    else:
        pipe = StableDiffusionPipeline.from_pretrained(model_id)
    
    image = pipe(prompt, 
                num_inference_steps=int(steps), 
                guidance_scale=float(guidance)).images[0]
    
    # Save image and return it as base64 to display
    image.save("response.png")
    with open('response.png', 'rb') as f:
        base64image = base64.b64encode(f.read())
    
    return {"output": base64image}

app.mount("/", StaticFiles(directory="build", html=True), name="build")

@app.get('/')
def homepage() -> FileResponse:
    return FileResponse(path="/app/build/index.html", media_type="text/html")
