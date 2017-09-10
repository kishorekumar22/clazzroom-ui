'use strict';

myclazzApp.factory('utilityService', ['CONSTANTS', function(c) {

    return {

        validateNewUser: function(newuser) {
            if (newuser == undefined) {
                return "Please enter the required fields";
            }
            if (!this.isValidString(newuser.name)) {
                return "Invalid UserName";
            }
            if (!this.checkMinLength(newuser.name, 6)) {
                return "Username should be atleast 6 characters";
            }
            if (!this.isValidString(newuser.emailId) || !this.validEmail(newuser.emailId)){
            	return "Invalid Email Id";
            }
            if (!this.isValidString(newuser.password)){
            	return "Invalid Password";
            }
            if (!this.validPassword(newuser.password)){
            	return "Password should be atleast 8 characters with atleast 1 number";
            }
            if (!this.isValidString(newuser.confirmPassword) || (newuser.password != newuser.confirmPassword)){
            	return "Passwords doesnot match";
            }
            if (newuser.dob == undefined){
	        	return "Please select your Date of Birth";
	        }

	        if (!this.isValidString(newuser.gender)){
	        	return "Please select your Gender";
	   		}
	   		return "VALID";
        },

        isValidString: function(a) {
            return (a != undefined && a.length > 0);
        },

        checkMinLength: function(a, length) {
            return (a != undefined && a.length >= length);
        },
        validEmail: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validPassword: function(password) {
            var re = /^(?=.*\d)([0-9a-zA-Z]{8,})$/;
            return re.test(password);
        }
    };

}]);