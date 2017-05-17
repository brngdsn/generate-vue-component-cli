#! /usr/bin/env node

let chalk = require('chalk');

console.log(chalk.gray.bgBlue.bold('generate a vuejs single file component'));

//
// e.g., 
//
//   $ node scripts/generate-component eg-component-name component/directory
//
//

let fs = require('fs');

let componentSlugName = process.argv[2] || 'eg-component-name';
let componentDirectory = process.argv[3] || 'src/components';

let componentCapitolName = componentSlugName
  .replace(/\b[a-z]/g,f => f.toUpperCase())
  .replace(/\-/g,'')
;

console.log(chalk.gray.bgMagenta.bold('componentSlugName:'),chalk.underline.magenta.bold(componentSlugName))
console.log(chalk.gray.bgCyan.bold('componentDirectory:'),chalk.underline.cyan.bold(componentDirectory))

let template = `<template><div class="${componentSlugName}">

  ${componentSlugName}

</div></template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: '${componentSlugName}',
    data () {
      return {
        busy: false
      }
    },
    computed: {
      ...mapGetters([
        // some state
      ])
    },
    methods: {
      ...mapActions([
        // some action
      ]),
      async fetch () {
        this.busy = true
        await Promise.resolve()
        this.busy = false
      }
    },
    async created () {
      this.fetch()
    },
    mounted () {
      console.log('* Mounted ${componentCapitolName}!')
    }
  }
</script>

<style scoped>
  .${componentSlugName} {

  }
</style>
`; // (lint)

console.log(chalk.gray.bgWhite.bold('template:'),chalk.underline.white.bold(template.length));

console.log(chalk.gray.bgYellow.bold('writing...'));

let file = `${componentDirectory}/${componentCapitolName}.vue`;

let data = template;

console.log(chalk.gray.bgWhite.bold('file:'),chalk.underline.white.bold(file));

try {
  fs.writeFileSync(file,data);
} catch (e) {
  console.log(chalk.gray.bgRed.bold(e));
  console.log(
    chalk.red.bold(`have you tried `),
    chalk.red.bgBlack.bold(`mkdir ${componentDirectory}`),
    chalk.red.bold(` yet ?`)
  )
}

console.log(chalk.gray.bgGreen.bold('done'));