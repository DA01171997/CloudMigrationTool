import os

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
        else
            file_type = 2
        directory_list.append([name, size, file_type, time, path])
    return directory_list

if __name__ == "__main__":
        #print(crawl('/home/max/Desktop/454_Project'))
        #print(crawl('/home/max/Desktop/454_Project/test'))
        print(crawl('.'))
