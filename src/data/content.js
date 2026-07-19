export const personal = {
  name: "伊力亚尔·麦麦提图尔荪",
  nameEn: "Ilyar",
  tagline: "逃逸确定性的系统拆解者",
  birth: "2003",
  from: "新疆喀什",
  role: "数据分析工程师 @ 满帮集团 AI 算法部门",
  education: "南京大学 信息管理与信息系统 2026届",
  email: "elyar@smail.nju.edu.cn",
  github: "https://github.com/IlyarMamattursun",
};

export const terminalConfig = {
  hostname: "ilyar",
  user: "guest",
  promptSymbol: "❯",
  banner: `
   ╔══════════════════════════════════════════╗
   ║    ██╗██╗  ██╗   ██╗ █████╗ ██████╗     ║
   ║    ██║██║  ╚██╗ ██╔╝██╔══██╗██╔══██╗    ║
   ║    ██║██║   ╚████╔╝ ███████║██████╔╝    ║
   ║    ██║██║    ╚██╔╝  ██╔══██║██╔══██╗    ║
   ║    ██║███████╗██║   ██║  ██║██║  ██║    ║
   ║    ╚═╝╚══════╝╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝    ║
   ║                                          ║
   ║  喀什 → 乌鲁木齐 → 上海 → 南京 → ？      ║
   ╚══════════════════════════════════════════╝
   边缘精英 · 系统拆解者 · INTJ
   Type 'help' to explore.
`,
};

export const commands = {
  help: {
    description: "Show available commands",
    longDescription: "Display all commands you can use to explore.",
    usage: "help",
  },
  whoami: {
    description: "Who is Ilyar?",
    longDescription: "Display identity and current status.",
    usage: "whoami",
  },
  journey: {
    description: "The path: Kashgar → Urumqi → Shanghai → Nanjing",
    longDescription: "Interactive geographic narrative.",
    usage: "journey",
  },
  places: {
    description: "List all places",
    longDescription: "Show all locations in the journey.",
    usage: "places",
  },
  tennis: {
    description: "🎾 Tennis life",
    longDescription: "2-3 years of tennis in Shanghai.",
    usage: "tennis",
  },
  drink: {
    description: "🍺 The philosophy of drinking",
    longDescription: "Bathroom drinking and why it mattered.",
    usage: "drink",
  },
  music: {
    description: "🎵 What I listen to",
    longDescription: "Joji, Imagine Dragons, Adele, and more.",
    usage: "music",
  },
  contact: {
    description: "Get in touch",
    longDescription: "Email, GitHub, and other links.",
    usage: "contact",
  },
  clear: {
    description: "Clear the terminal",
    longDescription: "Reset terminal output.",
    usage: "clear",
  },
  neofetch: {
    description: "System info (fun)",
    longDescription: "Display personal stats in neofetch style.",
    usage: "neofetch",
  },
};

export const whoamiOutput = {
  identity: `Name:       伊力亚尔·麦麦提图尔荪 (Ilyar)
Origin:     新疆喀什
Born:       2003
MBTI:       INTJ
Role:       数据分析工程师 @ 满帮集团 AI 算法部门
Education:  南京大学 信息管理与信息系统
Status:     逃逸确定性中...`,

  trajectory: `Trajectory:
  喀什 ──72h绿皮火车──▶ 乌鲁木齐(58中)
  乌鲁木齐 ──70h绿皮火车──▶ 上海(崇明中学)
  上海 ──高铁──▶ 南京(南大)
  南京 ──▶ 满帮集团

  Next: ?`,
};

