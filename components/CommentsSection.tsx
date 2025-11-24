'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { User, Send, Trash2, Edit2, MessageSquare, Check } from 'lucide-react';
import Link from 'next/link';
import ConfirmModal from './ConfirmModal';

type CommentUser = {
  username: string;
  image: string | null;
};

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: CommentUser;
  replies?: Comment[];
  parentId: string | null;
};

const CommentItem = ({ 
  comment, 
  isReply = false, 
  session, 
  replyingTo, 
  setReplyingTo, 
  replyContent, 
  setReplyContent, 
  handleReplySubmit, 
  editingId, 
  setEditingId, 
  editContent, 
  setEditContent, 
  handleEditSubmit, 
  onDeleteClick,
  editingMention,
  setEditingMention
}: any) => {
  const isOwner = session?.user?.username === comment.user.username;
  const isEditing = editingId === comment.id;
  const isEdited = new Date(comment.updatedAt).getTime() > new Date(comment.createdAt).getTime();

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      action();
    }
  };

  const startReply = () => {
    if (replyingTo === comment.id) {
      setReplyingTo(null);
      setReplyContent('');
    } else {
      setReplyingTo(comment.id);
      setReplyContent(''); 
    }
  };

  const submitWithMention = () => {
    const finalContent = `@${comment.user.username} ${replyContent}`;
    handleReplySubmit(comment.id, finalContent);
  };

  const handleStartEdit = () => {
    setEditingId(comment.id);
    const match = comment.content.match(/^(@\w+)\s+([\s\S]*)/);

    if (match) {
      setEditingMention(match[1]); 
      setEditContent(match[2]);    
    } else {
      setEditingMention(null);
      setEditContent(comment.content);
    }
  };

  return (
    <div className={isReply ? 'comment-reply-container' : ''}>
      <div className="comment-item">
        
        <div className="comment-header">
          <div className="comment-user-info">
            {comment.user.image ? (
               <img src={comment.user.image} alt="Avatar" style={{width:'2rem', height:'2rem', borderRadius:'50%', objectFit:'cover'}} />
            ) : (
               <div className="comment-avatar-placeholder"><User size={16} /></div>
            )}
            <div>
              <p className="comment-username">{comment.user.username}</p>
              <p className="comment-date">
                {new Date(comment.createdAt).toLocaleDateString()}
                {isEdited && <span className="comment-edited">(editado)</span>}
              </p>
            </div>
          </div>
          
          {isOwner && !isEditing && (
            <div className="comment-actions">
              <button onClick={handleStartEdit} className="comment-action-icon" title="Editar">
                <Edit2 size={14} />
              </button>
              <button onClick={() => onDeleteClick(comment.id)} className="comment-action-icon delete" title="Excluir">
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="comment-edit-area">
            
            {editingMention ? (
               <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(155,101,236,0.5)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  marginTop: '0.5rem'
               }}>
                  <span style={{ 
                      color: '#c084fc', 
                      fontWeight: 'bold', 
                      marginRight: '0.5rem',
                      userSelect: 'none',
                      whiteSpace: 'nowrap',
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      marginTop: '0', 
                  }}>
                    {editingMention}
                  </span>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, () => handleEditSubmit(comment.id))}
                    rows={2}
                    autoFocus
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#fff',
                      fontSize: '0.95rem',
                      fontFamily: 'inherit',
                      resize: 'none',
                      padding: 0,
                      margin: 0,
                      lineHeight: '1.5'
                    }}
                  />
               </div>
            ) : (
               <textarea
                 value={editContent}
                 onChange={(e) => setEditContent(e.target.value)}
                 onKeyDown={(e) => handleKeyDown(e, () => handleEditSubmit(comment.id))}
                 rows={2}
                 autoFocus
               />
            )}

            <div className="comment-edit-actions">
              <button onClick={() => setEditingId(null)} className="btn-small btn-cancel">Cancelar</button>
              <button onClick={() => handleEditSubmit(comment.id)} className="btn-small btn-save">Salvar</button>
            </div>
          </div>
        ) : (
          <p className="comment-text">
            {comment.content.split(' ').map((word: string, i: number) => {
              if (word.startsWith('@')) return <span key={i} style={{color:'#c084fc', fontWeight:'bold'}}>{word} </span>;
              return word + ' ';
            })}
          </p>
        )}

        {session && !isEditing && (
          <div style={{ marginTop: '0.5rem' }}>
            <button onClick={startReply} className="btn-reply-text">
              <MessageSquare size={14} /> {replyingTo === comment.id ? 'Cancelar' : 'Responder'}
            </button>

            {replyingTo === comment.id && (
              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid rgba(155,101,236,0.5)', borderRadius: '8px', backgroundColor: 'transparent', paddingLeft: '0.5rem' }}>
                  <span style={{ color: '#c084fc', fontWeight: 'bold', marginRight: '0.25rem', userSelect: 'none', whiteSpace: 'nowrap' }}>
                    @{comment.user.username}
                  </span>
                  <input
                    type="text"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, submitWithMention)}
                    placeholder="escreva sua resposta..."
                    style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', padding: '0.5rem 0', fontSize: '0.95rem' }}
                    autoFocus
                  />
                </div>
                <button onClick={submitWithMention} className="comment-submit-btn" style={{ margin: 0 }}><Send size={16} /></button>
              </div>
            )}
          </div>
        )}
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply: any) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              isReply={true}
              session={session}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              handleReplySubmit={handleReplySubmit}
              editingId={editingId}
              setEditingId={setEditingId}
              editContent={editContent}
              setEditContent={setEditContent}
              handleEditSubmit={handleEditSubmit}
              onDeleteClick={onDeleteClick}
              editingMention={editingMention}
              setEditingMention={setEditingMention}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function CommentsSection({ gameSlug }: { gameSlug: string }) {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editingMention, setEditingMention] = useState<string | null>(null);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?slug=${gameSlug}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  useEffect(() => {
    fetchComments();
    const intervalId = setInterval(() => {
      if (!editingId && !replyingTo) { fetchComments(); }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [gameSlug, editingId, replyingTo]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await fetch('/api/comments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: newComment, gameSlug }) });
      setNewComment(''); fetchComments();
    } catch (error) { alert('Erro'); }
  };

  const handleMainKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  };

  const handleReplySubmit = async (parentId: string, customContent?: string) => {
    const contentToSend = customContent || replyContent;
    if (!contentToSend.trim()) return;
    try {
      await fetch('/api/comments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: contentToSend, gameSlug, parentId }) });
      setReplyingTo(null); setReplyContent(''); fetchComments();
    } catch (error) { alert('Erro'); }
  };

  const handleEditSubmit = async (id: string) => {
    if (!editContent.trim()) return;
    const finalContent = editingMention ? `${editingMention} ${editContent}` : editContent;
    try {
      await fetch('/api/comments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId: id, content: finalContent }),
      });
      setEditingId(null); setEditingMention(null); fetchComments();
    } catch (error) { alert('Erro ao editar'); }
  };

  const confirmDelete = async () => {
    if (!commentToDelete) return;
    try {
      await fetch(`/api/comments?id=${commentToDelete}`, { method: 'DELETE' });
      fetchComments(); setCommentToDelete(null);
    } catch (error) { alert('Erro ao deletar'); }
  };

  return (
    <div className="comments-container">
      <h3 className="comments-title"><MessageSquare size={24} color="#c084fc" /> Comentários</h3>

      {status === 'loading' ? (
        <div className="comment-form" style={{ opacity: 0.6, pointerEvents: 'none' }}>
          <div className="comment-form-inner">
            <div className="comment-avatar-placeholder" style={{ width:'2.5rem', height:'2.5rem', background:'rgba(155,101,236,0.3)' }}></div>
            <div className="comment-textarea-wrapper">
              <div style={{ height: '50px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}></div>
            </div>
          </div>
        </div>
      ) : status === 'authenticated' ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="comment-form-inner">
            <div className="comment-avatar-placeholder" style={{ width:'2.5rem', height:'2.5rem' }}><User size={20} /></div>
            <div className="comment-textarea-wrapper">
              <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} onKeyDown={handleMainKeyDown} placeholder="Deixe seu comentário..." className="comment-textarea" rows={2} />
              <button type="submit" disabled={!newComment.trim()} className="comment-submit-btn"><Send size={16} /> Comentar</button>
            </div>
          </div>
        </form>
      ) : (
        <div className="login-prompt"><p>Faça login para participar da discussão.</p><Link href="/login" className="login-prompt-btn">Fazer Login</Link></div>
      )}

      {loading && comments.length === 0 ? (<p style={{textAlign:'center', color:'#9ca3af'}}>Carregando...</p>) : comments.length > 0 ? (
        <div className="comment-list">
          {comments.map(comment => (
            <CommentItem 
              key={comment.id} comment={comment} session={session}
              replyingTo={replyingTo} setReplyingTo={setReplyingTo}
              replyContent={replyContent} setReplyContent={setReplyContent}
              handleReplySubmit={handleReplySubmit} editingId={editingId}
              setEditingId={setEditingId} editContent={editContent}
              setEditContent={setEditContent} handleEditSubmit={handleEditSubmit}
              onDeleteClick={(id: string) => setCommentToDelete(id)}
              editingMention={editingMention} setEditingMention={setEditingMention}
            />
          ))}
        </div>
      ) : (<p style={{textAlign:'center', color:'#6b7280', fontStyle:'italic'}}>Seja o primeiro a comentar!</p>)}

      <ConfirmModal isOpen={!!commentToDelete} title="Excluir Comentário" message="Tem certeza?" isDanger={true} onCancel={() => setCommentToDelete(null)} onConfirm={confirmDelete} />
    </div>
  );
}