import fs from 'fs'

const readDb = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./db.json', (err, data) => {
            if (err) {
                console.log("Error : ", err)
                reject(err)
            } else {
                resolve(JSON.parse(data.toString()))
            }
        })
    })
} 

const writeDb = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./db.json', JSON.stringify(data), (err, data) => {
            if (err) {
                console.log("Error : ", err)
                reject(err)
            } else {
                resolve("success")
            }
        })
    })
}

export default {
    readDb,
    writeDb
}