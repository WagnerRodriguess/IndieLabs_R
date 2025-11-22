import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.username) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    await prisma.user.delete({
      where: {
        username: session.user.username,
      },
    });

    return NextResponse.json({ message: 'Conta excluída com sucesso!' });
  } catch (error) {
    return new NextResponse('Erro ao excluir conta', { status: 500 });
  }
}