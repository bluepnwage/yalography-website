const tasks = [
  {
    id: 1,
    name: "Stand-alone web-enabled solution",
    deadline: "1/6/2023",
    description: null,
    status: false,
    priority: "medium"
  },
  {
    id: 2,
    name: "Switchable analyzing infrastructure",
    deadline: null,
    description: "Fusce posuere felis sed lacus.",
    status: false,
    priority: "low"
  },
  {
    id: 3,
    name: "Synergistic next generation structure",
    deadline: "1/4/2023",
    description: "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.",
    status: true,
    priority: "low"
  },
  {
    id: 4,
    name: "Right-sized disintermediate system engine",
    deadline: "12/18/2022",
    description: null,
    status: false,
    priority: "low"
  },
  {
    id: 5,
    name: "Virtual 24 hour software",
    deadline: "12/29/2022",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis.",
    status: false,
    priority: "high"
  },
  {
    id: 6,
    name: "Fundamental impactful infrastructure",
    deadline: "1/15/2023",
    description: null,
    status: false,
    priority: "low"
  },
  {
    id: 7,
    name: "Business-focused stable solution",
    deadline: null,
    description: "Sed sagittis.",
    status: false,
    priority: "low"
  },
  {
    id: 8,
    name: "Integrated grid-enabled parallelism",
    deadline: "3/11/2023",
    description: "Aenean lectus. Pellentesque eget nunc.",
    status: true,
    priority: "medium"
  },
  {
    id: 9,
    name: "Profound methodical parallelism",
    deadline: "1/2/2023",
    description: null,
    status: true,
    priority: "low"
  },
  {
    id: 10,
    name: "Phased systemic portal",
    deadline: null,
    description: null,
    status: true,
    priority: "low"
  },
  {
    id: 11,
    name: "Profit-focused 24 hour internet solution",
    deadline: "1/22/2023",
    description: "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
    status: false,
    priority: "medium"
  },
  {
    id: 12,
    name: "Virtual optimal functionalities",
    deadline: "12/24/2022",
    description:
      "Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
    status: true,
    priority: "high"
  },
  {
    id: 13,
    name: "Implemented demand-driven secured line",
    deadline: "2/7/2023",
    description: null,
    status: true,
    priority: "high"
  },
  {
    id: 14,
    name: "Decentralized 5th generation forecast",
    deadline: "1/6/2023",
    description: null,
    status: true,
    priority: "medium"
  },
  {
    id: 15,
    name: "Ameliorated holistic flexibility",
    deadline: "12/29/2022",
    description: null,
    status: true,
    priority: "high"
  },
  {
    id: 16,
    name: "Re-engineered hybrid secured line",
    deadline: null,
    description: null,
    status: true,
    priority: "high"
  },
  {
    id: 17,
    name: "Phased multi-state application",
    deadline: "2/12/2023",
    description: null,
    status: false,
    priority: "low"
  },
  {
    id: 18,
    name: "Multi-layered optimizing algorithm",
    deadline: "3/4/2023",
    description: "Suspendisse ornare consequat lectus.",
    status: true,
    priority: "medium"
  },
  {
    id: 19,
    name: "Public-key human-resource analyzer",
    deadline: "2/22/2023",
    description: "Etiam vel augue. Vestibulum rutrum rutrum neque.",
    status: false,
    priority: "medium"
  },
  {
    id: 20,
    name: "Re-contextualized transitional pricing structure",
    deadline: "1/15/2023",
    description: "Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
    status: false,
    priority: "low"
  },
  {
    id: 21,
    name: "Total upward-trending approach",
    deadline: null,
    description:
      "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    status: false,
    priority: "high"
  },
  {
    id: 22,
    name: "Ergonomic bottom-line knowledge user",
    deadline: "3/26/2023",
    description: null,
    status: false,
    priority: "low"
  },
  {
    id: 23,
    name: "Decentralized reciprocal installation",
    deadline: "2/28/2023",
    description: "Donec posuere metus vitae ipsum. Aliquam non mauris.",
    status: true,
    priority: "high"
  },
  {
    id: 24,
    name: "Innovative fresh-thinking standardization",
    deadline: "2/13/2023",
    description: "Donec quis orci eget orci vehicula condimentum.",
    status: false,
    priority: "low"
  },
  {
    id: 25,
    name: "Multi-tiered asynchronous budgetary management",
    deadline: "3/25/2023",
    description: "Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.",
    status: false,
    priority: "high"
  },
  {
    id: 26,
    name: "Phased exuding emulation",
    deadline: "1/8/2023",
    description: "Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    status: false,
    priority: "high"
  },
  {
    id: 27,
    name: "Future-proofed multi-tasking hierarchy",
    deadline: "1/28/2023",
    description: null,
    status: true,
    priority: "medium"
  },
  {
    id: 28,
    name: "Stand-alone fresh-thinking emulation",
    deadline: null,
    description: "In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl.",
    status: false,
    priority: "high"
  },
  {
    id: 29,
    name: "Secured 24 hour knowledge base",
    deadline: "2/22/2023",
    description:
      "Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    status: true,
    priority: "medium"
  },
  {
    id: 30,
    name: "User-friendly secondary standardization",
    deadline: "12/25/2022",
    description: "Nunc purus. Phasellus in felis. Donec semper sapien a libero.",
    status: false,
    priority: "low"
  },
  {
    id: 31,
    name: "Devolved client-driven data-warehouse",
    deadline: null,
    description: "Vivamus vestibulum sagittis sapien.",
    status: false,
    priority: "medium"
  },
  {
    id: 32,
    name: "Mandatory multimedia budgetary management",
    deadline: "1/13/2023",
    description: "Morbi quis tortor id nulla ultrices aliquet.",
    status: true,
    priority: "medium"
  },
  {
    id: 33,
    name: "Function-based empowering moratorium",
    deadline: null,
    description: "Suspendisse potenti.",
    status: false,
    priority: "medium"
  },
  {
    id: 34,
    name: "User-centric 6th generation focus group",
    deadline: "3/10/2023",
    description: null,
    status: true,
    priority: "medium"
  },
  {
    id: 35,
    name: "Advanced radical archive",
    deadline: "2/12/2023",
    description: "In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt.",
    status: false,
    priority: "high"
  },
  {
    id: 36,
    name: "Exclusive multi-tasking intranet",
    deadline: "12/24/2022",
    description:
      "Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.",
    status: true,
    priority: "low"
  },
  {
    id: 37,
    name: "Automated client-server access",
    deadline: "2/26/2023",
    description: null,
    status: false,
    priority: "medium"
  },
  {
    id: 38,
    name: "Total background project",
    deadline: "3/2/2023",
    description:
      "Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.",
    status: true,
    priority: "low"
  },
  {
    id: 39,
    name: "Open-source stable contingency",
    deadline: "2/19/2023",
    description:
      "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.",
    status: true,
    priority: "medium"
  },
  {
    id: 40,
    name: "Organic well-modulated matrices",
    deadline: "3/4/2023",
    description: "Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst.",
    status: false,
    priority: "high"
  }
];
module.exports = tasks;
