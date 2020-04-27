const execa = require('execa');

const zpaqBinPath = process.platform === 'win32' ? './bin/zpaq.exe' : './bin/zpaq' ;

const listVersions = async function(archivePath){
	const { stdout, stderr } = await execa(zpaqBinPath, [
		'v',
		archivePath,
		'-s1' // Summary level 1 option, which means quiet after our modifications
	])
	return stdout.split(/\r?\n/)
}

const addFiles = async function(archivePath, files){
	const { stdout, stderr } = await execa(zpaqBinPath, [
		'add',
		archivePath,
		files,
		'-s1' // Summary level 1 option, which means quiet after our modifications
	])
	return stdout.split(/\r?\n/)
}

const extractVersion = async function(archivePath, versionDate){
	const { stdout, stderr } = await execa(zpaqBinPath, [
		'x',
		archivePath,
		'-until',
		versionDate,
		'-s1' // Summary level 1 option, which means quiet after our modifications
	])
	return stdout.split(/\r?\n/)
}

module.exports = {listVersions, addFiles, extractVersion};