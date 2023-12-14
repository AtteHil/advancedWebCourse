const bcrypt = require("bcryptjs");
module.exports ={
    hashFunction: (password) =>{
        console.log(password);
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },
    comparePasswords: async (fromList, password) =>{
        
        return await bcrypt.compare( fromList,password)
    }
    

    
}
