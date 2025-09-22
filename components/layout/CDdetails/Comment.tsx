"use client";

import React, { useState } from "react";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";
import Avatar from "./Avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Reply = {
  id: number;
  name: string;
  date: string;
  text: string;
  likes: number;
};

type Comment = {
  id: number;
  name: string;
  date: string;
  text: string;
  likes: number;
  replies: Reply[];
};

export default function Comments({ initial = [] }: { initial?: Comment[] }) {
  const [comments, setComments] = useState<Comment[]>(
    initial.length
      ? initial
      : [
          {
            id: 1,
            name: "User Name",
            date: "June 22",
            text: "This Campaign will go a Long way in ending the famine in Gaza. Those Little kids deserve to be happy. No amount is too small",
            likes: 45,
            replies: [
              {
                id: 11,
                name: "Reply User",
                date: "June 23",
                text: "Absolutely — glad to help!",
                likes: 2,
              },
              {
                id: 12,
                name: "Another",
                date: "June 24",
                text: "Such an important cause.",
                likes: 1,
              },
            ],
          },
          {
            id: 2,
            name: "Another User",
            date: "June 20",
            text: "Amazing project — happy to support.",
            likes: 12,
            replies: [],
          },
        ]
  );

  const [visibleCommentsCount, setVisibleCommentsCount] = useState<number>(10);
  const [visibleRepliesCount, setVisibleRepliesCount] = useState<
    Record<number, number>
  >({});

  const [newText, setNewText] = useState("");
  const [replyText, setReplyText] = useState<Record<number, string>>({});
  const [replyOpen, setReplyOpen] = useState<Record<number, boolean>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const [likedComments, setLikedComments] = useState<Record<number, boolean>>(
    {}
  );
  const [likedReplies, setLikedReplies] = useState<Record<number, boolean>>({});

  function addComment() {
    if (!newText.trim()) return;
    const next: Comment = {
      id: Date.now(),
      name: "You",
      date: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      text: newText.trim(),
      likes: 0,
      replies: [],
    };
    setComments([next, ...comments]);
    setNewText("");
    setVisibleCommentsCount((v) => Math.max(v, 1));
  }

  function deleteComment(id: number) {
    setComments((s) => s.filter((c) => c.id !== id));
    setVisibleRepliesCount((s) => {
      const copy = { ...s };
      delete copy[id];
      return copy;
    });
    setLikedComments((s) => {
      const copy = { ...s };
      delete copy[id];
      return copy;
    });
  }

  function startEdit(id: number, text: string) {
    setEditingId(id);
    setEditingText(text);
  }

  function saveEdit(id: number) {
    setComments((s) =>
      s.map((c) => (c.id === id ? { ...c, text: editingText } : c))
    );
    setEditingId(null);
    setEditingText("");
  }

  function toggleReply(id: number) {
    setReplyOpen((s) => ({ ...s, [id]: !s[id] }));
    setReplyText((s) => ({ ...s, [id]: s[id] ?? "" }));
    setVisibleRepliesCount((s) => ({ ...s, [id]: s[id] ?? 3 }));
  }

  function addReply(parentId: number) {
    const text = (replyText[parentId] || "").trim();
    if (!text) return;
    const newReply: Reply = {
      id: Date.now(),
      name: "You",
      date: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      text,
      likes: 0,
    };

    setComments((s) =>
      s.map((c) =>
        c.id === parentId ? { ...c, replies: [...c.replies, newReply] } : c
      )
    );
    setReplyText((s) => ({ ...s, [parentId]: "" }));
    setReplyOpen((s) => ({ ...s, [parentId]: true }));
    setVisibleRepliesCount((s) => ({
      ...s,
      [parentId]: (s[parentId] || 3) + 1,
    }));
  }

  function loadMoreComments() {
    setVisibleCommentsCount((v) => v + 5);
  }

  function loadMoreReplies(commentId: number) {
    setVisibleRepliesCount((s) => ({
      ...s,
      [commentId]: (s[commentId] || 3) + 3,
    }));
  }

  function toggleLikeComment(commentId: number) {
    const currentlyLiked = !!likedComments[commentId];

    setComments((prevComments) =>
      prevComments.map((c) =>
        c.id === commentId
          ? { ...c, likes: Math.max(0, c.likes + (currentlyLiked ? -1 : 1)) }
          : c
      )
    );

    setLikedComments((prev) => ({ ...prev, [commentId]: !currentlyLiked }));
  }

  function toggleLikeReply(replyId: number) {
    const currentlyLiked = !!likedReplies[replyId];
    setComments((prevComments) =>
      prevComments.map((c) => ({
        ...c,
        replies: c.replies.map((r) =>
          r.id === replyId
            ? { ...r, likes: Math.max(0, r.likes + (currentlyLiked ? -1 : 1)) }
            : r
        ),
      }))
    );
    setLikedReplies((prev) => ({ ...prev, [replyId]: !currentlyLiked }));
  }

  const visibleComments = comments.slice(0, visibleCommentsCount);

  return (
    <div className="bg-white text-gray-900">
      <div className="pt-6 px-4 md:px-0">
        <h3 className="text-lg mb-4 font-semibold">Comments ({comments.length})</h3>

        <div className="mb-6">
          <div className="flex items-center gap-3">
            <Avatar src="/layout/avatarboy.svg" alt="you" size={40} />

            <div className="flex-1">
              <div className="relative">
                <input
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Add a comment"
                  className="w-full rounded-full bg-gray-100 border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 pr-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Add a comment"
                />

                <button
                  onClick={addComment}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 rounded-full text-white text-sm shadow"
                  style={{ background: "linear-gradient(180deg, #1E5AA8 0%, #2379BC 100%)" }}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {visibleComments.map((c) => (
            <div key={c.id} className="pt-4">
              <div className="flex items-start gap-4">
                <Avatar src="/layout/avatarboy.svg" alt="you" size={32} />

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {c.name}
                      </div>
                      <div className="text-xs text-gray-500">{c.date}</div>
                    </div>

                    <div className="relative">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            className="p-2 rounded-full hover:bg-gray-100"
                            aria-haspopup="true"
                            aria-label="Open comment actions"
                          >
                            <HiOutlineDotsHorizontal className="text-gray-600" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-44 p-2 bg-white border border-gray-200 rounded-md shadow-lg">
                          <button
                            onClick={() => startEdit(c.id, c.text)}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteComment(c.id)}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700"
                          >
                            Delete
                          </button>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="mt-3 text-gray-700">
                    {editingId === c.id ? (
                      <div>
                        <textarea
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="w-full rounded-md bg-gray-50 border border-gray-300 p-3 text-gray-900 resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={() => saveEdit(c.id)}
                            className="px-3 py-1 rounded-md text-white"
                            style={{ background: "linear-gradient(180deg, #1E5AA8 0%, #2379BC 100%)" }}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">{c.text}</div>
                    )}
                  </div>

                  <div className="flex items-center gap-6 mt-3 text-sm text-gray-500">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLikeComment(c.id);
                        }}
                        type="button"
                        aria-pressed={!!likedComments[c.id]}
                        aria-label={likedComments[c.id] ? "Unlike" : "Like"}
                        className={`flex items-center gap-1 ${
                          likedComments[c.id]
                            ? "text-rose-500"
                            : "text-gray-500"
                        }`}
                      >
                        <AiOutlineHeart />
                        <span className="ml-1 text-gray-700">{c.likes}</span>
                      </button>

                      <button
                        onClick={() => toggleReply(c.id)}
                        aria-label="Toggle replies"
                        className="flex items-center gap-1 text-gray-500"
                      >
                        <FiMessageCircle />
                        <span className="ml-1 text-gray-700">
                          {c.replies.length}
                        </span>
                      </button>
                    </div>

                    <button
                      onClick={() => toggleReply(c.id)}
                      className="text-blue-600 underline text-sm"
                    >
                      {c.replies.length > 0
                        ? `Replies (${c.replies.length})`
                        : "Reply"}
                    </button>
                  </div>

                  {/* Replies */}
                  {c.replies.length > 0 && (
                    <div className="mt-4">
                      <div className="border-l border-gray-300 pl-4 space-y-4">
                        {c.replies
                          .slice(0, visibleRepliesCount[c.id] ?? 3)
                          .map((r) => (
                            <div key={r.id} className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-sm font-semibold text-gray-900">
                                      {r.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {r.date}
                                    </div>
                                  </div>

                                  <div className="text-sm text-gray-500">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleLikeReply(r.id);
                                      }}
                                      type="button"
                                      aria-pressed={!!likedReplies[r.id]}
                                      aria-label={
                                        likedReplies[r.id]
                                          ? "Unlike reply"
                                          : "Like reply"
                                      }
                                      className={`flex items-center gap-1 ${
                                        likedReplies[r.id]
                                          ? "text-rose-500"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      <AiOutlineHeart />
                                      <span className="ml-1">{r.likes}</span>
                                    </button>
                                  </div>
                                </div>

                                <div className="mt-2 text-gray-700">
                                  {r.text}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      {c.replies.length > (visibleRepliesCount[c.id] ?? 3) && (
                        <div className="mt-2">
                          <button
                            onClick={() => loadMoreReplies(c.id)}
                            className="text-sm text-blue-600 underline"
                          >
                            Load more replies (+3)
                          </button>
                        </div>
                      )}

                      <div className="mt-3">
                        <button
                          onClick={() => toggleReply(c.id)}
                          className="text-sm text-blue-600 underline"
                        >
                          Add a reply
                        </button>
                      </div>
                    </div>
                  )}

                  {replyOpen[c.id] && (
                    <div className="mt-4 flex items-start gap-3">
                      <Avatar src="/layout/avatarboy.svg" alt="you" size={32} />

                      <div className="flex-1">
                        <div className="relative">
                          <input
                            value={replyText[c.id] || ""}
                            onChange={(e) =>
                              setReplyText((s) => ({
                                ...s,
                                [c.id]: e.target.value,
                              }))
                            }
                            placeholder="Write a reply"
                            className="w-full rounded-full bg-gray-100 border border-gray-300 px-4 py-2 text-gray-900 placeholder:text-gray-500 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            aria-label="Write a reply"
                          />

                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                            <button
                              onClick={() => addReply(c.id)}
                              className="px-3 py-1 rounded-full text-white text-sm"
                              style={{ background: "linear-gradient(180deg, #1E5AA8 0%, #2379BC 100%)" }}
                            >
                              Reply
                            </button>
                            <button
                              onClick={() => toggleReply(c.id)}
                              className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4" />
            </div>
          ))}

          {visibleCommentsCount < comments.length && (
            <div className="pt-4">
              <button
                onClick={loadMoreComments}
                className="text-sm text-blue-600 underline"
              >
                Load more comments (+5)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}