export const places = [
  {
    id: "kashgar",
    name: "喀什",
    nameEn: "Kashgar",
    period: "2003 - 2015",
    color: "#f5a623",
    emoji: "🏔️",
    coords: [39.47, 75.99],
    description:
      "中国最西部的城市，我出生的地方。丝绸之路的十字路口，维吾尔文化的重镇。12岁之前，这里是全世界。12岁之后，这里成了回不去的故乡。",
    image: "/pic/新疆草原.png",
    keywords: ["出生地", "故乡", "帕米尔高原", "丝绸之路"],
  },
  {
    id: "urumqi",
    name: "乌鲁木齐",
    nameEn: "Urumqi",
    period: "2015 - 2018",
    color: "#f0883e",
    emoji: "🏫",
    coords: [43.82, 87.61],
    description:
      "12岁，坐72小时绿皮火车，第一次离开家。乌鲁木齐58中，内初班。在这里学会了独立——或者说是被迫学会了独立。",
    image: "/pic/小时候在乌鲁木齐的照片.jpg",
    keywords: ["内初班", "58中", "第一次离家", "独立"],
  },
  {
    id: "shanghai",
    name: "上海",
    nameEn: "Shanghai",
    period: "2018 - 2022",
    color: "#4dabf7",
    emoji: "🌆",
    coords: [31.62, 121.40],
    description:
      "崇明中学，内高班。一百来个从新疆来的孩子，全封闭式管理，两周出一次校门。白天黑夜一起待着，在宿舍阳台和浴室里偷偷喝酒——那是我至今最快乐的时光。\n\n整个高中被疫情笼罩，2022年3月封到年底。高考延后，回家又遇新疆封控，错过大学第一学期。\n\n在这里打了两年网球。",
    image: "/pic/崇明中学.jpg",
    keywords: ["崇明中学", "内高班", "疫情", "偷喝酒", "网球", "绿皮火车"],
    extras: [
      {
        label: "浴室喝酒",
        image: "/pic/浴室喝酒.jpg",
        story:
          "买酒要偷偷点外卖，喝完处理酒瓶更难。七八个人挤在阳台或浴室里，喝到深夜。现在能去任何fancy的酒吧，却永远找不到那个感觉了。",
      },
      {
        label: "70小时绿皮火车",
        image: "/pic/在返回新疆的火车上.jpg",
        story:
          "统一安排，集体出发。70多个小时在火车上，很辛苦，但和同学们在一起，那段火车上的时光也是快乐的。",
      },
    ],
  },
  {
    id: "nanjing",
    name: "南京",
    nameEn: "Nanjing",
    period: "2022 - 2026",
    color: "#a78bfa",
    emoji: "🎓",
    coords: [32.06, 118.79],
    description:
      "南京大学，信息管理与信息系统。成绩靠前，获得保研资格但主动放弃——选择了直接就业。\n\n实习：同花顺，数据分析师。\n毕业后：满帮集团 AI 算法部门，数据分析工程师。",
    image: "/pic/南京大学.png",
    keywords: ["南京大学", "放弃保研", "同花顺", "满帮", "毕业"],
  },
];

export const interests = {
  tennis: {
    title: "网球",
    emoji: "🎾",
    story:
      "在上海崇明中学期间打了两年网球。\n\n不是竞技水平多高，而是在那个封闭的环境里，网球场是为数不多可以自由呼吸的地方。挥拍、跑动、出汗——一种不需要语言的表达方式。",
    image: null,
  },
  drinking: {
    title: "酒",
    emoji: "🍺",
    story:
      "喝酒，但不只是喝酒。\n\n最好的酒是在崇明中学宿舍浴室里喝的——七八个人，小心翼翼，偷偷摸摸，喝到凌晨。那不是酒精，是一种共享的秘密，是那个年纪能拥有的为数不多的反叛。\n\n现在能光明正大地喝、随时随地喝，但那种'偷偷喝酒'的快乐再也找不到了。\n\n不是为了醉。是为了在一起。",
    images: ["/pic/啤酒.jpg", "/pic/酒.jpg"],
  },
  music: {
    title: "音乐",
    emoji: "🎵",
    story:
      "歌单「real music」是我的情绪地图。\n\nJoji 的忧郁、Imagine Dragons 的力量、Adele 的穿透力、Taylor Swift 的叙事——\n\n音乐对我来说不是背景，是情绪的索引。每首歌都是一段特定时间、特定地点的标记。",
    playlistName: "real music",
    playlistCreator: "e-呓语",
    playlistUrl: "https://music.163.com/playlist?id=bbmTYMjF",
    highlights: [
      "SLOW DANCING IN THE DARK - Joji",
      "Demons - Imagine Dragons",
      "Someone Like You - Adele",
      "Young And Beautiful - Lana Del Rey",
      "exile - Taylor Swift / Bon Iver",
      "City Of Stars - Ryan Gosling / Emma Stone",
    ],
  },
};

