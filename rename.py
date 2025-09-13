import os

# folder path where your images are stored
folder = r"D:/photography/imgs"

# list all files and sort them (important for sequence)
files = sorted(os.listdir(folder))

# starting number
start = 39

for i, file in enumerate(files[start-1:], start=start):
    ext = os.path.splitext(file)[1]  # keep original extension (.jpg, .png, etc.)
    new_name = f"{i}{ext}"
    old_path = os.path.join(folder, file)
    new_path = os.path.join(folder, new_name)

    print(f"Renaming: {file} → {new_name}")
    os.rename(old_path, new_path)

print("✅ Renaming complete.")
