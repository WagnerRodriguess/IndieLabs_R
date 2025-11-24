import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, recoveryKey, newPassword } = await req.json();

    if (!email || !recoveryKey || !newPassword) {
      return new NextResponse('Preencha todos os campos.', { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return new NextResponse('E-mail não encontrado.', { status: 404 });
    }

    if (user.recoveryKey.toLowerCase() !== recoveryKey.toLowerCase()) {
      return new NextResponse('Palavra de recuperação incorreta.', { status: 401 });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    });

    return NextResponse.json({ message: 'Senha alterada com sucesso!' });

  } catch (error) {
    return new NextResponse('Erro interno.', { status: 500 });
  }
}