This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn -> yarn dev
#if you get error message
npm i -g yarn
```

Архитектура: Мы используем NextJS App Router. Папка src - корень проекта. App - там находятся все страницы и лайоуты. Папка components нужна для различных компонентов страницы.
Папка constants нужна для различных глобальных переменных. Папка context нужна для объявления контекстов, например контекст GSAP. Папка hooks - нужна для различных хуков, например кастомный хук для использования локального хранилища.
Папка interfaces нужна для глобальных интерфейсов приложения. Папка mock нужна для моков данных, например чтобы симулировать данные с бэка. Папка shared - это папка в которой доджны находится элементы которые постоянно используются в приложении(так же там хранятся различные SVG). Папка store нужна для хранилища Redux (если оно понадобиться). Папка utils - это папка для различных утилит, например какая то фунция которая будет помогать что то просчитать и часто используется.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
