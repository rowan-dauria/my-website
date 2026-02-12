---
title: "Testing Code Styling"
date: "2026-02-13"
---

This post tests the appearance of inline code and code blocks.

## Inline Code

Here is some `inline code` and a `variableName`.

## Code Blocks

### TypeScript

```typescript
interface User {
  id: number;
  name: string;
}

function greeting(user: User): string {
  return `Hello, ${user.name}!`;
}
```

### Python

```python
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

### CSS

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

### JSON

```json
{
  "name": "my-website",
  "version": "1.0.0",
  "private": true
}
```
