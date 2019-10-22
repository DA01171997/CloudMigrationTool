
#create using post 
curl --verbose \
	--request POST \
	--header 'Content-Type: application/json' \
	--data @account1.json \
	http://127.0.0.1:5000/api/v1/cloud/accounts/register
echo

#pull all account test using GET
echo "----------------------------------------------------------------------------------"
curl --verbose \
	--header 'Content-Type: application/json' \
	--request GET \
	http://127.0.0.1:5000/api/v1/cloud/accounts/register
echo
echo "----------------------------------------------------------------------------------"

#login with POST
curl --verbose \
	--request POST \
	--header 'Content-Type: application/json' \
	--data @accountlogin.json \
	http://127.0.0.1:5000/api/v1/cloud/accounts/login
echo
echo "----------------------------------------------------------------------------------"