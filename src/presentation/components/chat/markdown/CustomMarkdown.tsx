"use client";
import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


interface MarkdownRendererProps {
  markdown: string;
}

export const CustomMarkdown: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  const components: Components = {
    code({ className, children, inline,...rest }: any) {
      const match = /language-(\w+)/.exec(className || '');
      if (match) {
        return (
          <SyntaxHighlighter
            PreTag="pre"
            language={match[1]}
            style={vscDarkPlus}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        );
      }
      return (
        <code className={className} {...rest}>
          {children}
        </code>
      );
    }
  };

  return <ReactMarkdown components={components}>{markdown}</ReactMarkdown>;
};


