import os
import paramiko
from scp import SCPClient

def crawl(pwd='/'):
    crawl_cmd = 'du -a -h --time --max-depth=1 ' + pwd + ' 2>/dev/null'
    path_cmd = 'pwd'
    directory_list = []
    abs_path = os.popen(path_cmd).read().split('\n')[0]
    directory = os.popen(crawl_cmd).read().split('\n')
    for i in range(0, len(directory) - 2):
        size, time, path = directory[i].split('\t')
        split_path = path.split('/')
        name = split_path[len(split_path) - 1]
        path = abs_path + '/' + name
        if os.path.isfile(path):
            file_type = 0
        else:
            file_type = 1
        directory_list.append([name, size, file_type, time, path])
    return directory_list


def transfer(source_path, destination_path, destination_ip, destination_user, recursive, priv_key):
    with open('key.pem', 'w') as key_file:
        key_file.write(priv_key)
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(hostname=destination_ip, username=destination_user, key_filename='key.pem')
    scp = SCPClient(client.get_transport())
    scp.put(source_path, recursive=recursive, remote_path=destination_path)
    scp.close()
    os.system('rm key.pem')

def transfer_with_key_file(source_path, destination_path, destination_ip, destination_user, recursive, priv_key_file):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(hostname=destination_ip, username=destination_user, key_filename=priv_key_file)
    scp = SCPClient(client.get_transport())
    scp.put(source_path, recursive=recursive, remote_path=destination_path)
    scp.close()


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
    transfer_with_key_file(source_path, destination_path, destination_ip, destination_user, recursive, priv_key)


