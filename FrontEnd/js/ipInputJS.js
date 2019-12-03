function print(){
    console.log("ASDASDASnewline\nDASDASD")
    console.log(document.getElementById("leftKey").value)
    var keyString = document.getElementById("leftKey").value
    var modifiedString = ""
    for (var i = 0; i < keyString.length; i++){
        if(keyString[i] == " "){
           modifiedString += "."
        }
        else {
            modifiedString += keyString[i]
        }
    }
    console.log(modifiedString)
    
}

function testConnect(){
    var payload = JSON.stringify({"test":"jasonsuck"})
    $.ajax({
        method: 'POST',
        url: "http://18.189.26.44:5000/api/v1/cloud/jsonSuckTest",
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: payload,
        success: function(response){
            console.log(response);
        }
    })
}

function next(){
    var ipL = document.getElementById("leftIP").value
    var userL = document.getElementById("leftUser").value
    var keyL = document.getElementById("leftKey").value
    var ipR = document.getElementById("rightIP").value
    var userR = document.getElementById("rightUser").value
    var keyR = document.getElementById("rightKey").value
    if(ipL != "" && userL != "" && keyL != "" && ipR != "" && userR != "" && keyR != ""){
        localStorage.setItem('ipL', ipL)
        localStorage.setItem('userL', userL)
        localStorage.setItem('keyL', keyL)
        localStorage.setItem('ipR', ipR)
        localStorage.setItem('userR', userR)
        localStorage.setItem('keyR', keyR)
        window.location.replace("/application.html")
    }
}

