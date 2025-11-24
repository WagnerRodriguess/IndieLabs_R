import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password, recoveryKey } = body;

    if (!username || !password || !email || !recoveryKey) {
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios' }, 
        { status: 400 }
      );
    }

    const cleanUsername = username.trim();

    if (!cleanUsername) {
      return NextResponse.json(
        { message: 'Nome de usuário inválido.' }, 
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'A senha deve ter pelo menos 6 caracteres.' }, 
        { status: 400 }
      );
    }

    const exists = await prisma.user.findFirst({
      where: { 
        OR: [
          { username: username },
          { email: email }
        ]
      }
    });

    if (exists) {
      return NextResponse.json(
        { message: 'Usuário ou E-mail já cadastrados' }, 
        { status: 409 }
      );
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username: cleanUsername,
        email,
        password: hashedPassword,
        recoveryKey: recoveryKey,
      },
    });

    return NextResponse.json(user, { status: 201 });

  } catch (error) {
    console.error('ERRO NO CADASTRO:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor ao criar conta.' }, 
      { status: 500 }
    );
  }
}