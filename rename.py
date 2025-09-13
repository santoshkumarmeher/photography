import os
import string

# folder path where your images are stored
folder = r"D:/photography/imgs"

# list all files and sort them
files = sorted(os.listdir(folder))

# helper function: convert number → letters (like Excel columns but lowercase)
def num_to_letters(n):
    result = ""
    while n > 0:
        n, r = divmod(n - 1, 26)
        result = string.ascii_lowercase[r] + result
    return result

# starting index (1 = 'a', 27 = 'aa', 28 = 'ab', etc.)
start = 1

for i, file in enumerate(files[start-1:], start=start):
    ext = os.path.splitext(file)[1]
    new_name = f"{num_to_letters(i)}{ext}"  # ab, ac, ad ...
    old_path = os.path.join(folder, file)
    new_path = os.path.join(folder, new_name)

    print(f"Renaming: {file} → {new_name}")
    os.rename(old_path, new_path)

print("✅ Renaming complete.")
