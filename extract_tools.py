import zipfile
import os
import glob

os.makedirs('public/tools', exist_ok=True)
zips = glob.glob('public/downloads/*.zip')

for z in zips:
    tool_name = os.path.basename(z).replace('.zip', '').replace('_zip', '').replace('_antig_1', '')
    tool_dir = os.path.join('public/tools', tool_name)
    os.makedirs(tool_dir, exist_ok=True)
    print(f"Extracting {z} to {tool_dir}...")
    
    with zipfile.ZipFile(z, 'r') as zip_ref:
        for file in zip_ref.namelist():
            if '/dist/' in file and 'node_modules' not in file and not file.endswith('/'):
                rel_path = file.split('/dist/')[1]
                dest_path = os.path.join(tool_dir, rel_path)
                os.makedirs(os.path.dirname(dest_path), exist_ok=True)
                with open(dest_path, 'wb') as target_file:
                    target_file.write(zip_ref.read(file))
                    
print("Done extracting.")
