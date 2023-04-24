const contacts = require("./contacts.js");
const yargs = require("yargs");

yargs
  .command({
    command: "add",
    describe: "Menambahkan Contact Baru",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "No Handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      // console.log(contact);
      contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand();

yargs.command({
  command: "list",
  describe: "Menampilkan list nama dan no handphone contact",
  handler: () => {
    contacts.listContact();
  },
});

yargs.command({
  command: "detail",
  describe: "Menampilkan detail sebuah contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    contacts.detailContact(argv.nama);
  },
});

yargs.command({
  command: "delete",
  describe: "Menghapus sebuah contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    contacts.deleteContact(argv.nama);
  },
});

yargs.parse();
