import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.username) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return new NextResponse('Preencha todos os campos', { status: 400 });
    }

    if (newPassword.length < 6) {
      return new NextResponse('A nova senha deve ter no mínimo 6 caracteres', { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username: session.user.username }
    });

    if (!user || !user.password) {
      return new NextResponse('Usuário não encontrado', { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordCorrect) {
      return new NextResponse('A senha atual está incorreta', { status: 403 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { username: session.user.username },
      data: { password: hashedPassword }
    });

    return NextResponse.json({ message: 'Senha alterada com sucesso' });

  } catch (error) {
    return new NextResponse('Erro interno', { status: 500 });
  }
}