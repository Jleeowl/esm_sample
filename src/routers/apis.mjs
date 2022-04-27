import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const base = process.cwd()

import glob from 'glob'
import { resolve, relative, join, dirname, basename } from 'path'
import express from 'express'

import url from 'url'

const router = express.Router()

router.use(express.json())

glob.sync(resolve(base, 'src', 'server/api/**/*.mjs')).forEach(file => {
    const relativepath = relative(join(base, 'src', 'server', 'api'), file)
    const apipath = join(dirname(relativepath), basename(relativepath, '.mjs'))

    import(url.pathToFileURL(file)).then(importedFile => {
        router.use(`/api/${apipath}`.replace(/\\/g, '/'), importedFile.default)
    })
})

export default router
