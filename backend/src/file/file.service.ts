import { Injectable } from '@nestjs/common';
import appRootPath from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { join } from 'path';
import { FileResponse } from './file.interface';
@Injectable()
export class FileService {
  async saveFiles(files: Express.Multer.File[], folder: string = 'products') {
    const uploadedFolder = join(String(appRootPath), 'uploads', folder);

    await ensureDir(uploadedFolder);

    const response: FileResponse[] = await Promise.all(
      files.map(async (file) => {
        const originalName = `${Date.now()}-${file.originalname}`;
        await writeFile(join(uploadedFolder, originalName), file.buffer);

        return {
          url: `uploads/${folder}/${originalName}`,
          name: originalName,
        };
      }),
    );

    return response;
  }
}
