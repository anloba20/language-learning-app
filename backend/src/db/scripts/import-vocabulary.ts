import fs from 'node:fs';
import path from 'node:path';

import { db } from '../database';

type VocabularyRow = {
  topic_slug: string;
  part_of_speech: string;
  level: number;
  translations: Record<string, string>;
  meta: Record<string, unknown>;
};

function parseCsvLine(line: string) {
  const values: string[] = [];
  let currentValue = '';
  let isInsideQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const currentChar = line[i];
    const nextChar = line[i + 1];

    if (currentChar === '"') {
      if (isInsideQuotes && nextChar === '"') {
        currentValue += '"';
        i += 1;
      } else {
        isInsideQuotes = !isInsideQuotes;
      }

      continue;
    }

    if (currentChar === ',' && !isInsideQuotes) {
      values.push(currentValue);
      currentValue = '';
      continue;
    }

    currentValue += currentChar;
  }

  values.push(currentValue);

  return values;
}

function parseVocabularyRow(line: string): VocabularyRow {
  const [topicSlug, partOfSpeech, level, translations, meta] = parseCsvLine(line);

  return {
    topic_slug: topicSlug,
    part_of_speech: partOfSpeech,
    level: Number(level),
    translations: JSON.parse(translations),
    meta: JSON.parse(meta),
  };
}

const vocabularyFiles = [
  'a1_vocabulary_level_1.csv',
  'a2_vocabulary_level_2.csv',
  'b1_vocabulary_level_3.csv',
  'b2_vocabulary_level_4.csv',
  'c1_vocabulary_level_5.csv',
  'c2_vocabulary_level_6.csv',
];

async function importVocabulary() {
   const csvDir = path.join(process.cwd(), 'src', 'db', 'csv');
  const vocabularyRows: VocabularyRow[] = [];

  for (const fileName of vocabularyFiles) {
    const filePath = path.join(csvDir, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n').filter(Boolean);

    const dataLines = lines.slice(1);
    const rows = dataLines.map(parseVocabularyRow);

    vocabularyRows.push(...rows);

    console.log(fileName, 'rows:', rows.length);
  }

  console.log('Total rows:', vocabularyRows.length);

  await db.transaction(async (trx) => {
  await trx('vocabulary')
    .whereIn('level', [1, 2, 3, 4, 5, 6])
    .delete();

  await trx.batchInsert('vocabulary', vocabularyRows, 500);
  console.log('Vocabulary import completed');
});


}

importVocabulary()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.destroy();
  });