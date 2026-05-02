import requests
import base64
import json

API_KEY = "AIzaSyB0goJjPPg0Le1Vl_JZpqt6UNgDI9MuVm4"
MODEL = "gemini-3.1-flash-image-preview"

prompt = """Create a stunning, ultra-wide cinematic hero background image for a professional residential painting company website.

Scene: A beautifully renovated modern home interior in Montreal Canada. A professional painter in clean white coveralls is applying fresh navy blue paint to a bright living room wall with a long-handled roller. The room has large windows letting in warm natural light. The walls are being painted a rich deep ocean blue. Clean drop cloths protect the hardwood floors. The atmosphere is professional, clean, and aspirational.

Style requirements:
- Ultra-wide landscape format (16:9 or wider)
- Cinematic, magazine-quality photography style
- Warm natural lighting from windows
- Sharp, high detail, photorealistic
- Colors: deep ocean blue (#0C4A6E), sky blue (#0284C7), warm whites and creams
- The image should feel premium, trustworthy, and professional
- Subtle depth of field with the painter slightly in foreground
- The room should look beautiful and aspirational — a before/after transformation in progress
- NO text, NO logos, NO watermarks"""

url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"

payload = {
    "contents": [{"parts": [{"text": prompt}]}],
    "generationConfig": {"responseModalities": ["IMAGE", "TEXT"]}
}

print("Generando imagen hero con Gemini...")
resp = requests.post(url, json=payload, timeout=120)
print(f"Status: {resp.status_code}")

if resp.status_code != 200:
    print("Error:", resp.text[:2000])
    exit(1)

data = resp.json()

image_data = None
mime = None
for candidate in data.get("candidates", []):
    for part in candidate.get("content", {}).get("parts", []):
        if "inlineData" in part:
            image_data = part["inlineData"]["data"]
            mime = part["inlineData"]["mimeType"]
            print(f"Imagen encontrada: {mime}")
            break

if not image_data:
    print("No se encontró imagen en la respuesta.")
    print(json.dumps(data, indent=2)[:2000])
    exit(1)

ext = "png" if "png" in mime else "jpg"
output_path = f"public/realisations/hero-bg-new.{ext}"
with open(output_path, "wb") as f:
    f.write(base64.b64decode(image_data))

print(f"Hero background guardado en: {output_path}")
print(f"Extencion: .{ext}")