function test_next(){
    console.log("entered test inputs")
    document.getElementById("leftIP").value = "3.16.27.35"
    document.getElementById("leftUser").value = "ubuntu"
    document.getElementById("leftKey").value = "-----BEGIN RSA PRIVATE KEY----- MIIEowIBAAKCAQEAh8UjY+wKEBlQWv6xaYKU6EXKRG0qL71iA+gZ5VR7ZOYUso8j/4KmdI6sIPkO FM2FTBb1dMF4MqJY5MC5DOCPn3jxOdgaWm58mRgr2s/cWbsK1h/7ftue8Nfuzu+FLDDs1rPKfTI0 iVC/OyVhMiQcg56HQ75sgy1fDJ1WZl/7Y4rEqGJes2i+mSgVVCqGR/WlTSEK5GJ97IRWVMIf+U5w vm1Gpotp6BM8ajVdRuwvGNE4+eMis9gvL5nH1qprokHmZMPKv3FT1GHvtsFf/9QhHlWA2XdE4b1k pqjsRELeX0inHgGWIXUmiBK2sp15AehhsK7DIzIoL6iJc9WmP6TAXQIDAQABAoIBAByvq32WRr4G CzNesu9/FqVI8aaphgtWMVpv9OC+i9/SuTbNBacb3L2t03KYDMCad/qOs0f7BMF2CeAzVCYDYHUq YZV+Mns+8vaJ4+I0nvMakPyS/1lbX+a1SRDSDMo8gB4RGMyBChalR/JgQHwOozOwEBZhKp5AvN92 cuXoi74JKgUxglCr7Tk3BN8Shdlr5sTNJ0cD8nuol3G/HJcyX/sv23pN5mZhEb43CN/jAQ8q3NoE OTedfkhKk7ymvDwsqdJ+HkISv/+niZMxqrLOxb3CrWE/GJ1EFg3pRUe0cY62siPA15LxOeSv3Fq8 pobbLuxnRUGmJWMKIClOVxOhegECgYEAxKEndwil2zCIeeb4DuCO5kubZipp/jFREDkglFIPFowR RFoYcEPTmlK1Ivm811+sozeL9DC3cElKbCO1kL6aBICAjak0X9yOi5YHq5V6Q5JIl6UEybDabX4q GnFNCiDrrdiTonJ3cH6qCjIzrlynFnIhwL2lULPnY78geJmFZoECgYEAsMO9cAeHRGlNk0pNro3O FtQLKR06MfqhYpKlG4A4b0Mq8tu9olsQujtHYFBUgQpJgTP3BcSnZNmJnNPDdTVRbwY5y8WYJtt+ GlRk6//VmAXzc2JARWKIIRHqc6qWjoq2gzyvZHs6oZwAvCGW5ZdgSJI9xvEIacrHuafLQ5znw90C gYEAprIYywlB0rkqem4dDj/B5etjKxH6Gc2lc6N6w0NuFydX3CKlZUebNNG5TpV6SvyJVzXYKITE fyUjOtprKvLrj7WBRpeUF1DcZ+ohRo3KwU5azHTRwkt0Yi77cr9rGJMgOpnJT4bLS0uWzF4TAlb6 MEVB6Cze4bQjDqUR2iwMtAECgYB/OyTrsj+G2lTgI6ducNtaSx4NZeAxgTkQfoUhGlWEoFAVpl0E s4+CvJBPnwJ0LzdhLEoteLMUQBBxNWuGve3zgAOxzHQL5AkMYpqR0/+mAQKOlrW0O4vIYeDjiHH9 /5IHPHLyXFCDaoqM35CBiUfgdILK40su+qpv03rXG+UmcQKBgEvwjK6LBAyYqlwpwGmm+PorWi/Y CTIRqgK6on3sxjo+AQrYIglX/+ykWT6ktaCneJxZN9wbO8gvNDAEEmr+Ej9qg+aRlO9SWEtFCP0a CRSlQiGvJKI8+lul773p5JaVtpMzcdjD7KQIcuhL7wWIPFgtbg0l0MdMwVtuUAQej6IA -----END RSA PRIVATE KEY-----"
    document.getElementById("rightIP").value = "34.94.33.213"
    document.getElementById("rightUser").value = "ubuntu"
    document.getElementById("rightKey").value = "-----BEGIN RSA PRIVATE KEY----- MIIEpAIBAAKCAQEAuiqufxOZAyQFPQ42jeVsPHupmKsiJT7voMdsEqezU+ArCArz +v3KE38CnhW7yd9tcKuk/8PWkYGzuK7Xno5T6VJiPPG8aU4e7eqp5SZgU4/c1KMY rOWDvcRIbehnH3ZUROiEOyTLo9fIyQr99mX46l+RfreOgmxtjqTEbtHXMD1Ax30I qwRJ6aw7NbE5giJuYzQHd7lF2KFnD7ut06rpHoADCDwfNWIVoZcHgOblbW+TBTUY IbACO1HzTY+7aJbBapdD/tfq3hbOfVHMPEupxxjdxsdCEHEerLdvKRAgIT63AWEv 9ycMT+o31dRf9tMFtUvaSu276HBujtqfeaMjEwIDAQABAoIBAQCDlAcg6ckL3zmU nacRQ0Xsubp0nP/VM1ZKXKiVxtGIRrgjRxqKGzXn8az37oR7ed7v82D7JH9S+Ej+ DxV2i0HjdsbYLELuariRj3nk6+rJJLT/1QZrrQwf48sNY2T/Z7LHwU80Ph1v/+N5 tLsqm4gCnulGlpWyuM/2MZ5kdQuSm4HJHA3Q2/QfOYwAFKepddaQmPVmoTKyv5Dc lgwtb95wjyg53WVYURdpFdn2DHjhVEDZakD+K/Wvlc0U/DKn3BdUC5MnZcVSF1Fz /vhaU2qht0G73MNriqjqh5h58HWU/YxLb9BXZSOu6ugf1XL8Hc5bvU5PiwI/8xqp Uv9Uc7uBAoGBAPSB6b5XSMJwGeJXonKf2+uKRN/1Bk0KoorVvxZlFGLPwYtLWfiC J5AB8k1g7iRGwqZUSVENjO7+miS+rpzNgTZmhOJKQuiCMYmNo6KM9ZGE/GNTCrp9 XEcMbyx1V/qWZjb4SjCGWCs/IxultdMs2RLNibYE8I6GfQcitp1w0qJPAoGBAMLq xXq25SbCzZ7ZdLEkFHXmu01cMkHTHKQB4ouQNm0DxSPE/NxjhORGK0xRz0mbrpe5 b+ukNB7YjbvAb7ZTjXTR1BadAsRTx1xlSaPXau+6zjNAA6FC4zWYw1YPMXkTtyfS o7XquHIQyRrj/vco2weLdpF/8kpqO8SlRz42g9X9AoGAfn9f4NvjhsTcf197afYO n1OPwpZPxjgEU/O1wu5Ul7KInXpEd+9ObJC1PRcy3Y3GUqs0qzxpd5Q9R1lnmTQw 72YmxbRJ3WTOIC4pRIXM3paAxRpHaKhGv3NNaSDkfX6mLzZRm71FjEpD7Z/T7Ac9 3x57arIvim1F7hUliVq/fr0CgYEAqKoKtENrSv0qfJhi953m7pb34Ns0yezqTakr 5eSmk/K9NlSREgwzxGxLr0DjhChpDfVyuY9fYom1K5A7mqP2Ne4T/nVjHYv5aSRk cphHeqZFI+fyvCpq/cfwz5laEBFVXepRq2suq9WGj/RWfn0l+wNdWE5E1MvUaDc0 zMrTjekCgYB6OpB0W32lmMxeHkUw2e6b85Vwi7u00fu0R9Yvil6MLsHBth4zZpyu 8/9zuS78aIyQAp3u6YLPw+mTU4XVCf23b3qYICCx+9SAh8XpCSiocR33K27mWoV9 wNMf2veoCu5xgiNi3ubiVvyrfqP0RUhv7EU/6ogsqLRMBOGC5zZl4g== -----END RSA PRIVATE KEY-----"
}