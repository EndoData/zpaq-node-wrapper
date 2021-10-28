const execa = require("execa");
const path = require("path");

let zpaqBinPath = path.join(
  __dirname.replace("app.asar", "app.asar.unpacked"),
  "bin",
  process.platform === "win32" ? "zpaq.exe" : "zpaq"
);

const listVersions = async function (folderPath, archiveRelativePath) {
  const { stdout, stderr } = await execa(
    zpaqBinPath,
    [
      "v",
      archiveRelativePath,
      "-s1", // Summary level 1 option, which means quiet after our modifications
    ],
    { cwd: folderPath, shell: true }
  );
  return stdout.split(/\r?\n/);
};

const addFile = async function (
  folderPath,
  archiveRelativePath,
  fileRelativePath
) {
  const { stdout, stderr } = await execa(
    zpaqBinPath,
    [
      "add",
      archiveRelativePath,
      fileRelativePath,
      "-s1", // Summary level 1 option, which means quiet after our modifications
    ],
    { cwd: folderPath, shell: true }
  );
  return stdout.split(/\r?\n/);
};

const extractUntil = async function (
  folderPath,
  archiveRelativePath,
  versionDate
) {
  const { stdout, stderr } = await execa(
    zpaqBinPath,
    [
      "x",
      archiveRelativePath,
      "-until",
      versionDate,
      "-s1", // Summary level 1 option, which means quiet after our modifications
      "-f",
    ],
    { cwd: folderPath, shell: true }
  );
  return stdout.split(/\r?\n/);
};

module.exports = { listVersions, addFile, extractUntil };
