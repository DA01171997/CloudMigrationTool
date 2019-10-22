
#create using post 
curl --verbose \
	--request POST \
	--header 'Content-Type: application/json' \
	--data @user1.json \
	http://127.0.0.1:5000/api/v1/cloud/users/register
echo

#pull all user test using GET

curl --verbose \
	--header 'Content-Type: application/json' \
	--request GET \
	http://127.0.0.1:5000/api/v1/cloud/users/register
echo
echo "----------------------------------------------------------------------------------"

#login with POST
curl --verbose \
	--request POST \
	--header 'Content-Type: application/json' \
	--data @userlogin.json \
	http://127.0.0.1:5000/api/v1/cloud/users/login
echo
echo "----------------------------------------------------------------------------------"