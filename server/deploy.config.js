require("dotenv").config();
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const config = {
    user: process.env.username,
    password: process.env.password,
    host: "ftp.projetoscti.com.br",
    port: 21, // default is 21
    localRoot: __dirname,
    remoteRoot: "/uninews/",
    include: ["*", "**/*"],      // this would upload everything except dot files
    deleteRemote: false,         // delete existing files at destination before uploading
    forcePasv: true              // passive mode (for firewalls)
};

ftpDeploy.deploy(config, function(err) {
    if (err) console.log(err)
    else console.log("Finished");
});

module.exports = config;
