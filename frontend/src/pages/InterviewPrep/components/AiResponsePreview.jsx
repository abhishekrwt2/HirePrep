import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { LuCopy, LuCheck } from "react-icons/lu";

const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  return (
    <div className="prose prose-invert max-w-full text-white space-y-3">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p({ children }) {
            return <p className="text-white text-sm">{children}</p>;
          },
          strong({ children }) {
            return <strong className="text-orange-500 font-semibold">{children}</strong>;
          },
          em({ children }) {
            return <em className="italic text-white">{children}</em>;
          },
          a({ children, href }) {
            return (
              <a
                href={href}
                className="text-orange-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },
          h1({ children }) {
            return <h1 className="text-2xl font-bold text-white mt-4">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-xl font-semibold text-white mt-3">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-lg font-semibold text-white mt-2">{children}</h3>;
          },
          h4({ children }) {
            return <h4 className="text-md font-semibold text-white mt-2">{children}</h4>;
          },
          ul({ children }) {
            return <ul className="list-disc list-inside text-white ml-4">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal list-inside text-white ml-4">{children}</ol>;
          },
          li({ children }) {
            return <li className="text-white">{children}</li>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-orange-500 pl-4 italic text-orange-300 my-2">
                {children}
              </blockquote>
            );
          },
          hr() {
            return <hr className="border-orange-500 my-4" />;
          },
          img({ src, alt }) {
            return <img src={src} alt={alt} className="rounded-md my-2" />;
          },
          table({ children }) {
            return (
              <table className="table-auto border-collapse border border-orange-500 w-full my-2">
                {children}
              </table>
            );
          },
          thead({ children }) {
            return <thead className="bg-orange-500 text-black">{children}</thead>;
          },
          tbody({ children }) {
            return <tbody className="text-white">{children}</tbody>;
          },
          tr({ children }) {
            return <tr className="border border-orange-500">{children}</tr>;
          },
          th({ children }) {
            return <th className="border border-orange-500 px-2 py-1 text-white">{children}</th>;
          },
          td({ children }) {
            return <td className="border border-orange-500 px-2 py-1 text-white">{children}</td>;
          },
          code({ node, inline, className, children, ...props }) {
            const language = className?.replace("language-", "") || "text";

            return !inline ? (
              <CodeBlock code={String(children).replace(/\n$/, "")} language={language} />
            ) : (
              <code className="bg-black text-orange-500 px-1 rounded">{children}</code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

// CodeBlock component with copy button
function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-2">
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        className="rounded-md"
      >
        {code}
      </SyntaxHighlighter>

      <button
        onClick={copyCode}
        className="absolute top-2 right-2 text-orange-500 bg-black/40 p-1 rounded hover:bg-black/70 transition"
      >
        {copied ? <LuCheck size={16} /> : <LuCopy size={16} />}
      </button>
    </div>
  );
}

export default AIResponsePreview;
