const { argv } = require('yargs');
const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');
const { isEmpty } = require('lodash');

const execute = () => {

  const files = getArgs();  
  console.log(`processing ${files.input}...`);

  processFile(files.input, files.output);
}

const getArgs = () => {
  const usage = () => {
    const doc = `
      Usage:
        node process-file.js --filename=<input_file>.csv --output=<output_file>.csv
  
      Args:
         --filename                      The file to be processed
         --output                        The file in which to save the output. Defaults to output.csv if not specified
      `;
    console.log(doc);
  }

  if (!argv.filename) {
    usage();
    throw Error('Missing required parameter "filename"');
  }
  
  const files = {
    input: argv.filename,
    output: path.resolve(__dirname, argv.output || 'output.csv'),
  }

  return files;
}

const validateParsedFile = (parsedFile) => {
  return parsedFile.validate(
    (row, cb) => {
      if (isEmpty(row.debtor)) {
        return cb(null, false, 'Missing value: debtor');
      }
      if (isEmpty(row.creditor)) {
        return cb(null, false, 'Missing value: creditor');
      }
      if (isNaN(row.debit)) {
        return cb(null, false, 'Invalid debit value');
      }
      return cb(null, true);
    });
}

const checkForDataInvalid = (validated) => {
  return validated.on('data-invalid', (row, rowNumber, reason) => { throw Error(`${reason} [row: ${rowNumber}] [row=${JSON.stringify(row)}]`) })
}

const summarize = (fileAfterInvalidCheck, outputFile) => {
  const debtList = [];
  fileAfterInvalidCheck.on('data', data => {
    data = {
      debtor: data.debtor,
      creditor: data.creditor,
      debit: Number(data.debit),
    }

    const debtListItem = debtList.find(item => `${item.debtor}-${item.creditor}` === `${data.debtor}-${data.creditor}`);
    if (!debtListItem) {
      debtList.push(data);
    } else {
      debtListItem.debit += data.debit;
    }
  })
  .on('end', () => {
    debtList.sort(function (a, b) {
      if (a.debtor != b.debtor) {
        return a.debtor.localeCompare(b.debtor);
      }
      return a.creditor.localeCompare(b.creditor);
    });

    const outputStream = fs.createWriteStream(outputFile);
    console.log(`Writing to ${outputFile}...`);
    csv
      .write(debtList)
      .pipe(outputStream);
  })
}

const processFile = (inputFile, outputFile) => {

  if (typeof inputFile !== 'string') {
    throw Error('You have entered incorrect value "filename"');
  }
  const parsedFile = csv.parseFile(inputFile, { headers: ['debtor', 'creditor', 'debit'], ignoreEmpty: true, strictColumnHandling: true })
  const validated = validateParsedFile(parsedFile);
  const fileAfterInvalidCheck = checkForDataInvalid(validated);
  summarize(fileAfterInvalidCheck, outputFile);

  console.log('Complete');
  console.log(path.resolve(__dirname, 'test', 'testFiles'));
}

module.exports = {
  execute,
  processFile
}



