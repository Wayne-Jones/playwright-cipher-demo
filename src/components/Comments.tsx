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
    <section className="space-y-3" data-testid="comments">
      <h3 className="text-xs font-extrabold tracking-widest uppercase text-gray-400 mb-2">
        Comments
      </h3>
      <ul className="space-y-3 list-none p-0 m-0">
        {comments.map((comment) => (
          <li key={comment.id} className="bg-surface rounded-lg p-3 text-sm">
            <strong className="text-green font-bold text-xs">
              {comment.name}
            </strong>
            <p className="text-gray-300 text-sm mt-1">{comment.text}</p>
          </li>
        ))}
      </ul>
      <form className="space-y-2" onSubmit={add}>
        <label
          htmlFor={`comment-name-${slug}`}
          className="text-xs font-semibold text-gray-400"
        >
          Name (optional)
        </label>
        <input
          id={`comment-name-${slug}`}
          className="bg-surface border border-border-custom rounded-lg text-white text-sm px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-green"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Crate digger"
        />
        <label
          htmlFor={`comment-text-${slug}`}
          className="text-xs font-semibold text-gray-400"
        >
          Your comment
        </label>
        <textarea
          id={`comment-text-${slug}`}
          className="bg-surface border border-border-custom rounded-lg text-white text-sm px-3 py-2 w-full resize-y min-h-20 focus:outline-none focus:ring-1 focus:ring-green"
          rows={3}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Drop a review from the block…"
        />
        <button
          type="submit"
          className="bg-green text-black text-sm font-bold rounded-full px-5 py-2 hover:brightness-110 transition w-full md:w-auto"
        >
          Drop a comment
        </button>
      </form>
    </section>
  );
}
