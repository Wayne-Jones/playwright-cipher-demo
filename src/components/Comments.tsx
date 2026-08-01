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

/**
 * B-Side v1 — broken on purpose: the form submits,
 * but the comment evaporates. No state update, no persistence.
 */
export function Comments({ slug }: CommentsProps) {
  const [comments] = useState<CommentItem[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const add = (event: FormEvent) => {
    event.preventDefault();
    // v1 bug: nothing happens. The thread never grows.
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
