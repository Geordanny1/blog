import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ESM __dirname replacement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  Get title from CLI
const title = process.argv.slice(2).join(" ");

if (!title) {
  console.error("not title provided");
  process.exit(1);
}

//  Create slug
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

//  Date info
const now = new Date();
const year = now.getFullYear();
const date = now.toISOString().split("T")[0];

//  Front-matter + content (INLINE TEMPLATE)
const content = `---
title: ${title}
date: ${date}
description: ""
tags: []
---
`;

//  Ensure year folder exists
const yearDir = path.join(__dirname, "src", "posts", String(year));
fs.mkdirSync(yearDir, { recursive: true });

//  File path
const fileName = `${date}-${slug}.md`;
const outputPath = path.join(yearDir, fileName);

//  writes/overwrites file
fs.writeFileSync(outputPath, content);

console.log(`Post created: src/posts/${year}/${fileName}`);
