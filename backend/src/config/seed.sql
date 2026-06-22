-- Run this after schema.sql in Supabase

INSERT INTO companies (name, slug, difficulty, cg_cutoff, package_range, rounds_count, rounds_breakdown, topic_weightage) VALUES

('Google', 'google', 'High', 7.0, '40-80 LPA', 4,
'[
  {"round": 1, "type": "Online Assessment", "desc": "2 DSA problems, 90 mins, medium-hard difficulty"},
  {"round": 2, "type": "Technical Interview 1", "desc": "DSA + problem solving, think out loud"},
  {"round": 3, "type": "Technical Interview 2", "desc": "DSA + system design basics"},
  {"round": 4, "type": "Googleyness", "desc": "Behavioural, leadership, culture fit"}
]',
'{
  "graphs": 25,
  "dynamic_programming": 25,
  "trees": 20,
  "arrays": 15,
  "strings": 10,
  "binary_search": 5
}'),

('Microsoft', 'microsoft', 'High', 7.0, '30-60 LPA', 4,
'[
  {"round": 1, "type": "Online Assessment", "desc": "2-3 DSA problems on HackerRank"},
  {"round": 2, "type": "Technical Interview 1", "desc": "DSA problems + discuss approach"},
  {"round": 3, "type": "Technical Interview 2", "desc": "DSA + OOPS concepts"},
  {"round": 4, "type": "HR Round", "desc": "Behavioural, why Microsoft, past experience"}
]',
'{
  "dynamic_programming": 20,
  "trees": 20,
  "graphs": 20,
  "arrays": 20,
  "linked_lists": 10,
  "oops": 10
}'),

('Adobe', 'adobe', 'Medium-High', 7.0, '25-45 LPA', 3,
'[
  {"round": 1, "type": "Online Assessment", "desc": "Aptitude + DSA + output prediction, 90 mins"},
  {"round": 2, "type": "Technical Interview 1", "desc": "DSA problems + CS fundamentals (OS, DBMS, OOPS)"},
  {"round": 3, "type": "Technical Interview 2 + HR", "desc": "Project deep dive + behavioural"}
]',
'{
  "arrays": 20,
  "strings": 20,
  "dynamic_programming": 15,
  "trees": 15,
  "oops": 15,
  "graphs": 15
}'),

('Amazon', 'amazon', 'Medium-High', 6.5, '25-50 LPA', 4,
'[
  {"round": 1, "type": "Online Assessment", "desc": "2 DSA + work simulation questions, 105 mins"},
  {"round": 2, "type": "Technical Interview 1", "desc": "DSA + LP (Leadership Principles)"},
  {"round": 3, "type": "Technical Interview 2", "desc": "DSA + system design basics"},
  {"round": 4, "type": "Bar Raiser", "desc": "LP heavy, situational questions, culture fit"}
]',
'{
  "arrays": 25,
  "dynamic_programming": 20,
  "trees": 20,
  "graphs": 15,
  "strings": 10,
  "sliding_window": 10
}'),

('Visa', 'visa', 'Medium', 7.0, '20-35 LPA', 3,
'[
  {"round": 1, "type": "Online Assessment", "desc": "DSA + aptitude, medium difficulty"},
  {"round": 2, "type": "Technical Interview", "desc": "DSA + CS fundamentals, project discussion"},
  {"round": 3, "type": "HR Round", "desc": "Behavioural, why Visa, career goals"}
]',
'{
  "arrays": 25,
  "strings": 20,
  "trees": 20,
  "dynamic_programming": 15,
  "graphs": 10,
  "binary_search": 10
}'),

('Razorpay', 'razorpay', 'Medium', 6.5, '20-40 LPA', 3,
'[
  {"round": 1, "type": "Online Assessment", "desc": "DSA problems, medium difficulty, 60 mins"},
  {"round": 2, "type": "Technical Interview 1", "desc": "DSA + system design + project discussion"},
  {"round": 3, "type": "Technical Interview 2 + HR", "desc": "Culture fit, past work, why fintech"}
]',
'{
  "arrays": 25,
  "strings": 20,
  "dynamic_programming": 15,
  "trees": 15,
  "graphs": 15,
  "binary_search": 10
}');
