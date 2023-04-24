//file sistem
//file system async

const { rejects } = require("assert");
const { error } = require("console");
const fs = require("fs");
const { resolve } = require("path");

//karena ini sync kita bisa menangkap error menggunakan try catch

// try {
//   fs.writeFileSync("data/test.txt", "Hallo Selamat Datang");
// } catch (error) {
//   console.log(error);
// }

//file system async
// fs.writeFile("data/async.txt", "ini file asynchronus", (err) => {
//   if (err) throw err;
//   console.log("data berhasil dibuat");
// });

//readfile sync
// console.log(fs.readFileSync("data/test.txt", "utf-8"));

//readfile async
// fs.readFile("data/async.text", "utf-8", (error, data) => {
//   if (error) throw error;
//   console.log(data);
// });

//membuat inputan dengan readline

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dirPath = "./data/";

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, rejects) => {
    rl.question(pertanyaan, (hasil) => {
      resolve(hasil);
    });
  });
};

const simpanContact = (nama, email, noHp) => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  const contact = { nama, email, noHp };
  contacts.push(contact);
  // console.log(contacts);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log(`terimakasih data ${nama} sudah ditambahkan`);
  rl.close();
};

module.exports = {
  simpanContact: simpanContact,
  tulisPertanyaan: tulisPertanyaan,
};
