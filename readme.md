# zpaq-node-wrapper

A very basic nodejs wrapper around the [zpaq cli](https://github.com/zpaq/zpaq).

Using zpaq 7.15 as a base, I also added an option to list all versions using 'v'.

## Usage

```js
import zpaq from "zpaq-node-wrapper";

async function main() {
  //
  await zpaq.listVersions(folderPath, archiveRelativePath);
  await zpaq.addFile(folderPath, archiveRelativePath, fileRelativePath);
  await zpaq.extractUntil(folderPath, archiveRelativePath, versionDate);
}
```

## To Compile

Refer to https://github.com/zpaq/zpaq

### Windows

Use http://files.1f0.de/mingw/mingw-w64-gcc-6.1-stable-r20.7z
Use the compiler binaries in bin/

For 64bit
86_64-w64-mingw32-g++.exe -O3 -s -m64 -msse2 -static zpaq.cpp libzpaq.cpp -o zpaq64

For 32bit
i686-w64-mingw32-g++.exe -O3 -s -m32 -msse2 -static zpaq.cpp libzpaq.cpp -o zpaq

### macOS

Simply use the makefile :

```bash
cd zpaq;
make
```
