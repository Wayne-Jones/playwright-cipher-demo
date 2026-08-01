import { useState } from "react";
import type { FormEvent } from "react";

interface CommentItem {
  id: string;
  name: string;
  text: string;
}

interface CommentsProps {
  slug: string;
}

const key = (slug: string) => `boombox:comments:${slug}`;

function load(slug: string): CommentItem[] {
  try {
    return JSON.parse(localStorage.getItem(key(slug)) ?? "[]") as CommentItem[];
  } catch {
    return [];
  }
}

function save(slug: string, comments: CommentItem[]) {
  try {
    localStorage.setItem(key(slug), JSON.stringify(comments));
  } catch {
    // storage unavailable — the thread lives for this visit only
  }
}

/**
 * The B-Side: listeners drop comments on the record.
 * The thread is stored in localStorage, so it survives a reload.
 */
export function Comments({ slug }: CommentsProps) {
  const [comments, setComments] = useState<CommentItem[]>(() => load(slug));
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const add = (event: FormEvent) => {
    event.preventDefault();
    const comment = text.trim();
    if (!comment) return;

    const next = [
      ...comments,
      {
        id: crypto.randomUUID(),
        name: name.trim() || "Anonymous",
        text: comment,
      },
    ];
    setComments(next);
    save(slug, next);
    setName("");
    setText("");
  };

  return (
    <section className="comments" data-testid="comments">
      <h3 className="comments__title">Comments</h3>
      <ul className="comments__list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment">
            <strong className="comment__name">{comment.name}</strong>
            <p className="comment__text">{comment.text}</p>
          </li>
        ))}
      </ul>
      <form className="comments__form" onSubmit={add}>
        <label htmlFor={`comment-name-${slug}`}>Name (optional)</label>
        <input
          id={`comment-name-${slug}`}
          className="comments__input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Crate digger"
        />
        <label htmlFor={`comment-text-${slug}`}>Your comment</label>
        <textarea
          id={`comment-text-${slug}`}
          className="comments__input"
          rows={3}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Drop a review from the block…"
        />
        <button type="submit" className="comments__submit">
          Drop a comment
        </button>
      </form>
    </section>
  );
}
