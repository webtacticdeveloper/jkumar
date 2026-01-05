// main-project/app/api/projects/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { ProjectCategory } from '@/data/projectsData';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3001',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

// GET - Read all data
export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'projectsData.json');
    const fileContent = await readFile(dataPath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    return NextResponse.json(data, { headers: corsHeaders });
  } catch (error) {
    console.error('Error reading data:', error);
    return NextResponse.json(
      { error: 'Failed to read data' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST - Add project to category OR create new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const dataPath = path.join(process.cwd(), 'data', 'projectsData.json');
    const fileContent = await readFile(dataPath, 'utf-8');
    const data: ProjectCategory[] = JSON.parse(fileContent);

    // Check if adding a new category
    if (body.type === 'category') {
      const newCategory: ProjectCategory = {
        id: body.category.id,
        title: body.category.title,
        description: body.category.description,
        image: body.category.image || '',
        showcaseImages: body.category.showcaseImages || [],
        projects: [],
      };
      data.push(newCategory);
    } 
    // Adding project to existing category
    else {
      const { categoryId, project } = body;
      const category = data.find((cat) => cat.id === categoryId);
      if (!category) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404, headers: corsHeaders }
        );
      }
      category.projects.push(project);
    }

    await writeFile(dataPath, JSON.stringify(data, null, 2));

    return NextResponse.json(
      { success: true, message: 'Data added successfully' },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error updating data:', error);
    return NextResponse.json(
      { error: 'Failed to update data' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// PUT - Update category or project
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const dataPath = path.join(process.cwd(), 'data', 'projectsData.json');
    const fileContent = await readFile(dataPath, 'utf-8');
    const data: ProjectCategory[] = JSON.parse(fileContent);

    if (body.type === 'category') {
      const categoryIndex = data.findIndex((cat) => cat.id === body.categoryId);
      if (categoryIndex === -1) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404, headers: corsHeaders }
        );
      }
      // Update category but keep existing projects
      data[categoryIndex] = {
        ...data[categoryIndex],
        ...body.category,
        projects: data[categoryIndex].projects,
      };
    } else if (body.type === 'project') {
      const category = data.find((cat) => cat.id === body.categoryId);
      if (!category) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404, headers: corsHeaders }
        );
      }
      const projectIndex = category.projects.findIndex((p) => p.id === body.projectId);
      if (projectIndex === -1) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404, headers: corsHeaders }
        );
      }
      category.projects[projectIndex] = body.project;
    }

    await writeFile(dataPath, JSON.stringify(data, null, 2));

    return NextResponse.json(
      { success: true, message: 'Data updated successfully' },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error updating data:', error);
    return NextResponse.json(
      { error: 'Failed to update data' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE - Delete category or project
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const categoryId = searchParams.get('categoryId');
    const projectId = searchParams.get('projectId');

    const dataPath = path.join(process.cwd(), 'data', 'projectsData.json');
    const fileContent = await readFile(dataPath, 'utf-8');
    let data: ProjectCategory[] = JSON.parse(fileContent);

    if (type === 'category' && categoryId) {
      data = data.filter((cat) => cat.id !== categoryId);
    } else if (type === 'project' && categoryId && projectId) {
      const category = data.find((cat) => cat.id === categoryId);
      if (!category) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404, headers: corsHeaders }
        );
      }
      category.projects = category.projects.filter((p) => p.id !== projectId);
    }

    await writeFile(dataPath, JSON.stringify(data, null, 2));

    return NextResponse.json(
      { success: true, message: 'Data deleted successfully' },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error deleting data:', error);
    return NextResponse.json(
      { error: 'Failed to delete data' },
      { status: 500, headers: corsHeaders }
    );
  }
}
