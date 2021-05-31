#!/usr/bin/env node
import { main } from './main'

const cli = (async () => {  
  return await main()
})()

export default cli
