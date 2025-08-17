import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ReleaseOutputDTO } from '../../dtos/release-create-order.dto';

/**
 * Service responsible for file output operations.
 * Handles saving transformation results to file system with proper error handling.
 * 
 * Domain: File I/O Operations
 * Responsibilities: File creation, directory management, output formatting
 */
@Injectable()
export class FileOutputService {
  
  /**
   * Save transformed order data to JSON file
   * @param transformedData The release output data to save
   * @param orderId Order identifier for file naming
   * @param outputDir Optional output directory (defaults to ./release)
   * @returns Promise resolving to the file path where data was saved
   */
  public async saveOrderToFile(
    transformedData: ReleaseOutputDTO,
    orderId: string,
    outputDir?: string
  ): Promise<string> {
    try {
      // Use project-relative path by default
      const defaultOutputDir = path.join(process.cwd(), 'release');
      const targetOutputDir = outputDir || defaultOutputDir;
      
      // Ensure output directory exists
      await this.ensureDirectoryExists(targetOutputDir);

      // Generate file name and path
      const fileName = `orderid${orderId}.json`;
      const filePath = path.join(targetOutputDir, fileName);

      // Save file with formatted JSON
      const jsonContent = JSON.stringify(transformedData, null, 2);
      fs.writeFileSync(filePath, jsonContent, 'utf-8');

      return filePath;
    } catch (error) {
      throw new Error(`Failed to save order file: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Save any JSON data to file with custom naming
   * @param data Data object to save
   * @param fileName Custom file name (without extension)
   * @param outputDir Optional output directory
   * @returns Promise resolving to file path
   */
  public async saveJsonToFile(
    data: any,
    fileName: string,
    outputDir?: string
  ): Promise<string> {
    try {
      const defaultOutputDir = path.join(process.cwd(), 'output');
      const targetOutputDir = outputDir || defaultOutputDir;
      
      await this.ensureDirectoryExists(targetOutputDir);

      const fullFileName = fileName.endsWith('.json') ? fileName : `${fileName}.json`;
      const filePath = path.join(targetOutputDir, fullFileName);

      const jsonContent = JSON.stringify(data, null, 2);
      fs.writeFileSync(filePath, jsonContent, 'utf-8');

      return filePath;
    } catch (error) {
      throw new Error(`Failed to save JSON file: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Ensure directory exists, create if it doesn't
   * @param dirPath Directory path to check/create
   */
  private async ensureDirectoryExists(dirPath: string): Promise<void> {
    try {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    } catch (error) {
      throw new Error(`Failed to create directory ${dirPath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get list of files in directory
   * @param dirPath Directory to list files from
   * @param extension Optional file extension filter (e.g., '.json')
   * @returns Array of file names
   */
  public getFilesInDirectory(dirPath: string, extension?: string): string[] {
    try {
      if (!fs.existsSync(dirPath)) {
        return [];
      }

      const files = fs.readdirSync(dirPath);
      
      if (extension) {
        return files.filter(file => file.endsWith(extension));
      }
      
      return files;
    } catch (error) {
      throw new Error(`Failed to read directory ${dirPath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Check if file exists
   * @param filePath Path to file
   * @returns True if file exists
   */
  public fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  /**
   * Delete file if it exists
   * @param filePath Path to file to delete
   * @returns True if file was deleted, false if it didn't exist
   */
  public deleteFile(filePath: string): boolean {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Failed to delete file ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}