#! /usr/bin/env node
const { Command } = require("commander");
const { execSync } = require("child_process");

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (e) {
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true;
};

const program = new Command();

const repoName = process.argv[2];
const gitCheckoutCommand = (directoryName) =>
  `git clone --depth 1 https://github.com/hhimanshu/react-ts-starter ${directoryName}`;
const installDepsCommand = (directoryName) =>
  `cd ${directoryName} && npm install`;

program
  .name("react-starter-app CLI")
  .description("CLI to add react boilerplate")
  .version("0.1.0");

program
  .command("create-react-starter-app")
  .description("Add react boilerplate to project")
  .argument("<directory>", "directory name")
  .action((directory) => {
    console.log();
    console.log();

    console.log(`Cloning the repository with name ${repoName}`);

    runCommand(gitCheckoutCommand(directory));

    console.log();
    console.log();

    console.log(`Installing dependencies for ${directory}`);
    runCommand(installDepsCommand(directory));
   
    console.log();
    console.log();

    console.log(
      "Congratulations! You are ready. Follow the following commands to start"
    );
    console.log(`cd ${directory} && npm start`);
    // const checkedOut = runCommand(gitCheckoutCommand(directory));
    // if (!checkedOut) process.exit(-1);
    // const installedDeps = runCommand(installDepsCommand(directory));
    // if (!installedDeps) process.exit(-1)
  });
program.parse();
