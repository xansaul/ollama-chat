"use client";
import React from 'react';
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  markdown: string;
}

export const CustomMarkdown: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  return (

    <Markdown
      components={{
        code(props) {
          const { children, className, node, ...rest } = props as any;
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              language={match[1]}
              style={vscDarkPlus}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          )
        }
      }}
    >
      {markdown}
    </Markdown>
  )
};


