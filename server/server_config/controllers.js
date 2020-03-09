
const usersModel = require('./db');

async function verifyLogin(data) {
    const { email, password } = data;
    try {
        const result = await usersModel.findOne({ where: { email: email } })

        if (!result || !(result.validPassword(password))) {
            return false;
        }
        else {
            return true;
        }
    } catch (err) {
        console.log("err", err);
        return false;
    }
}


async function adduser(data) {
    console.log(data)
    try {
        await usersModel.create({
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            password: data.password,

        })
        return true
    }
    catch (e) {
        console.log("err", e)
        return false;
    }
}

async function readUsersData() {
    try {
        const results = await usersModel.findAll();
        console.log("success", results)
        return results;
    }
    catch (e) {
        console.log(e)
        return [];
    }
}

async function deleteuser(id) {

    try {
        await usersModel.destroy({
            where: {
                id: id
            }
        })

        console.log("deleted successfully")
        return true
    }
    catch (err) {
        console.log(err)
        return false;
    }
}


module.exports = { readUsersData, adduser, deleteuser, verifyLogin }