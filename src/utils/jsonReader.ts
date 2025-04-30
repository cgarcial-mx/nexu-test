import fs from 'fs';
import path from 'path';
import { JsonData } from '../types';

/**
 * Read and parse a JSON file from data directory
 * @param {string} filename - Name of the file without extension
 * @returns {JsonData} Parsed JSON data
 */
export const readJsonFile = (filename: string): JsonData => {
  try {
    const filePath = path.join(__dirname, '../../../data', `${filename}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error(`File "${filename}.json" not found`);
    }
    throw new Error(`Error reading "${filename}.json": ${(error as Error).message}`);
  }
};
