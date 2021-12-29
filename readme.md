# zpaq-node-wrapper

A very basic nodejs wrapper around the [zpaq cli](https://github.com/zpaq/zpaq).

Using zpaq 7.15 as a base, I also added an option to list all versions using 'v'.

## Documentation

<dl>
<dt><a href="#zpaqBinPath">zpaqBinPath</a></dt>
<dd><p>The path to the binary executable for zpaq. Works in electron environments. Works with macOS and windows.</p>
</dd>
</dl>

<dl>
<dt><a href="#listVersions">listVersions(basePath, archivePath)</a> ⇒ <code>Promsise.&lt;Array.&lt;string&gt;&gt;</code></dt>
<dd><p>Lists all versions of an archive</p>
</dd>
<dt><a href="#addFile">addFile(basePath, archivePath, relativeFilePath)</a> ⇒ <code>Promise.&lt;execa.ExecaReturnBase&gt;</code></dt>
<dd><p>Adds a relative or absolute file or directory to an archive.</p>
</dd>
<dt><a href="#extractUntil">extractUntil(basePath, archivePath, versionDate)</a> ⇒ <code>Promise.&lt;execa.ExecaReturnBase&gt;</code></dt>
<dd><p>Extract an archive until a given date.</p>
</dd>
</dl>

<a name="zpaqBinPath"></a>

### zpaqBinPath

The path to the binary executable for zpaq. Works in electron environments. Works with macOS and windows.

<a name="listVersions"></a>

### listVersions(basePath, archivePath) ⇒ <code>Promsise.&lt;Array.&lt;string&gt;&gt;</code>

Lists all versions of an archive

**Returns**: <code>Promsise.&lt;Array.&lt;string&gt;&gt;</code> - The archive versions formated as `YYYY-MM-DD HH:mm:SS` strings (UTC)

| Param       | Type                | Description                                                                                                               |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| basePath    | <code>string</code> | The path form which the zpaq command is executed. All files added with relative paths must be relative to this directory. |
| archivePath | <code>string</code> | The path to the zpaq archive                                                                                              |

<a name="addFile"></a>

### addFile(basePath, archivePath, relativeFilePath) ⇒ <code>Promise.&lt;execa.ExecaReturnBase&gt;</code>

Adds a relative or absolute file or directory to an archive.

**Returns**: <code>Promise.&lt;execa.ExecaReturnBase&gt;</code> - The execa process

| Param            | Type                | Description                                                                                                               |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| basePath         | <code>string</code> | The path form which the zpaq command is executed. All files added with relative paths must be relative to this directory. |
| archivePath      | <code>string</code> | The path to the zpaq archive                                                                                              |
| relativeFilePath | <code>string</code> | The path to the file or directory to add to the archive. If relative, this path must be relative to basePath              |

<a name="extractUntil"></a>

### extractUntil(basePath, archivePath, versionDate) ⇒ <code>Promise.&lt;execa.ExecaReturnBase&gt;</code>

Extract an archive until a given date.

**Returns**: <code>Promise.&lt;execa.ExecaReturnBase&gt;</code> - The execa process

| Param       | Type                | Description                                                                                                               |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| basePath    | <code>string</code> | The path form which the zpaq command is executed. All files added with relative paths must be relative to this directory. |
| archivePath | <code>string</code> | The path to the zpaq archive                                                                                              |
| versionDate | <code>string</code> | The date until which to extract the archive (UTC)                                                                         |

## To Compile

Refer to https://github.com/zpaq/zpaq

### Windows

Use http://files.1f0.de/mingw/mingw-w64-gcc-6.1-stable-r20.7z
Use the compiler binaries in bin/

For 64bit

```bash
86_64-w64-mingw32-g++.exe -O3 -s -m64 -msse2 -static zpaq.cpp libzpaq.cpp -o zpaq64
```

For 32bit

```bash
i686-w64-mingw32-g++.exe -O3 -s -m32 -msse2 -static zpaq.cpp libzpaq.cpp -o zpaq
```

### macOS

Simply use the makefile :

```bash
cd zpaq;
make
```


### To publish to GHCR

Add this to `package.json`
```json
  "publishConfig": {
    "registry":"https://npm.pkg.github.com"
  },
```

and add a `.npmrc` to the root of the repo with 
```.npmrc
//npm.pkg.github.com/:_authToken=AUTH_TOKEN
```
Where `AUTH_TOKEN` is replaced with a GitHub token.