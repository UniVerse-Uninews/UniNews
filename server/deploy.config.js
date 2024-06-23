require("dotenv").config();
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const config = {
    user: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD,
    host: "ftp.projetoscti.com.br",
    port: 21,
    localRoot: __dirname,
    remoteRoot: "/uninews/",
    include: ["*", "**/*"],
    deleteRemote: false,
    forcePasv: true,
    passive: true
};

ftpDeploy.deploy(config, function(err) {
    if (err) console.log(err);
    else console.log("Finished");
});

module.exports = config;
