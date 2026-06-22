-- Run this after schema.sql and seed.sql in Supabase
-- Powers the personalised problem sheets. company_slugs left broad (all companies)
-- since topic_weightage per company already controls relevance/ordering.

INSERT INTO problems (title, url, platform, difficulty, topic_tags, company_slugs) VALUES

-- Arrays
('Two Sum', 'https://leetcode.com/problems/two-sum/', 'leetcode', 'Easy', ARRAY['arrays'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Best Time to Buy and Sell Stock', 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', 'leetcode', 'Easy', ARRAY['arrays'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Product of Array Except Self', 'https://leetcode.com/problems/product-of-array-except-self/', 'leetcode', 'Medium', ARRAY['arrays'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('3Sum', 'https://leetcode.com/problems/3sum/', 'leetcode', 'Medium', ARRAY['arrays','sliding_window'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Trapping Rain Water', 'https://leetcode.com/problems/trapping-rain-water/', 'leetcode', 'Hard', ARRAY['arrays'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('First Missing Positive', 'https://leetcode.com/problems/first-missing-positive/', 'leetcode', 'Hard', ARRAY['arrays'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),

-- Strings
('Valid Anagram', 'https://leetcode.com/problems/valid-anagram/', 'leetcode', 'Easy', ARRAY['strings'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Valid Palindrome', 'https://leetcode.com/problems/valid-palindrome/', 'leetcode', 'Easy', ARRAY['strings'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Longest Substring Without Repeating Characters', 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', 'leetcode', 'Medium', ARRAY['strings','sliding_window'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Group Anagrams', 'https://leetcode.com/problems/group-anagrams/', 'leetcode', 'Medium', ARRAY['strings'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Minimum Window Substring', 'https://leetcode.com/problems/minimum-window-substring/', 'leetcode', 'Hard', ARRAY['strings','sliding_window'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Edit Distance', 'https://leetcode.com/problems/edit-distance/', 'leetcode', 'Hard', ARRAY['strings','dynamic_programming'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),

-- Dynamic Programming
('Climbing Stairs', 'https://leetcode.com/problems/climbing-stairs/', 'leetcode', 'Easy', ARRAY['dynamic_programming'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('House Robber', 'https://leetcode.com/problems/house-robber/', 'leetcode', 'Easy', ARRAY['dynamic_programming'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Coin Change', 'https://leetcode.com/problems/coin-change/', 'leetcode', 'Medium', ARRAY['dynamic_programming'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Longest Increasing Subsequence', 'https://leetcode.com/problems/longest-increasing-subsequence/', 'leetcode', 'Medium', ARRAY['dynamic_programming'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Word Break', 'https://leetcode.com/problems/word-break/', 'leetcode', 'Medium', ARRAY['dynamic_programming','strings'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Regular Expression Matching', 'https://leetcode.com/problems/regular-expression-matching/', 'leetcode', 'Hard', ARRAY['dynamic_programming','strings'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Burst Balloons', 'https://leetcode.com/problems/burst-balloons/', 'leetcode', 'Hard', ARRAY['dynamic_programming'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),

-- Trees
('Maximum Depth of Binary Tree', 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', 'leetcode', 'Easy', ARRAY['trees'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Invert Binary Tree', 'https://leetcode.com/problems/invert-binary-tree/', 'leetcode', 'Easy', ARRAY['trees'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Binary Tree Level Order Traversal', 'https://leetcode.com/problems/binary-tree-level-order-traversal/', 'leetcode', 'Medium', ARRAY['trees'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Validate Binary Search Tree', 'https://leetcode.com/problems/validate-binary-search-tree/', 'leetcode', 'Medium', ARRAY['trees'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Lowest Common Ancestor of a Binary Tree', 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', 'leetcode', 'Medium', ARRAY['trees'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Binary Tree Maximum Path Sum', 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', 'leetcode', 'Hard', ARRAY['trees'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Serialize and Deserialize Binary Tree', 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', 'leetcode', 'Hard', ARRAY['trees'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),

-- Graphs
('Number of Islands', 'https://leetcode.com/problems/number-of-islands/', 'leetcode', 'Medium', ARRAY['graphs'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Clone Graph', 'https://leetcode.com/problems/clone-graph/', 'leetcode', 'Medium', ARRAY['graphs'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Course Schedule', 'https://leetcode.com/problems/course-schedule/', 'leetcode', 'Medium', ARRAY['graphs'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Flood Fill', 'https://leetcode.com/problems/flood-fill/', 'leetcode', 'Easy', ARRAY['graphs'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Network Delay Time', 'https://leetcode.com/problems/network-delay-time/', 'leetcode', 'Medium', ARRAY['graphs'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Word Ladder', 'https://leetcode.com/problems/word-ladder/', 'leetcode', 'Hard', ARRAY['graphs'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Alien Dictionary', 'https://leetcode.com/problems/alien-dictionary/', 'leetcode', 'Hard', ARRAY['graphs'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),

-- Binary Search
('Binary Search', 'https://leetcode.com/problems/binary-search/', 'leetcode', 'Easy', ARRAY['binary_search'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Search Insert Position', 'https://leetcode.com/problems/search-insert-position/', 'leetcode', 'Easy', ARRAY['binary_search'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Search in Rotated Sorted Array', 'https://leetcode.com/problems/search-in-rotated-sorted-array/', 'leetcode', 'Medium', ARRAY['binary_search'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Find Minimum in Rotated Sorted Array', 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', 'leetcode', 'Medium', ARRAY['binary_search'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Median of Two Sorted Arrays', 'https://leetcode.com/problems/median-of-two-sorted-arrays/', 'leetcode', 'Hard', ARRAY['binary_search'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Split Array Largest Sum', 'https://leetcode.com/problems/split-array-largest-sum/', 'leetcode', 'Hard', ARRAY['binary_search'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),

-- Linked Lists
('Reverse Linked List', 'https://leetcode.com/problems/reverse-linked-list/', 'leetcode', 'Easy', ARRAY['linked_lists'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Merge Two Sorted Lists', 'https://leetcode.com/problems/merge-two-sorted-lists/', 'leetcode', 'Easy', ARRAY['linked_lists'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Linked List Cycle', 'https://leetcode.com/problems/linked-list-cycle/', 'leetcode', 'Easy', ARRAY['linked_lists'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Add Two Numbers', 'https://leetcode.com/problems/add-two-numbers/', 'leetcode', 'Medium', ARRAY['linked_lists'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('LRU Cache', 'https://leetcode.com/problems/lru-cache/', 'leetcode', 'Medium', ARRAY['linked_lists'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Reverse Nodes in k-Group', 'https://leetcode.com/problems/reverse-nodes-in-k-group/', 'leetcode', 'Hard', ARRAY['linked_lists'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Merge k Sorted Lists', 'https://leetcode.com/problems/merge-k-sorted-lists/', 'leetcode', 'Hard', ARRAY['linked_lists','heaps'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),

-- Sliding Window
('Maximum Subarray', 'https://leetcode.com/problems/maximum-subarray/', 'leetcode', 'Medium', ARRAY['sliding_window','arrays'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Contains Duplicate', 'https://leetcode.com/problems/contains-duplicate/', 'leetcode', 'Easy', ARRAY['sliding_window','arrays'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Longest Repeating Character Replacement', 'https://leetcode.com/problems/longest-repeating-character-replacement/', 'leetcode', 'Medium', ARRAY['sliding_window'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Permutation in String', 'https://leetcode.com/problems/permutation-in-string/', 'leetcode', 'Medium', ARRAY['sliding_window'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Sliding Window Maximum', 'https://leetcode.com/problems/sliding-window-maximum/', 'leetcode', 'Hard', ARRAY['sliding_window'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Substring with Concatenation of All Words', 'https://leetcode.com/problems/substring-with-concatenation-of-all-words/', 'leetcode', 'Hard', ARRAY['sliding_window'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),

-- Greedy
('Jump Game', 'https://leetcode.com/problems/jump-game/', 'leetcode', 'Medium', ARRAY['greedy'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Gas Station', 'https://leetcode.com/problems/gas-station/', 'leetcode', 'Medium', ARRAY['greedy'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Assign Cookies', 'https://leetcode.com/problems/assign-cookies/', 'leetcode', 'Easy', ARRAY['greedy'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Merge Intervals', 'https://leetcode.com/problems/merge-intervals/', 'leetcode', 'Medium', ARRAY['greedy','arrays'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Non-overlapping Intervals', 'https://leetcode.com/problems/non-overlapping-intervals/', 'leetcode', 'Medium', ARRAY['greedy'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Candy', 'https://leetcode.com/problems/candy/', 'leetcode', 'Hard', ARRAY['greedy'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),

-- Backtracking
('Subsets', 'https://leetcode.com/problems/subsets/', 'leetcode', 'Medium', ARRAY['backtracking'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Permutations', 'https://leetcode.com/problems/permutations/', 'leetcode', 'Medium', ARRAY['backtracking'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Combination Sum', 'https://leetcode.com/problems/combination-sum/', 'leetcode', 'Medium', ARRAY['backtracking'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Letter Combinations of a Phone Number', 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', 'leetcode', 'Easy', ARRAY['backtracking'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('N-Queens', 'https://leetcode.com/problems/n-queens/', 'leetcode', 'Hard', ARRAY['backtracking'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Sudoku Solver', 'https://leetcode.com/problems/sudoku-solver/', 'leetcode', 'Hard', ARRAY['backtracking'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),

-- Heaps
('Kth Largest Element in an Array', 'https://leetcode.com/problems/kth-largest-element-in-an-array/', 'leetcode', 'Medium', ARRAY['heaps'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Top K Frequent Elements', 'https://leetcode.com/problems/top-k-frequent-elements/', 'leetcode', 'Medium', ARRAY['heaps'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Last Stone Weight', 'https://leetcode.com/problems/last-stone-weight/', 'leetcode', 'Easy', ARRAY['heaps'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('K Closest Points to Origin', 'https://leetcode.com/problems/k-closest-points-to-origin/', 'leetcode', 'Medium', ARRAY['heaps'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Find Median from Data Stream', 'https://leetcode.com/problems/find-median-from-data-stream/', 'leetcode', 'Hard', ARRAY['heaps'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('IPO', 'https://leetcode.com/problems/ipo/', 'leetcode', 'Hard', ARRAY['heaps','greedy'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),

-- Stacks
('Valid Parentheses', 'https://leetcode.com/problems/valid-parentheses/', 'leetcode', 'Easy', ARRAY['stacks'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Min Stack', 'https://leetcode.com/problems/min-stack/', 'leetcode', 'Medium', ARRAY['stacks'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Daily Temperatures', 'https://leetcode.com/problems/daily-temperatures/', 'leetcode', 'Medium', ARRAY['stacks'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Evaluate Reverse Polish Notation', 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', 'leetcode', 'Medium', ARRAY['stacks'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Largest Rectangle in Histogram', 'https://leetcode.com/problems/largest-rectangle-in-histogram/', 'leetcode', 'Hard', ARRAY['stacks'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']),
('Basic Calculator', 'https://leetcode.com/problems/basic-calculator/', 'leetcode', 'Hard', ARRAY['stacks'], ARRAY['google','microsoft','adobe','amazon','visa','razorpay']);
