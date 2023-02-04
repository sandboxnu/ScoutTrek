#!/usr/bin/env python3
import socket
import argparse

parser=argparse.ArgumentParser()
parser.add_argument("--env")
args=parser.parse_args()

IP = ''
if args.env == 'local':
    # Get the ip address 
    # https://stackoverflow.com/questions/60656088/how-to-get-wireless-lan-adapter-wi-fi-ip-address-in-python
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # doesn't even have to be reachable
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except:
        IP = '127.0.0.1'
    finally:
        s.close()

with open('.env', 'r') as file:
    lines = file.readlines()

for i in range(len(lines)):
    if lines[i].startswith('LOCAL_IP_ADDRESS='):
        lines[i] = f'LOCAL_IP_ADDRESS={IP}\n'
    if lines[i].startswith('ENV='):
        lines[i] = f'ENV={args.env}\n'

with open('.env', 'w') as file:
    lines = file.writelines(lines)
