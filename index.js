#! /usr/bin/env node

const readline = require('readline');
const { exec } = require('child_process');

const currentDirectory = process.cwd();

const getRepositoryName = (repositoryUrl) => {
    const url = repositoryUrl.split('/');
    return url[url.length - 1].split('.')[0];
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("git clone ", (respository) => {
    exec(`git clone ${respository}`, (err, stdout, stderr) => {
        console.log(stderr);
        if (err) {
            console.error(`git clone error: ${err}`);
            return rl.close();
        }

        console.log("code .");
        const repositoryName = getRepositoryName(respository);
        const cwd = `${currentDirectory}/${repositoryName}`;
        exec("code .", { cwd }, (err, stdout, stderr) => {
            if (err) {
                console.error(`code error: ${err}`);
            }
            console.log(stderr);
            exec("npm i", { cwd }, (err, stdout, stderr) => {
                if (err) {
                    console.error(`npm i error: ${err}`);
                }
                console.log(stderr);
                rl.close();
            });
        });
    });
});