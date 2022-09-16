const {Userschema}=require("./Userschema")

const insertUser = (userObj) => {
    return new Promise((resolve, reject) => {
        Userschema(userObj)
          .save()
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      });
    };

module.exports={
    insertUser,
};