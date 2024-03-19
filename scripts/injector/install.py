import subprocess, sys, uuid

UNIQUE_PROJECT_ID = str(uuid.uuid4())

def process():
  subprocess.run(['python3', 'config.py', UNIQUE_PROJECT_ID])
  subprocess.run(['echo', "🔥Mimic is successfully installed🔥"])

if __name__ == '__main__':
  process()