export const ctf = {
  title: "计算机设计大赛",
  emoji: "🏆",
  description: "参加计算机设计大赛，团队合照。",
  image: "/pic/计算机设计大赛合照.jpg",
};

export const covidStory = {
  title: "疫情",
  emoji: "😷",
  description:
    "2022年上海封城，从3月到年底。高考延后。回到新疆又被封了四个月。这张照片就是那个时候——四个月没理发。",
  image: "/pic/疫情在新疆封了四个月的头发.jpg",
};

export const trainStory = {
  title: "归途",
  emoji: "🚂",
  description: "回新疆的火车上。天山。",
  images: ["/pic/在返回新疆的火车上.jpg", "/pic/回新疆飞机天山景色.jpg"],
  video: "/pic/回新疆火车场景.mp4",
};

export const photos = [
  { src: "/pic/我的照片/艺术照.jpg", alt: "艺术照" },
  { src: "/pic/我的照片/IMG_20220408_193538.jpg", alt: "上海时期" },
  { src: "/pic/我的照片/IMG_20220501_151347.jpg", alt: "高中时期" },
  { src: "/pic/我的照片/IMG_20240115_133655.jpg", alt: "大学时期" },
  { src: "/pic/我的照片/mmexport1651479550723.jpg", alt: "与朋友" },
  { src: "/pic/新疆草原.png", alt: "新疆草原" },
  { src: "/pic/回新疆飞机天山景色.jpg", alt: "天山" },
  { src: "/pic/上海站.jpg", alt: "上海站" },
  { src: "/pic/南京.jpg", alt: "南京" },
];

export const contactLinks = [
  {
    label: "GitHub",
    url: "https://github.com/IlyarMamattursun",
    icon: "github",
  },
  {
    label: "Email",
    url: "mailto:elyar@smail.nju.edu.cn",
    icon: "email",
  },
];

export const neofetchOutput = `         -/oyhhhhhhyo/-        guest@ilyar
     -ohhhhhhhhhhhhhhhhho-     ------------
   -yhhhhhhhhhhhhhhhhhhhhhhy-   OS:      边缘精英 v23.0
  :hhhhhhhhhhhhhhhhhhhhhhhhh:  Shell:   系统拆解者
 /hhhhhhhhhhhhhhhhhhhhhhhhhhh/ Uptime:  23 years
:hhhhhhhhhhhhhhhhhhhhhhhhhhhhh: Packages: 网球, 酒, Joji, 绿皮火车
:hhhhhhhhhhhhhhhhhhhhhhhhhhhhh: WM:      INTJ
:hhhhhhhhhhhhhhhhhhhhhhhhhhhhh: Terminal: 喀什→乌市→上海→南京→？
:hhhhhhhhhhhhhhhhhhhhhhhhhhhhh:
:hhhhhhhhhhhhhhhhhhhhhhhhhhhhh:         逃离确定性中...
:hhhhhhhhhhhhhhhhhhhhhhhhhhhhh:
-ohhhhhhhhhhhhhhhhhhhhhhhhho-
  -yhhhhhhhhhhhhhhhhhhhhhhy-
    :yhhhhhhhhhhhhhhhhhhy:
      -shhhhhhhhhhhhhhs-
        ./shhhhhhhs/.
`;
