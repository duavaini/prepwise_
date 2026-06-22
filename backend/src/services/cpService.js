const axios = require('axios');

const CF_BASE = 'https://codeforces.com/api';

const getCFSubmissions = async (handle) => {
  const res = await axios.get(`${CF_BASE}/user.status?handle=${handle}&from=1&count=1000`);
  if (res.data.status !== 'OK') throw new Error('CF user not found');
  return res.data.result;
};

const getCFUserInfo = async (handle) => {
  const res = await axios.get(`${CF_BASE}/user.info?handles=${handle}`);
  if (res.data.status !== 'OK') throw new Error('CF user not found');
  return res.data.result[0];
};

const LC_GRAPHQL = 'https://leetcode.com/graphql';

const getLCStats = async (username) => {
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          tagProblemCounts {
            advanced { tagName problemsSolved }
            intermediate { tagName problemsSolved }
            fundamental { tagName problemsSolved }
          }
        }
      }
    `;
    const res = await axios.post(LC_GRAPHQL, {
      query,
      variables: { username }
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return res.data.data.matchedUser;
  } catch {
    return null;
  }
};

const TOPIC_TAG_MAP = {
  graphs: ['graphs', 'graph', 'dfs', 'bfs', 'shortest paths', 'trees'],
  dynamic_programming: ['dp', 'dynamic programming', 'bitmask'],
  trees: ['trees', 'binary search tree', 'tree'],
  arrays: ['arrays', 'implementation', 'two pointers'],
  strings: ['strings', 'string matching'],
  binary_search: ['binary search'],
  linked_lists: ['linked list', 'data structures'],
  sliding_window: ['two pointers', 'implementation'],
  oops: [],
  greedy: ['greedy'],
  backtracking: ['backtracking', 'brute force'],
  heaps: ['data structures', 'sortings'],
  stacks: ['data structures', 'implementation'],
};

const analyzeCFSubmissions = (submissions) => {
  const tagStats = {};

  submissions.forEach(sub => {
    if (sub.verdict !== 'OK') return;
    const problem = sub.problem;
    const tags = problem.tags || [];
    const difficulty = problem.rating || 0;

    tags.forEach(tag => {
      const normalizedTag = tag.toLowerCase();
      Object.entries(TOPIC_TAG_MAP).forEach(([topic, cfTags]) => {
        if (cfTags.some(t => normalizedTag.includes(t))) {
          if (!tagStats[topic]) tagStats[topic] = { solved: 0, totalDifficulty: 0, problems: [] };
          tagStats[topic].solved++;
          tagStats[topic].totalDifficulty += difficulty;
          if (tagStats[topic].problems.length < 5) {
            tagStats[topic].problems.push({ name: problem.name, rating: difficulty });
          }
        }
      });
    });
  });

  Object.keys(tagStats).forEach(tag => {
    const s = tagStats[tag];
    s.avgDifficulty = s.solved > 0 ? Math.round(s.totalDifficulty / s.solved) : 0;
  });

  return tagStats;
};

module.exports = { getCFSubmissions, getCFUserInfo, getLCStats, analyzeCFSubmissions };
