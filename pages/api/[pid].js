import * as React from 'react'
import * as fs from 'fs'
import * as path from 'path'


export default (req, res) => {
  const { pid } = req.query

  try {
    const jsonPath = path.join(process.cwd(), 'src', 'cardType', pid+'.json')
    const jsonText = fs.readFileSync(jsonPath, 'utf-8')
    const json = JSON.parse(jsonText)

    res.status(200).json(json)
  } catch {
    res.status(500).json({ error: 'failed to load data' })
  }
};
