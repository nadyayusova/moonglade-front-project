/**
 * Simplified copying of git hook files
 * ver 0.1.4
 * by MLW S
 */

const fs = require('fs')
const path = require('path')

console.log('[HOOKS_COPY] Start copying hooks files')

const FOLDER_HOOKS = 'git-hooks'
const FOLDER_SCRIPT = 'scripts'
const PATH_GIT_HOOKS = '.git/hooks'

const pathToHooks = path.resolve(FOLDER_SCRIPT, FOLDER_HOOKS)
const isExistHooksFolder = fs.existsSync(pathToHooks)

if (!isExistHooksFolder)
	throw new Error('[HOOKS_COPY] Folder with hooks is not exists')

const pathToGitFolder = path.resolve(PATH_GIT_HOOKS)
const isExistGitFolder = fs.existsSync(pathToGitFolder)

if (!isExistGitFolder) throw new Error('[HOOKS_COPY] Git Folder is not exists')

const hooksFiles = fs.readdirSync(path.resolve(FOLDER_SCRIPT, FOLDER_HOOKS))
const copyErrorStack = []

for (const fileName of hooksFiles) {
	const pathHookFile = path.join(pathToHooks, fileName)
	try {
		fs.copyFileSync(pathHookFile, path.join(pathToGitFolder, fileName))
	} catch (error) {
		copyErrorStack.push(fileName)
	}
}

if (copyErrorStack.length) {
	console.error('[HOOKS_COPY] Error copying hooks files')
	console.table(copyErrorStack)
	throw new Error('[HOOKS_COPY] Error copying hooks files')
}

console.log('[HOOKS_COPY] Successful copying hooks files')
