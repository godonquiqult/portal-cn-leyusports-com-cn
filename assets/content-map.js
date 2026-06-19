// assets/content-map.js
// Site content mapping and search utility

const siteContent = {
  sections: [
    {
      id: 'home',
      title: '首页',
      tags: ['体育', '赛事', '乐鱼体育'],
      keywords: ['足球', '篮球', '网球', '电竞', '直播'],
      url: 'https://portal-cn-leyusports.com.cn',
      description: '乐鱼体育综合体育赛事平台'
    },
    {
      id: 'live',
      title: '直播',
      tags: ['直播', '实时', '乐鱼体育'],
      keywords: ['NBA', '英超', '欧冠', 'LPL', 'KPL'],
      url: 'https://portal-cn-leyusports.com.cn/live',
      description: '实时赛事直播'
    },
    {
      id: 'esports',
      title: '电竞',
      tags: ['电竞', '比赛', '乐鱼体育'],
      keywords: ['英雄联盟', 'DOTA2', 'CSGO', '王者荣耀', '和平精英'],
      url: 'https://portal-cn-leyusports.com.cn/esports',
      description: '电子竞技赛事专区'
    },
    {
      id: 'news',
      title: '新闻',
      tags: ['新闻', '资讯', '乐鱼体育'],
      keywords: ['转会', '赛果', '前瞻', '专访', '数据'],
      url: 'https://portal-cn-leyusports.com.cn/news',
      description: '体育新闻资讯'
    },
    {
      id: 'stats',
      title: '数据',
      tags: ['数据', '统计', '乐鱼体育'],
      keywords: ['积分榜', '射手榜', '助攻榜', '胜率', '赔率'],
      url: 'https://portal-cn-leyusports.com.cn/stats',
      description: '赛事数据统计'
    }
  ],
  globalTags: ['乐鱼体育', '体育', '直播', '电竞', '数据', '新闻']
};

function filterContent(query, maxResults = 5) {
  if (!query || typeof query !== 'string') {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const results = [];

  for (const section of siteContent.sections) {
    let score = 0;

    // Check title
    if (section.title.toLowerCase().includes(normalizedQuery)) {
      score += 10;
    }

    // Check tags
    for (const tag of section.tags) {
      if (tag.toLowerCase().includes(normalizedQuery)) {
        score += 8;
      }
    }

    // Check keywords
    for (const keyword of section.keywords) {
      if (keyword.toLowerCase().includes(normalizedQuery)) {
        score += 5;
      }
    }

    // Check description
    if (section.description.toLowerCase().includes(normalizedQuery)) {
      score += 3;
    }

    if (score > 0) {
      results.push({
        section: section,
        score: score,
        matched: true
      });
    }
  }

  // Sort by relevance score descending
  results.sort((a, b) => b.score - a.score);

  // Return top results
  return results.slice(0, maxResults).map(item => ({
    id: item.section.id,
    title: item.section.title,
    url: item.section.url,
    description: item.section.description,
    relevance: item.score
  }));
}

function getSectionById(id) {
  return siteContent.sections.find(section => section.id === id) || null;
}

function getAllTags() {
  return [...siteContent.globalTags];
}

function getSectionTags(sectionId) {
  const section = getSectionById(sectionId);
  return section ? [...section.tags, ...section.keywords] : [];
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    siteContent,
    filterContent,
    getSectionById,
    getAllTags,
    getSectionTags
  };
}