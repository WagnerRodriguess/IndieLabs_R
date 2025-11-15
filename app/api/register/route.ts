import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body; 

    if (!username || !password) {
      return new NextResponse('Usuário e senha são obrigatórios', { status: 400 });
    }
    const existingUser = await prisma.user.findUnique({
      where: { username: username },
    });

    if (existingUser) {
      return new NextResponse('Esse nome de usuário já está em uso', { status: 409 });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    return NextResponse.json(user, { status: 201 });

  } catch (error) {
    console.error('ERRO NO REGISTRO:', error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}