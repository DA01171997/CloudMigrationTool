import os
import sys
import paramiko
from scp import SCPClient

def crawl(pwd='/'):
    crawl_cmd = 'du -a -h --time --max-depth=1 ' + pwd + ' 2>/dev/null'
    directory_list = []
    directory = os.popen(crawl_cmd).read().split('\n')
    for i in range(0, len(directory) - 2):
        size, time, path = directory[i].split('\t')
        split_path = path.split('/')
        name = split_path[len(split_path) - 1]
        path = pwd + '/' + name
        if os.path.isfile(path):
            file_type = 0
        elif os.path.isdir(path):
            file_type = 1
        else:
            file_type = 2
        directory_list.append([name, size, file_type, time, path])
    return directory_list


def copy(source_path, destination_path, destination_ip, destination_user, recursive, priv_key):
    for i in range(0, 23):
        if i == 10 or i == 14 or i == 21:
            priv_key = priv_key[:i] + ' ' + priv_key[i + 1:]
    for i in range((len(priv_key) - 22), len(priv_key)):
        if i == len(priv_key) - 9 or i == len(priv_key) - 17 or i == len(priv_key) - 21:
            priv_key = priv_key[:i] + ' ' + priv_key[i:]
    priv_key = priv_key.split('.')
    with open('key.pem', 'w') as key_file:
        for line in priv_key:
            key_file.write(line + '\n')
    os.system('chmod 400 key.pem')
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(hostname=destination_ip, username=destination_user, key_filename='key.pem')
    scp = SCPClient(client.get_transport())
    scp.put(source_path, recursive=(recursive=='True'), remote_path=destination_path)
    scp.close()
    #os.system('rm key.pem')

def copy_with_key_file(source_path, destination_path, destination_ip, destination_user, recursive, priv_key_file):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(hostname=destination_ip, username=destination_user, key_filename=priv_key_file)
    scp = SCPClient(client.get_transport())
    scp.put(source_path, recursive=(recursive=='True'), remote_path=destination_path)
    scp.close()

def transfer(source_path, destination_path, destination_ip, destination_user, recursive, priv_key):
    for i in range(0, 23):
        if i == 10 or i == 14 or i == 21:
            priv_key = priv_key[:i] + ' ' + priv_key[i + 1:]
    for i in range((len(priv_key) - 22), len(priv_key)):
        if i == len(priv_key) - 9 or i == len(priv_key) - 17 or i == len(priv_key) - 21:
            priv_key = priv_key[:i] + ' ' + priv_key[i:]
    priv_key = priv_key.split('.')
    with open('key.pem', 'w') as key_file:
        for line in priv_key:
            key_file.write(line + '\n')
    os.system('chmod 400 key.pem')
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(hostname=destination_ip, username=destination_user, key_filename='key.pem')
    scp = SCPClient(client.get_transport())
    scp.put(source_path, recursive=(recursive=='True'), remote_path=destination_path)
    scp.close()
    #os.system('rm key.pem')
    delete(source_path, recursive)

def transfer_with_key_file(source_path, destination_path, destination_ip, destination_user, recursive, priv_key_file):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(hostname=destination_ip, username=destination_user, key_filename=priv_key_file)
    scp = SCPClient(client.get_transport())
    scp.put(source_path, recursive=(recursive=='True'), remote_path=destination_path)
    scp.close()
    delete(source_path, recursive)

def delete(path, recursive):
    if recursive=='True':
        delete_cmd = "rm -r " + path
    else:
        delete_cmd = "rm " + path
    os.system(delete_cmd + ' 2>/dev/null')

def FormKey(path_to_key):
    with open(path_to_key) as key_file:
        key_string = ""      
        key_line = key_file.readline()
        while key_line:
            key_string = key_string + key_line
            key_line = key_file.readline()
    return key_string



if __name__ == "__main__":
    # print(crawl('/home/max/Desktop/454_Project'))
    # print(crawl('/home/max/Desktop/454_Project/test'))
    # print(crawl('.'))
    #priv_key = FormKey('/home/max/Desktop/454_Project/Key_Pairs/cloud_managment_key.pem')
    # priv_key = '/home/max/Desktop/454_Project/Key_Pairs/cloud_managment_key.pem'
    # source_path = '/home/max/Desktop/454_Project/test'
    # recursive = True
    # destination_path = '~/Desktop/'
    # destination_ip = '18.189.26.44'
    # destination_user = 'ubuntu'
    #transfer(source_path, destination_path, destination_ip, destination_user, recursive, priv_key)


    priv_key = '/home/ubuntu/Desktop/key/cloud_managment_key.pem'
    source_path = '/home/ubuntu/Desktop/test'
    recursive = True
    destination_path = '~/Desktop/'
    destination_ip = '18.189.26.44'
    destination_user = 'ubuntu'
    if sys.argv[7] == '0':
        copy(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6])
    elif sys.argv[7] == '1':
        transfer(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6])
    #transfer_with_key_file(source_path, destination_path, destination_ip, destination_user, recursive, priv_key)


