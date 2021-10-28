const zpaq = require("../index");
const fs = require("fs-extra");
const moment = require("moment");

const archivePath = "./test.zpaq";
const testFile1Path = "./testFile1";
const testFile2Path = "./testFile2";
let startTime;
let editTime;

const wait = async (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
};

describe("Can create, list and restore files", () => {
  beforeAll(async () => {
    try {
      await fs.remove(archivePath);
    } catch (e) {}
    await fs.writeFile(testFile1Path, "File 1, Version 1");
    await fs.writeFile(testFile2Path, "File 2, Version1");
  });
  test("Outputs correct executable file path", async () => {
    expect.assertions(1);
    expect(await fs.pathExists(zpaq.zpaqBinPath)).toBeTruthy();
  });
  describe("Can create an archive", () => {
    test("can create an archive", async () => {
      expect.assertions(1);
      await zpaq.addFile(".", archivePath, testFile1Path);
      await zpaq.addFile(".", archivePath, testFile2Path);
      expect(await fs.pathExists(archivePath)).toBeTruthy();
    });
  });
  describe("Can create an archive", () => {
    test("can create an archive", async () => {
      expect.assertions(1);
      startTime = moment.utc();
      await zpaq.addFile(".", archivePath, testFile1Path);
      await zpaq.addFile(".", archivePath, testFile2Path);
      expect(await fs.pathExists(archivePath)).toBeTruthy();
    });
  });
  describe("Can list versions", () => {
    test("can list versions of an archive", async () => {
      expect.assertions(3);
      let versions = await zpaq.listVersions(".", archivePath);
      expect(versions).toHaveLength(2);
      let timeDifference = moment.utc(versions[0]).diff(startTime);
      expect(timeDifference).toBeLessThanOrEqual(2000);
      expect(timeDifference).toBeGreaterThanOrEqual(-2000);
    });
  });
  describe("Can restore a file to previous state", () => {
    test("can list versions of an archive", async () => {
      expect.assertions(3);
      await wait(4000);
      editTime = moment.utc();
      await fs.writeFile(testFile1Path, "File 1, Version 2");
      await fs.remove(testFile2Path);
      expect(await fs.pathExists(testFile2Path)).toBeFalsy();
      console.log("editTime", editTime.format("YYYY-MM-DD HH:mm:ss"));
      await zpaq.extractUntil(
        ".",
        archivePath,
        editTime.format("YYYY-MM-DD HH:mm:ss")
      );
      expect(await fs.pathExists(testFile2Path)).toBeTruthy();
      expect(await fs.readFile(testFile1Path, "utf8")).toBe(
        "File 1, Version 1"
      );
    });
  });
  afterAll(async () => {
    await fs.remove(archivePath);
    await fs.remove(testFile1Path);
    await fs.remove(testFile2Path);
  });
});
