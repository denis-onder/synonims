const fs = require("fs");
const input = require("./input.json");

const STATUS = {
  SYNONIMS: "synonims",
  DIFFERENT: "different",
};

const NUMBER_OF_TEST_CASES = Number(input.T);

const OUTPUT_FILE_PATH = "./output.txt";

function buildWordPair(wordPair) {
  return {
    first: wordPair[0].trim().toLowerCase(),
    second: wordPair[1].trim().toLowerCase(),
  };
}

function validateWordPair(queryWordPair, dictionaryWordPair) {
  let result = false;

  if (
    (queryWordPair.first === dictionaryWordPair.first &&
      queryWordPair.second === dictionaryWordPair.second) ||
    (queryWordPair.second === dictionaryWordPair.first &&
      queryWordPair.second === dictionaryWordPair.second)
  ) {
    result = true;
  }

  return result;
}

function recordResultsToFile(results) {
  if (fs.existsSync(OUTPUT_FILE_PATH)) {
    fs.rmSync(OUTPUT_FILE_PATH);
  }

  fs.writeFileSync(OUTPUT_FILE_PATH, results.join("\n"), {
    encoding: "utf-8",
  });
}

function main() {
  const results = [];

  for (let i = 0; i < NUMBER_OF_TEST_CASES; i++) {
    const testCase = input.testCases[i];

    if (testCase.N === 0 || testCase.Q === 0) {
      continue;
    }

    for (let j = 0; j < testCase.Q; j++) {
      let status = STATUS.DIFFERENT;

      const query = testCase.queries[j];

      const queryWordPair = buildWordPair(query);

      if (queryWordPair.first === queryWordPair.second) {
        status = STATUS.SYNONIMS;
      } else {
        for (let k = 0; k < testCase.dictionary.length; k++) {
          const dictionaryEntry = testCase.dictionary[k];

          const dictionaryWordPair = buildWordPair(dictionaryEntry);

          const isSynonim = validateWordPair(queryWordPair, dictionaryWordPair);

          if (isSynonim) {
            status = STATUS.SYNONIMS;
            continue;
          }
        }
      }

      results.push(status);
    }
  }

  recordResultsToFile(results);
}

main();
