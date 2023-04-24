const fs = require("fs");
const dirPath = "./data/";
const chalk = require("chalk");
const validator = require("validator");

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContact = (nama, email, noHp) => {
  // const file = fs.readFileSync("data/contacts.json", "utf-8");
  // const contacts = JSON.parse(file);
  const contact = { nama, email, noHp };
  const contacts = loadContact();

  //cek duplikast nama
  const duplikat = contacts.find((contact) => contact.nama === nama);

  if (duplikat) {
    console.log(chalk.red.inverse.bold("Nama Contact Sudah terdaftar!"));
    return false;
  }

  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid!"));
      return false;
    }
  }

  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(chalk.red.inverse.bold("No Handphone tidak valid!"));
    return false;
  }

  //

  contacts.push(contact);
  // console.log(contacts);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log(chalk.green.inverse.bold(`terimakasih data sudah ditambahkan`));
};

const listContact = function () {
  const contacts = loadContact();
  console.log(chalk.green.inverse.bold(`Daftar List Semua Contacts : `));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} Tidak ditemukan!`));
    return false;
  }

  console.log(chalk.green.inverse.bold(contact.nama));
  console.log(chalk.green.inverse.bold(contact.noHp));
  if (contact.email) {
    console.log(chalk.green.inverse.bold(contact.email));
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter((contact) => {
    return contact.nama !== nama;
  });
  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} Tidak ditemukan!`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
  console.log(
    chalk.green.inverse.bold(`data contact ${nama} berhasil dihapus`)
  );
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
