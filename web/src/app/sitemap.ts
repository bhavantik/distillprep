import { MetadataRoute } from "next";

const BASE_URL = "https://distillprep.com";

// Known topics with content — extend this list as new topics are added
const LIVE_TOPICS = ["python"];
const COMING_SOON_TOPICS = ["sql", "ml"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const liveQuizPages: MetadataRoute.Sitemap = LIVE_TOPICS.map((topic) => ({
    url: `${BASE_URL}/quiz/${topic}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const comingSoonPages: MetadataRoute.Sitemap = COMING_SOON_TOPICS.map((topic) => ({
    url: `${BASE_URL}/quiz/${topic}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...liveQuizPages, ...comingSoonPages];
}
