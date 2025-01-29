// First, create a package.json file in your repository root:
{
  "name": "markdown-site",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "gray-matter": "^4.0.3",
    "markdown-to-jsx": "^7.2.0"
  }
}

// Create a next.config.js file:
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

// Create pages/_app.js:
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

// Create pages/index.js:
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Markdown from 'markdown-to-jsx'

export default function Home({ content }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Markdown>{content}</Markdown>
    </div>
  )
}

export async function getStaticProps() {
  // Read the README.md or your main markdown file
  const filePath = path.join(process.cwd(), 'README.md')
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { content } = matter(fileContent)

  return {
    props: {
      content
    }
  }
}
