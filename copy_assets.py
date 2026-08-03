import shutil
import os

src_dir = r"C:\Users\Owner\.gemini\antigravity\brain\4c5758d5-2056-4ac5-95e8-ff4656ce2d90\.user_uploaded"
dest_dir = r"C:\Users\Owner\.gemini\antigravity\scratch\arc-editz-portfolio\assets\images"

os.makedirs(dest_dir, exist_ok=True)

mapping = {
    "media__1785706844477.jpg": "logo.jpg",
    "media__1785706844500.jpg": "design1_birthday.jpg",
    "media__1785706844514.jpg": "design2_terah_compliance.jpg",
    "media__1785706844547.jpg": "design3_zion.jpg",
    "media__1785706844759.jpg": "design4_terah_app.jpg"
}

for src_name, dest_name in mapping.items():
    src_path = os.path.join(src_dir, src_name)
    dest_path = os.path.join(dest_dir, dest_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"Copied {src_name} -> {dest_name}")
    else:
        print(f"Source file not found: {src_path}")
