import React from 'react';
import { useParams } from 'react-router-dom';

// Placeholder content - replace with actual fetching logic later
const blogContent: { [key: string]: { title: string; content: React.ReactNode } } = {
  'quality-content': {
    title: 'The Importance of Quality Content in Learning',
    content: (
      <>
        <p className="mb-4">High-quality content is the cornerstone of effective online learning. It ensures that students receive accurate, engaging, and up-to-date information.</p>
        <p>Our platform focuses on curating courses from verified experts to guarantee the best learning experience.</p>
      </>
    ),
  },
  'interactive-learning': {
    title: 'Boosting Engagement with Interactive Learning',
    content: (
      <>
        <p className="mb-4">Passive learning is a thing of the past. Interaction through Q&As, quizzes, and discussions significantly improves retention and understanding.</p>
        <p>Explore how our interactive features help create a dynamic learning environment.</p>
      </>
    ),
  },
  'track-progress': {
    title: 'Why Tracking Your Progress Matters',
    content: (
      <>
        <p className="mb-4">Monitoring your progress helps you stay motivated, identify areas for improvement, and visualize your learning journey.</p>
        <p>Learn how to utilize our dashboard and analytics to effectively track your course completion and performance.</p>
      </>
    ),
  },
  'flexible-scheduling': {
    title: 'Learning on Your Schedule',
    content: (
      <>
        <p className="mb-4">Life is busy. Our platform offers the flexibility to learn whenever and wherever suits you best, without compromising on quality.</p>
        <p>Discover tips for fitting online learning into your routine.</p>
      </>
    ),
  },
  'community-forum': {
    title: 'The Power of a Learning Community',
    content: (
      <>
        <p className="mb-4">Learning together enhances the experience. Our forums provide a space to connect, collaborate, and support fellow learners.</p>
        <p>Join the discussion and see how peer interaction can boost your understanding.</p>
      </>
    ),
  },
  'official-certification': {
    title: 'Validating Your Skills with Certification',
    content: (
      <>
        <p className="mb-4">Certificates validate the skills and knowledge you've gained, adding value to your professional profile.</p>
        <p>Understand the certification process on our platform and how it benefits your career.</p>
      </>
    ),
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogContent[slug] : null;

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">Post not found</h1>
        <p className="dark:text-gray-300">Sorry, we couldn't find the blog post you were looking for.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
          {post.title}
        </h1>
        <div className="text-gray-700 dark:text-gray-300">
          {post.content}
        </div>
      </article>
    </div>
  );
};

export default BlogPost; 