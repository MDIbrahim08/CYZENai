import zipfile
import os

configs = [
    {
        'zip': 'public/downloads/password_analyzer_zip.zip',
        'prefix': 'password_analyzer/backend/frontend/',
        'dest': 'public/tools/password_analyzer'
    },
    {
        'zip': 'public/downloads/phishing_detection_engine_zip.zip',
        'prefix': 'phishing_detection_engine_1/templates/',
        'dest': 'public/tools/phishing_detection_engine'
    },
    {
        'zip': 'public/downloads/emergency-response-kit_zip.zip',
        'prefix': 'emergency-response-kit/dist/',
        'dest': 'public/tools/emergency-response-kit'
    },
    {
        'zip': 'public/downloads/security_posture_analyzer_antig_1.zip',
        'prefix': 'security_posture_analyzer_antig_1/client/dist/',
        'dest': 'public/tools/security_posture_analyzer'
    }
]

for cfg in configs:
    os.makedirs(cfg['dest'], exist_ok=True)
    with zipfile.ZipFile(cfg['zip'], 'r') as z:
        for file in z.namelist():
            if file.startswith(cfg['prefix']) and not file.endswith('/'):
                rel_path = file[len(cfg['prefix']):]
                dest_path = os.path.join(cfg['dest'], rel_path)
                os.makedirs(os.path.dirname(dest_path), exist_ok=True)
                with open(dest_path, 'wb') as f:
                    f.write(z.read(file))
                print(f"Extracted {dest_path}")
print("Done extracting properly.")
