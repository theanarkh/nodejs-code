#!/usr/bin/env node

require('../module');
const path = require('path');
require(path.resolve(process.cwd(), process.argv[2]));
