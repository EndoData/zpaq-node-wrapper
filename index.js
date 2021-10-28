const execa = require("execa");
const path = require("path");

/** The path to the binary executable for zpaq. Works in electron environments. Works with macOS and windows. */
let zpaqBinPath = path.join(
  __dirname.replace("app.asar", "app.asar.unpacked"),
  "bin",
  process.platform === "win32" ? "zpaq.exe" : "zpaq"
);

/**
 * Lists all versions of an archive
 *
 * @async
 * @param  {string} basePath The path form which the zpaq command is executed.
 * All files added with relative paths must be relative to this directory.
 * @param  {string} archivePath The path to the zpaq archive
 * @return {Promsise.<Array<string>>} The archive versions formated as `YYYY-MM-DD HH:mm:SS` strings
 */
const listVersions = async function (basePath, archivePath) {
  const { stdout, stderr } = await execa(
    zpaqBinPath,
    [
      "v",
      archivePath,
      "-s1", // Summary level 1 option, which means quiet after our modifications
    ],
    { cwd: basePath, shell: true }
  );
  return stdout.split(/\r?\n/);
};

/**
 * Adds a relative or absolute file or directory to an archive.
 *
 * @async
 * @param  {string} basePath The path form which the zpaq command is executed.
 * All files added with relative paths must be relative to this directory.
 * @param  {string} archivePath The path to the zpaq archive
 * @param  {string} relativeFilePath The path to the file or directory to add to the archive. If relative, this path must be relative to basePath
 * @return {Promise.<execa.ExecaReturnBase>} The execa process
 */
const addFile = async function (basePath, archivePath, relativeFilePath) {
  return await execa(
    zpaqBinPath,
    [
      "add",
      archivePath,
      relativeFilePath,
      "-s1", // Summary level 1 option, which means quiet after our modifications
    ],
    { cwd: basePath, shell: true }
  );
};

/**
 * Extract an archive until a given date.
 *
 * @async
 * @param  {string} basePath The path form which the zpaq command is executed.
 * All files added with relative paths must be relative to this directory.
 * @param  {string} archivePath The path to the zpaq archive
 * @param  {string} versionDate The date until which to extract the archive
 * @return {Promise.<execa.ExecaReturnBase>} The execa process
 */
const extractUntil = async function (basePath, archivePath, versionDate) {
  return await execa(
    zpaqBinPath,
    [
      "x",
      archivePath,
      "-until",
      versionDate,
      "-s1", // Summary level 1 option, which means quiet after our modifications
      "-f",
    ],
    { cwd: basePath, shell: true }
  );
};

module.exports = { listVersions, addFile, extractUntil, zpaqBinPath };
