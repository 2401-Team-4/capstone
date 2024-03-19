import subprocess, sys

def process():
  subprocess.run(['python3', 'config.py'])
  subprocess.run(['echo', "🔥Mimic is successfully installed🔥"])

if __name__ == '__main__':
  process()