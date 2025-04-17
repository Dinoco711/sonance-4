import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Construct the file path relative to src/app/assets
    const filePath = path.join(process.cwd(), 'src', 'app', 'assets', ...params.path);
    
    // For security, ensure the path is within the assets directory
    const assetsPath = path.join(process.cwd(), 'src', 'app', 'assets');
    if (!filePath.startsWith(assetsPath)) {
      return new NextResponse('Access denied', { status: 403 });
    }

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 });
    }
    
    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    const response = new NextResponse(fileBuffer);
    
    // Set appropriate content type based on file extension
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.mp3') {
      response.headers.set('Content-Type', 'audio/mpeg');
    } else if (ext === '.jpg' || ext === '.jpeg') {
      response.headers.set('Content-Type', 'image/jpeg');
    } else if (ext === '.png') {
      response.headers.set('Content-Type', 'image/png');
    }
    
    return response;
  } catch (error) {
    console.error('Error serving asset:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 