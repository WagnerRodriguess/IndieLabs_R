import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) return new NextResponse('Slug obrigatório', { status: 400 });

  try {
    const allComments = await prisma.comment.findMany({
      where: { gameSlug: slug },
      include: {
        user: { select: { username: true, image: true } }
      },
      orderBy: { createdAt: 'asc' } 
    });

    const commentMap = new Map();
    const rootComments: any[] = [];

    allComments.forEach(comment => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    allComments.forEach(comment => {
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId);
        if (parent) {
          parent.replies.push(commentMap.get(comment.id));
        }
      } else {
        rootComments.push(commentMap.get(comment.id));
      }
    });

    rootComments.reverse();

    return NextResponse.json(rootComments);

  } catch (error) {
    console.error(error);
    return new NextResponse('Erro ao buscar comentários', { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.username) return new NextResponse('Não autorizado', { status: 401 });

  try {
    const body = await req.json();
    const { content, gameSlug, parentId } = body;

    if (!content || !gameSlug) return new NextResponse('Dados inválidos', { status: 400 });

    const user = await prisma.user.findUnique({ where: { username: session.user.username } });
    if (!user) return new NextResponse('Usuário não encontrado', { status: 404 });

    const newComment = await prisma.comment.create({
      data: {
        content,
        gameSlug,
        parentId: parentId || null, 
        userId: user.id,
      },
      include: { user: { select: { username: true, image: true } } } 
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return new NextResponse('Erro ao criar comentário', { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse('Não autorizado', { status: 401 });

  try {
    const body = await req.json();
    const { commentId, content } = body;

    const comment = await prisma.comment.findUnique({ where: { id: commentId }, include: { user: true } });

    if (!comment) return new NextResponse('Comentário não encontrado', { status: 404 });
    if (comment.user.username !== session.user.username) return new NextResponse('Proibido', { status: 403 });

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });

    return NextResponse.json(updatedComment);
  } catch (error) {
    return new NextResponse('Erro ao editar', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse('Não autorizado', { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get('id');

    if (!commentId) return new NextResponse('ID necessário', { status: 400 });

    const comment = await prisma.comment.findUnique({ where: { id: commentId }, include: { user: true } });

    if (!comment) return new NextResponse('Comentário não encontrado', { status: 404 });
    if (comment.user.username !== session.user.username) return new NextResponse('Proibido', { status: 403 });

    await prisma.comment.delete({ where: { id: commentId } });

    return NextResponse.json({ message: 'Deletado' });
  } catch (error) {
    return new NextResponse('Erro ao deletar', { status: 500 });
  }
}