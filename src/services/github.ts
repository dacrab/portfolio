import { GitHubRepo, GitHubProjectData } from "@/types/github";

const GITHUB_API_URL = "https://api.github.com";
const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "dacrab";
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

// Unified cache for repositories
const cache = {
  repos: new Map<string, { data: GitHubRepo[]; timestamp: number }>()
};

/**
 * Fetches GitHub repositories with caching
 */
export async function fetchGitHubRepos(
  username: string = USERNAME,
  sort: "updated" | "created" | "pushed" | "full_name" = "updated",
  direction: "asc" | "desc" = "desc",
  forceFresh: boolean = false
): Promise<GitHubRepo[]> {
  // Generate cache key and check cache
  const cacheKey = `${username}-${sort}-${direction}`;
  const cached = cache.repos.get(cacheKey);
  const now = Date.now();
  
  if (!forceFresh && cached && now - cached.timestamp < CACHE_DURATION_MS) {
    return cached.data;
  }

  // Prepare request headers
  const headers: HeadersInit = { 
    Accept: "application/vnd.github.v3+json",
    'User-Agent': 'Portfolio-Website'
  };
  
  const token = process.env.GITHUB_TOKEN || process.env.GITHUB_ACCESS_TOKEN;
  if (token) headers.Authorization = `token ${token}`;

  const url = `${GITHUB_API_URL}/users/${username}/repos?sort=${sort}&direction=${direction}&per_page=100`;

  try {
    const response = await fetch(url, {
      headers,
      ...(typeof window === 'undefined' && {
        next: { revalidate: CACHE_DURATION_MS / 1000 }
      })
    });

    // Handle API errors
    if (!response.ok) {
      // Check for rate limiting
      if (response.status === 403 && response.headers.get("X-RateLimit-Remaining") === "0") {
        const reset = response.headers.get("X-RateLimit-Reset");
        throw new Error(
          `GitHub API rate limit exceeded. Reset at ${
            reset ? new Date(+reset * 1000).toISOString() : "unknown time"
          }`
        );
      }
      
      throw new Error(
        response.status === 404
          ? `GitHub user '${username}' not found`
          : `GitHub API error: ${response.status}`
      );
    }

    const data = await response.json();
    cache.repos.set(cacheKey, { data, timestamp: now });
    return data;
  } catch (error) {
    console.error('GitHub API error:', error);
    return cached?.data || [];
  }
}

/**
 * Transforms GitHub repositories into project format
 */
export function transformReposToProjects(
  repos: GitHubRepo[], 
  options: { minStars?: number; excludeForks?: boolean } = {}
): GitHubProjectData[] {
  if (!repos || !Array.isArray(repos)) return [];
  
  const { minStars = 0, excludeForks = false } = options;
  
  return repos
    .filter(repo => 
      repo.stargazers_count >= minStars &&
      (!excludeForks || !repo.fork)
    )
    .map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      url: repo.html_url,
      description: repo.description || "",
      fork: repo.fork,
      stars: repo.stargazers_count,
      language: repo.language || "Unknown",
      topics: repo.topics || [],
      homepage: repo.homepage || "",
      updatedAt: repo.updated_at
    }));
}

/**
 * Clears all GitHub caches
 */
export function clearGitHubCaches(): void {
  cache.repos.clear();
}