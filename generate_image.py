import os
import json

# Folder containing images
image_folder = "images"

# Collect only image files
extensions = (".jpg", ".jpeg", ".png", ".gif", ".webp")
images = [f for f in os.listdir(image_folder) if f.lower().endswith(extensions)]

# Save to images.json
with open("images.json", "w") as f:
    json.dump(images, f, indent=2)

print(f"✅ Found {len(images)} images. Saved to images.json")
