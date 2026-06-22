const TOPIC_MAX_SOLVED = 50;
const DIFFICULTY_THRESHOLD = 1400;

const computeTopicScore = (tagStats, topic) => {
  const stat = tagStats[topic];
  if (!stat) return 0;

  const solvedScore = Math.min(stat.solved / TOPIC_MAX_SOLVED, 1) * 60;
  const difficultyScore = Math.min(stat.avgDifficulty / 2000, 1) * 40;
  return Math.round(solvedScore + difficultyScore);
};

const generatePersonalisedSheet = (tagStats, company, allProblems) => {
  const topicWeightage = company.topic_weightage;

  const topicAnalysis = Object.entries(topicWeightage).map(([topic, companyWeight]) => {
    const userScore = computeTopicScore(tagStats, topic);
    const gap = 100 - userScore;
    const priority = Math.round((gap * companyWeight) / 100);

    return {
      topic,
      userScore,
      companyWeight,
      gap,
      priority,
      solved: tagStats[topic]?.solved || 0,
      avgDifficulty: tagStats[topic]?.avgDifficulty || 0,
      status: userScore >= 70 ? 'strong' : userScore >= 40 ? 'moderate' : 'weak',
    };
  });

  topicAnalysis.sort((a, b) => b.priority - a.priority);

  const personalizedProblems = [];
  topicAnalysis.forEach(({ topic, userScore, status }) => {
    const topicProblems = allProblems.filter(p =>
      p.topic_tags.includes(topic) &&
      p.company_slugs.includes(company.slug)
    );

    let targetDifficulty;
    if (status === 'weak') targetDifficulty = 'Easy';
    else if (status === 'moderate') targetDifficulty = 'Medium';
    else targetDifficulty = 'Hard';

    const sorted = topicProblems
      .filter(p => p.difficulty === targetDifficulty)
      .slice(0, status === 'weak' ? 8 : status === 'moderate' ? 6 : 4);

    sorted.forEach(p => personalizedProblems.push({ ...p, reason: topic, status }));
  });

  const weakTopics = topicAnalysis.filter(t => t.status === 'weak').map(t => t.topic);
  const strongTopics = topicAnalysis.filter(t => t.status === 'strong').map(t => t.topic);

  return {
    companyName: company.name,
    companySlug: company.slug,
    topicAnalysis,
    problems: personalizedProblems,
    weakTopics,
    strongTopics,
    summary: {
      totalProblems: personalizedProblems.length,
      weakCount: weakTopics.length,
      strongCount: strongTopics.length,
      estimatedDays: Math.ceil(personalizedProblems.length / 5),
    }
  };
};

module.exports = { generatePersonalisedSheet, computeTopicScore };
