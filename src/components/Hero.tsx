import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Calendar, MessageSquare, BadgeCheck } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Quality Content',
    description: 'Access high-quality video lessons and learning materials created by expert teachers.',
    slug: 'quality-content',
  },
  {
    icon: Users,
    title: 'Interactive Learning',
    description: 'Engage with teachers and fellow students through our Q&A system and discussions.',
    slug: 'interactive-learning',
  },
  {
    icon: Award,
    title: 'Track Progress',
    description: 'Monitor your learning journey and earn certificates upon course completion.',
    slug: 'track-progress',
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    description: 'Learn at your own pace with courses designed to fit your busy schedule.',
    slug: 'flexible-scheduling',
  },
  {
    icon: MessageSquare,
    title: 'Community Forum',
    description: 'Connect with peers, ask questions, and share insights in our dedicated forums.',
    slug: 'community-forum',
  },
  {
    icon: BadgeCheck,
    title: 'Official Certification',
    description: 'Receive recognized certificates upon successful completion of courses.',
    slug: 'official-certification',
  },
];

const Hero = () => {
  return (
    <div className="relative bg-white dark:bg-gray-900 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Transform Your Learning</span>
            <span className="block text-purple-600 dark:text-purple-400">With OracadeHub</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Join our platform where teachers and students come together to create an engaging learning experience. Access high-quality courses, interact with experts, and track your progress.
          </p>
        </div>
      </div>

      <div className="w-full inline-flex flex-nowrap marquee-container gap-8">
        <ul className="flex items-center justify-center md:justify-start [&_img]:max-w-none animate-marquee gap-8">
          {features.map((feature, index) => (
            <li key={`${feature.slug}-${index}`}>
              <Link to={`/blog/${feature.slug}`} className="block group">
                <div className="w-64 h-64 pt-6 group-hover:scale-105 transition-transform duration-300">
                  <div className="flow-root bg-gray-50 dark:bg-gray-800 rounded-lg px-6 pb-8 h-full shadow-md hover:shadow-xl transition-shadow">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex items-center justify-center md:justify-start [&_img]:max-w-none animate-marquee gap-8" aria-hidden="true">
          {features.map((feature, index) => (
            <li key={`${feature.slug}-${index}-duplicate`}>
              <Link to={`/blog/${feature.slug}`} className="block group">
                <div className="w-64 h-64 pt-6 group-hover:scale-105 transition-transform duration-300">
                  <div className="flow-root bg-gray-50 dark:bg-gray-800 rounded-lg px-6 pb-8 h-full shadow-md hover:shadow-xl transition-shadow">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Hero;