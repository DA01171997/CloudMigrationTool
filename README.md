# CloudMigrationTool
### CPSC 454 Fall 2019
####    Duy Do: duy.ado@csu.fullerton.edu, undergraduate, CS
####	Jason Lieu: jasonlieu@csu.fullerton.edu, undergraduate, CS
####	Maxfield Wilhoite: maxw@csu.fullerton.edu, undergraduate, CS


### Video Presentation link: <br />
    MP4-format: https://drive.google.com/drive/folders/1aZPz1VTcdOSQO73m0sKFsQZ0PNuNZR9H?usp=sharing  
    MOV-format:https://drive.google.com/drive/folders/1nBWL4rFfxyhftK2AzB_cUsENXaDbMisu?usp=sharing  

#  Setup Instruction
### 1. Front End <br />
    The FrontEnd codes can be hosted by user choice of hosting service. For our project we hosted the front end on AWS S3 bucket, just copy all the file inside the FrontEnd folder on the intended service.
    Note: The FrontEnd code is harded coded right now to send requests to our AWS API Gateway. Please change the code in applicationJS.js in the FrontEnd folder accordingly to your API Gateway.
### 2. Employee <br />
    The Employee codes can be cloned to any cloud node that the user want to have copy, move, delete and crawl features.
### 3. Lambda <br />
    The Lambda codes needed to be uploaded to AWS lambda functions, each python file is a seperate lambda function. Also an AWS API gateway needed to attach these lambda funcions. The front end need to point to this API Gateway endpoint.
### 4. BackEnd <br />
    The Backend code is for the EC2 instance manager node that we used for the midterm demo. However for the finals submission, we move those functions to AWS lambda functions, so we don't need these codes. But we will include this as part as proof of our work.
### 5. RDS <br />
    The RDS need to be created to store our users informations. After creating a RDS database instance, please connect to the RDS instance via mysql workbench or anything similar database connector and run the init.sql file to setup the tables for the database. 

# How to run <br />
    1. Run ./command.sh on both Employee nodes. 
    2. Disable CORS and launch selected browser. 
    3. Connect to link on which the front end is hosted. 
    4. Create new account and login (could skip login). 
    5. Input Employee IP's and usernames. <br />
    6. The private keys will need to be copy and pasted into the input field. 
    7. Continue onto application. 
#### Delete <br /> 
    1. Check the rightmost checkbox on the target file or directory. 
    2. Press "Delete". 
#### Transfer <br /> 
    1. Leave checkbox next to "Send" unchecked, uncheck if already checked. 
    2. Check the rightmost checkbox on the target file or directory. 
    3. Check the leftmost checkbox on the destination directory in the opposite node. 
    4. Press "Send".
### Copy <br />
    1. Check checkbox next to "Send". 
    2. Check the rightmost checkbox on the target file or directory. 
    3. Check the leftmost checkbox on the destination directory in the opposite node. 
    4. Press "Send".

