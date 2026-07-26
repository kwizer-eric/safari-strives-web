"""Seed the generic `cms_pages` / `cms_collections` tables with the real copy
that currently lives hardcoded in public-web's `src/data/*.ts` files (home,
about, ventures, testimonials, articles, site settings).

Unlike `pages` / `page_features` (structured columns for the 3 program
pages), these tables store a single JSON `payload` blob per slug/key, so the
admin "Page Editor" / "Collection Editor" screens can render + edit them
without a migration per content change.

Safe to re-run — rows are upserted by slug (`cms_pages`) or key
(`cms_collections`) instead of duplicated.

Usage:
    python -m scripts.seed_cms_content
"""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.cms import CmsCollection, CmsPage

APPLY_URL = "/applicant/login"
CONTACT_EMAIL = "safaristrives@gmail.com"
DONATE_URL = "https://www.paypal.com/donate/?hosted_button_id=69TB3LC2P9C7A"


CMS_PAGES: list[dict] = [
    {
        "slug": "home",
        "title": "Homepage",
        "is_published": True,
        "payload": {
            "hero": {
                "headline": "Supporting Entrepreneurs in Africa's Secondary Cities",
                "body": (
                    "Safari Strives provides local entrepreneurs with the tools, "
                    "space, funding, and operator-led support they need to increase "
                    "revenue, strengthen their businesses, create jobs, and become "
                    "better positioned for future opportunities."
                ),
                "image": "",
                "imageAlt": "Group of people in a community",
                "heroVideo": "",
            },
            "opening": {
                "title": "One business at a time.",
                "body": (
                    "In secondary cities like Rubavu, entrepreneurs are already "
                    "working, selling, hiring, and taking risks. Safari Strives "
                    "provides the space, tools, media capacity, and operator led "
                    "support that help local businesses scale."
                ),
            },
            "explore": {
                "title": "What we offer",
                "pillars": [
                    {
                        "id": "accelerator",
                        "title": "Venture Accelerator",
                        "description": (
                            "A four-month support cycle that helps operating MSMEs "
                            "become organized, visible, differentiated, and ready "
                            "for growth. Capacity first. Capital last, as a grant."
                        ),
                        "image": "https://images.unsplash.com/photo-1634936016780-65f6a77ebdd4?w=800&q=80",
                        "imageAlt": "Group of people standing in front of a building",
                        "href": "/our-model",
                    },
                    {
                        "id": "lab",
                        "title": "Green Enterprise Lab",
                        "description": (
                            "Our own poultry and waste-to-value business. It funds "
                            "the program and serves as a demo enterprise."
                        ),
                        "image": "https://images.unsplash.com/photo-1580918577344-fe0a66733a2a?w=800&q=80",
                        "imageAlt": "Group of people in red and brown dress",
                        "href": "/green-enterprise-lab",
                    },
                    {
                        "id": "hub",
                        "title": "The Hub",
                        "description": (
                            "Workspace, internet, production tools, packaging, and a "
                            "media studio in one place. The equipment a founder "
                            "could not buy alone, and an environment where founders "
                            "meet buyers, mentors, and each other in person."
                        ),
                        "image": "https://images.unsplash.com/photo-1675434301763-594b4d0c5819?w=800&q=80",
                        "imageAlt": "Group of people sitting at desks in an office",
                        "href": "/the-hub",
                    },
                ],
            },
            "inMotion": {
                "eyebrow": "In Motion",
                "title": "Proof That Model to Market Support Works",
                "cards": [
                    {
                        "id": "yale",
                        "label": "$45,000 Yale funding",
                        "image": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
                        "imageAlt": "University campus moment representing Yale support",
                    },
                    {
                        "id": "tsai-city",
                        "label": "Tsai CITY Summer Fellowship",
                        "image": "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=800&q=80",
                        "imageAlt": "Woman smiling outdoors during a fellowship moment",
                    },
                    {
                        "id": "ncc",
                        "label": "$17,500 North Central College funding",
                        "image": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
                        "imageAlt": "Students collaborating on a funded project",
                    },
                    {
                        "id": "hub",
                        "label": "The Hub buildout",
                        "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
                        "imageAlt": "Modern workspace hub under construction and use",
                    },
                    {
                        "id": "cohort",
                        "label": "First official cohort: four ventures, July to October 2026",
                        "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
                        "imageAlt": "Founders collaborating as a venture cohort",
                    },
                    {
                        "id": "gel",
                        "label": "4,000+ birds in current production",
                        "image": "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80",
                        "imageAlt": "Poultry production at the Green Enterprise Lab",
                    },
                    {
                        "id": "mentors",
                        "label": "Mentors, tools, and records",
                        "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
                        "imageAlt": "Mentors and founders working with tools and records",
                    },
                ],
            },
            "featuredInsights": {"title": "Featured Insights"},
            "finalCta": {
                "line1": "Talent is not missing. Infrastructure is",
                "line2": "Safari Strives. Build the conditions. Scale the work.",
            },
        },
    },
    {
        "slug": "about",
        "title": "About Page",
        "is_published": True,
        "payload": {
            "hero": {
                "eyebrow": "About Safari Strives",
                "headline": {"line1": "Why Safari Strives", "line2": "Exists"},
                "watchVideoLabel": "Watch video",
                "subhead": (
                    "Safari Strives fosters economic independence in Rwanda "
                    "through sustainable enterprises, job creation, and "
                    "zero-interest microloans for women."
                ),
                "image": "",
                "imageAlt": "Safari Strives about hero",
                "heroVideo": "",
                "videoId": "njiqUJcuVc4",
                "videoStart": 15,
                "legalNote": (
                    "Safari Strives Inc. is a registered not-for-profit corporation "
                    "in the State of Illinois, EIN 39-4883848, and a 501(c)(3) "
                    "public charity recognized by the IRS."
                ),
            },
            "mission": {
                "label": "Case study",
                "paragraphs": [
                    (
                        "World Bank President Ajay Banga has called jobs one of the "
                        "surest paths out of poverty. In Rwanda, many people have "
                        "not waited for jobs to appear. They have built their own "
                        "through shops, tailoring, poultry, local products, and "
                        "businesses carried through unstable conditions."
                    ),
                    (
                        "But effort alone does not build a scalable business. "
                        "Rwanda's business landscape remains 87% informal, showing "
                        "how many enterprises still lack the growth basics: "
                        "systems, pricing, tools, visibility, buyer access, and "
                        "leadership discipline."
                    ),
                    (
                        "The deeper issue is concentration. In 2024, 60.7% of "
                        "Rwanda's formal businesses were in Kigali, compared with "
                        "9.7% in the Western Province, where Rubavu sits. The "
                        "strongest hubs, accelerators, mentors, buyers, and funding "
                        "pipelines still sit too close to main cities. Safari "
                        "Strives builds the missing infrastructure in Rubavu, "
                        "helping founders produce better, sell better, grow "
                        "revenue, and make their value visible."
                    ),
                ],
                "practitionerLed": {
                    "label": "Practitioner-Led",
                    "body": (
                        "Safari Strives builds the conditions around operating "
                        "entrepreneurs, businesses that already have effort, "
                        "demand, and local traction, and helps them become "
                        "organized, visible, and ready for growth. We run our own "
                        "enterprise on the same street we serve, managing cash "
                        "flow, inventory, production, and costs for three years. "
                        "That is what tells us which conditions actually matter."
                    ),
                },
                "locations": [
                    {"label": "Head office", "region": "Rwanda", "place": "Rubavu, Rwanda"},
                    {
                        "label": "Corporate Headquarters",
                        "region": "United States",
                        "place": "Crestwood, Illinois",
                    },
                ],
            },
            "team": {
                "eyebrow": "Team",
                "title": "Our Team",
                "intro": (
                    "Meet the dedicated individuals who make Safari Strives' "
                    "mission possible. Our team combines local expertise with "
                    "global vision to create sustainable change in communities."
                ),
            },
            "board": {
                "eyebrow": "Board",
                "title": "Board of Directors",
                "intro": (
                    "Safari Strives is governed by a board that provides "
                    "oversight, accountability, and strategic direction for our "
                    "work in Rwanda and the United States."
                ),
            },
            "partners": {
                "eyebrow": "Partners",
                "title": "Institutions that believe in the work.",
                "intro": (
                    "Safari Strives is supported by local institutions, academic "
                    "partners, and international collaborators who share our "
                    "conviction that communities deserve reliable pathways to "
                    "economic independence."
                ),
            },
            "closer": {
                "title": "Become a partner",
                "body": (
                    "We welcome partners with expertise, networks, market access, "
                    "and growth capital to help us reach more founders and expand "
                    "the Green Enterprise Lab in Rubavu."
                ),
                "primaryCta": {
                    "label": "Partner with Safari Strives",
                    "href": f"mailto:{CONTACT_EMAIL}",
                },
            },
        },
    },
    {
        "slug": "ventures",
        "title": "Ventures Page",
        "is_published": True,
        "payload": {
            "eyebrow": "Meet the ventures",
            "headline": "Entrepreneurs building beyond survival.",
            "heroVideo": "",
            "heroImage": "",
            "heroImageAlt": "People collaborating at computers in an office",
            "mission": {
                "eyebrow": "Our mission",
                "body": (
                    "Our mission is to help promising ventures escape the "
                    "commodity trap. When a business looks like every other "
                    "business, customers only compare prices. Safari Strives "
                    "helps entrepreneurs make their value visible."
                ),
                "ctaLabel": "Apply Here",
                "ctaHref": APPLY_URL,
            },
        },
    },
    {
        "slug": "field-notes",
        "title": "Field Notes Page",
        "is_published": True,
        "payload": {
            "eyebrow": "Field Notes",
            "headline": "Stories from the ground.",
            "subhead": (
                "Dispatches from Rubavu — on ventures, the hub, the lab, and the "
                "work of making local enterprise visible."
            ),
            "heroImage": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1920&q=80",
            "heroImageAlt": "Notebook and pen on a desk",
        },
    },
]


CMS_COLLECTIONS: list[dict] = [
    {
        "key": "site",
        "label": "Site Settings",
        "is_published": True,
        "payload": {
            "name": "Safari Strives",
            "logo": "/logo/logo.png",
            "logoWhite": "/logo/logowhite.png",
            "tagline": {"line1": "Every Person,", "line2": "Every Opportunity"},
            "description": "A nonprofit enterprise hub.",
            "email": CONTACT_EMAIL,
            "donateHref": DONATE_URL,
            "applyUrl": APPLY_URL,
            "locations": ["Rubavu, Rwanda", "Crestwood, Illinois"],
            "social": {"linkedin": "#", "facebook": "#", "instagram": "#"},
            "navLinks": [
                {"label": "Ventures", "href": "/ventures"},
                {"label": "Our Model", "href": "/our-model"},
                {"label": "Blog", "href": "/field-notes"},
                {"label": "About", "href": "/about"},
            ],
            "ourModelLinks": [
                {
                    "title": "Venture Accelerator",
                    "description": "Model-to-market support for founders in Rubavu",
                    "href": "/our-model",
                },
                {
                    "title": "Green Enterprise Lab",
                    "description": "Hands-on enterprise building on the ground",
                    "href": "/green-enterprise-lab",
                },
                {
                    "title": "The Hub",
                    "description": "Shared workspace and community for local businesses",
                    "href": "/the-hub",
                },
            ],
            "footerColumns": {
                "programs": {
                    "title": "Programs",
                    "links": [
                        {"label": "Venture Accelerator", "href": "/our-model"},
                        {"label": "Green Enterprise Lab", "href": "/green-enterprise-lab"},
                        {"label": "The Hub", "href": "/the-hub"},
                    ],
                },
                "about": {
                    "title": "About",
                    "links": [
                        {"label": "Our Mission", "href": "/about#mission"},
                        {"label": "Team", "href": "/about#team"},
                        {"label": "Partners", "href": "/about#partners"},
                    ],
                },
                "insights": {
                    "title": "Insights",
                    "links": [
                        {"label": "Blog", "href": "/field-notes"},
                        {"label": "Contact", "href": "#contact"},
                    ],
                },
            },
        },
    },
    {
        "key": "testimonials",
        "label": "Testimonials",
        "is_published": True,
        "payload": {
            "items": [
                {
                    "id": "1",
                    "role": "Founder, Ukuri Fund",
                    "quote": (
                        "Safari Strives has taught us how to build a sustainable "
                        "future for our community. We are excited about what lies "
                        "ahead!"
                    ),
                    "name": "Emily Johnson",
                },
                {
                    "id": "2",
                    "role": "Managing Director, Rubavu Ventures",
                    "quote": (
                        "The accelerator gave our team structure, visibility, and "
                        "the confidence to grow beyond what we thought possible."
                    ),
                    "name": "Luis Martinez",
                },
                {
                    "id": "3",
                    "role": "Former CIA Economist",
                    "quote": (
                        "Safari Strives has given me the tools to become "
                        "financially independent. I am proud to support my "
                        "family!"
                    ),
                    "name": "Fatima El-Sayed",
                },
                {
                    "id": "4",
                    "role": "CEO, Lagos Agro Processing",
                    "quote": (
                        "Safari Strives has opened doors for me that I never "
                        "thought possible. I am now pursuing my education with "
                        "confidence!"
                    ),
                    "name": "Chinonso Okafor",
                },
                {
                    "id": "5",
                    "role": "Program Director, Tsai CITY",
                    "quote": (
                        "The programs offered by Safari Strives have made a "
                        "significant difference in our community. We are stronger "
                        "together!"
                    ),
                    "name": "Rajesh Kumar",
                },
                {
                    "id": "6",
                    "role": "Founder, Green Harvest Co.",
                    "quote": (
                        "The hub gave us equipment and space we could never have "
                        "afforded alone. That changed everything for our "
                        "business."
                    ),
                    "name": "Sukanya Chai",
                },
                {
                    "id": "7",
                    "role": "Venture Mentor, Yale SOM",
                    "quote": (
                        "Safari Strives helped me start my own business, and now "
                        "I can support my family and contribute to my community."
                    ),
                    "name": "Ana Pereira",
                },
                {
                    "id": "8",
                    "role": "Cohort Lead, First Safari Cohort",
                    "quote": (
                        "Thanks to Safari Strives, my family received the support "
                        "we desperately needed. We are forever grateful!"
                    ),
                    "name": "Samuel Mwangi",
                },
                {
                    "id": "9",
                    "role": "Board Member, North Central College LEV",
                    "quote": (
                        "The support from Safari Strives has changed my life. I "
                        "now have the resources to pursue my education and "
                        "achieve my dreams."
                    ),
                    "name": "Jessica Smith",
                },
            ]
        },
    },
    {
        "key": "ventures",
        "label": "Ventures",
        "is_published": True,
        "payload": {
            "items": [
                {
                    "id": "umubyeyi",
                    "founder": "Umubyeyi",
                    "ventureName": "Isano Naturals",
                    "category": "Cosmetics",
                    "tagline": "Natural skincare made visible, not just sold by the jar.",
                    "story": [
                        (
                            "Isano Naturals began with Umubyeyi blending oils and "
                            "butters for customers who wanted products that felt "
                            "trustworthy and locally made. The formulas were "
                            "strong, but on the shelf they looked like every other "
                            "jar — no story, no label system, no reason to pay "
                            "more."
                        ),
                        (
                            "Through Safari Strives, Umubyeyi is building a brand "
                            "customers can recognize: consistent packaging, "
                            "product photos, ingredient clarity, and a story that "
                            "explains why these cosmetics are worth choosing."
                        ),
                    ],
                    "highlights": [
                        {
                            "title": "Product presentation",
                            "body": (
                                "Professional labels, photography, and packaging "
                                "that help buyers see quality before they compare "
                                "prices."
                            ),
                        },
                        {
                            "title": "Ingredient trust",
                            "body": (
                                "Clear sourcing and usage information so customers "
                                "understand what they are buying and why it works."
                            ),
                        },
                        {
                            "title": "Repeat buyers",
                            "body": (
                                "Moving from one-off market sales to customers who "
                                "come back because the brand feels reliable."
                            ),
                        },
                    ],
                    "image": "https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=800&q=80",
                    "imageAlt": "Founder Umubyeyi preparing natural cosmetics",
                },
                {
                    "id": "ijisho-artspace",
                    "founder": "Uwase Chantal",
                    "ventureName": "IJISHO Artspace",
                    "category": "Handcrafted decor",
                    "location": "Rubavu",
                    "tagline": "Handcrafted decor with a story buyers can see and remember.",
                    "story": [
                        (
                            "IJISHO Artspace turns local materials into decor "
                            "pieces with character — woven baskets, wall art, and "
                            "home accents made in Rubavu. Chantal's craft is "
                            "strong, but in open markets every stall looks similar "
                            "and buyers default to the lowest price."
                        ),
                        (
                            "Safari Strives is helping IJISHO build a visible "
                            "brand: styled product shots, consistent collections, "
                            "and buyer-facing content that shows the work behind "
                            "each piece."
                        ),
                    ],
                    "highlights": [
                        {
                            "title": "Collection design",
                            "body": (
                                "Curated product lines instead of one-off pieces, "
                                "so buyers know what IJISHO stands for."
                            ),
                        },
                        {
                            "title": "Visual storytelling",
                            "body": (
                                "Photos and short clips that show process, "
                                "materials, and the makers behind the work."
                            ),
                        },
                        {
                            "title": "Buyer channels",
                            "body": (
                                "Relationships with shops, hotels, and design "
                                "buyers who want decor with a clear local "
                                "identity."
                            ),
                        },
                    ],
                    "image": "https://images.unsplash.com/photo-1612928414075-bc722ade44f1?w=800&q=80",
                    "imageAlt": "Handcrafted decor from IJISHO Artspace",
                },
                {
                    "id": "byusa-farm",
                    "founder": "Byusa Armstrong",
                    "ventureName": "Iterambere Farm",
                    "category": "Pig farming",
                    "location": "Rubavu",
                    "tagline": "A pig farm run with records, discipline, and a plan to scale.",
                    "story": [
                        (
                            "Iterambere Farm is Armstrong's operating livestock "
                            "business in Rubavu. He already sells pork to local "
                            "buyers, but like many small farms, growth was limited "
                            "by informal records, inconsistent feed costs, and no "
                            "clear brand behind the product."
                        ),
                        (
                            "With Safari Strives, Armstrong is tightening "
                            "production systems — feed tracking, weight records, "
                            "buyer lists — and building a farm identity customers "
                            "can trust beyond today's market price."
                        ),
                    ],
                    "highlights": [
                        {
                            "title": "Production records",
                            "body": (
                                "Monthly tracking of feed, weight gain, mortality, "
                                "and output so decisions are based on numbers."
                            ),
                        },
                        {
                            "title": "Cost control",
                            "body": (
                                "Clearer input costs and yield data to protect "
                                "margins as the herd grows."
                            ),
                        },
                        {
                            "title": "Market positioning",
                            "body": (
                                "Packaging and buyer communication that move the "
                                "farm beyond commodity pork sales."
                            ),
                        },
                    ],
                    "image": "https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=800&q=80",
                    "imageAlt": "Byusa Armstrong on his pig farm",
                },
                {
                    "id": "sunbake",
                    "founder": "Eric Habimana",
                    "ventureName": "Sunbake Sourdough",
                    "category": "Food & bakery",
                    "location": "Rubavu",
                    "tagline": "Artisan bread with packaging, consistency, and repeat delivery routes.",
                    "story": [
                        (
                            "Sunbake Sourdough started as Eric's home oven and "
                            "loyal neighbors. Demand grew, but loose loaves in "
                            "open trays made it hard to charge for quality or "
                            "supply shops reliably."
                        ),
                        (
                            "The venture is now building a bakery identity — "
                            "branded bags, standard loaf sizes, production "
                            "schedules, and buyer lists that move Sunbake from "
                            "weekend sales to weekday supply."
                        ),
                    ],
                    "highlights": [
                        {
                            "title": "Product consistency",
                            "body": (
                                "Standard recipes, batch sizes, and quality checks "
                                "so every loaf matches the last."
                            ),
                        },
                        {
                            "title": "Branded packaging",
                            "body": (
                                "Labels and bags that signal freshness and make "
                                "the bread easy to display."
                            ),
                        },
                        {
                            "title": "Delivery routes",
                            "body": (
                                "Scheduled drops to cafés and shops instead of "
                                "waiting for walk-in demand."
                            ),
                        },
                    ],
                    "image": "https://images.unsplash.com/photo-1523477800337-966dbabe060b?w=800&q=80",
                    "imageAlt": "Sunbake sourdough loaves ready for delivery",
                },
            ]
        },
    },
    {
        "key": "articles",
        "label": "Field Notes Articles",
        "is_published": True,
        "payload": {
            "items": [
                {
                    "id": "rubavu-msmes",
                    "title": "Why Secondary Cities Like Rubavu Need Venture Infrastructure",
                    "excerpt": (
                        "Entrepreneurs in secondary cities are already building. "
                        "What they lack is the infrastructure, tools, and support "
                        "systems that help ventures scale."
                    ),
                    "date": "June 12, 2026",
                    "category": "Ecosystem",
                    "author": "Safari Strives Team",
                    "readTime": "7 min read",
                    "image": "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?w=1920&q=80",
                    "imageAlt": "A woman standing in front of a group of children",
                    "sections": [
                        {
                            "type": "paragraph",
                            "text": (
                                "Rubavu is full of operating businesses. Market "
                                "stalls, tailoring shops, farms, roasteries, and "
                                "small manufacturers are already moving product "
                                "and earning income. What is harder to find is the "
                                "layer between survival and scale: the systems "
                                "that help a good business look like a good "
                                "business."
                            ),
                        },
                        {
                            "type": "heading",
                            "id": "why-secondary-cities",
                            "level": 2,
                            "text": "Why secondary cities are overlooked",
                        },
                        {
                            "type": "paragraph",
                            "text": (
                                "In larger cities, founders can rent coworking "
                                "space, hire a designer, find a photographer, and "
                                "meet investors over coffee. In Rubavu, those "
                                "pieces are scattered, expensive, or simply "
                                "unavailable. Founders patch together solutions — "
                                "WhatsApp orders, handwritten receipts, product "
                                "photos taken on a cracked phone screen."
                            ),
                        },
                        {
                            "type": "quote",
                            "text": (
                                "Talent is not missing in secondary cities. The "
                                "missing piece is infrastructure — space, tools, "
                                "records, and visibility."
                            ),
                        },
                        {
                            "type": "heading",
                            "id": "what-founders-are-missing",
                            "level": 2,
                            "text": "What founders are missing today",
                        },
                        {
                            "type": "paragraph",
                            "text": (
                                "Most ventures in secondary cities are not failing "
                                "for lack of effort. They are constrained by "
                                "missing infrastructure: reliable workspace, "
                                "production tools, media capacity, and "
                                "operator-led support that turns daily work into "
                                "visible, repeatable enterprise."
                            ),
                        },
                        {
                            "type": "heading",
                            "id": "key-gaps",
                            "level": 3,
                            "text": "Key gaps we see on the ground:",
                        },
                        {
                            "type": "list",
                            "items": [
                                "No shared space with internet, tools, and packaging equipment",
                                "Weak product presentation — photography, labels, and buyer-ready materials",
                                "Informal records that make growth and grants harder to justify",
                                "Limited mentorship from operators who have run real businesses",
                            ],
                        },
                        {
                            "type": "heading",
                            "id": "how-safari-strives-responds",
                            "level": 2,
                            "text": "How Safari Strives responds",
                        },
                        {
                            "type": "paragraph",
                            "text": (
                                "Safari Strives exists to close that gap. Not by "
                                "replacing what founders already know, but by "
                                "adding the missing infrastructure: a hub with "
                                "internet and tools, a media room for product "
                                "storytelling, operator-led mentorship, and a lab "
                                "that demonstrates what disciplined enterprise "
                                "looks like in practice."
                            ),
                        },
                        {
                            "type": "heading",
                            "id": "final-thoughts",
                            "level": 2,
                            "text": "Final thoughts",
                        },
                        {
                            "type": "paragraph",
                            "text": (
                                "Secondary cities do not need another pitch "
                                "competition. They need conditions — reliable "
                                "space, visible brands, production records, and "
                                "buyer-ready presentation. That is the work we are "
                                "building, one venture at a time."
                            ),
                        },
                    ],
                },
                {
                    "id": "hub-launch",
                    "title": "Inside the Hub: Tools, Studio, and Space for Founders",
                    "excerpt": (
                        "Workspace, internet, production tools, packaging, and a "
                        "media studio in one place for founders who could not buy "
                        "the equipment alone."
                    ),
                    "date": "May 28, 2026",
                    "category": "The Hub",
                    "author": "Safari Strives Team",
                    "readTime": "5 min read",
                    "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
                    "imageAlt": "Modern workspace hub",
                    "sections": [
                        {
                            "type": "paragraph",
                            "text": (
                                "When a founder in Rubavu needs product photos, "
                                "where do they go? When they need labels printed, "
                                "packaging sealed, or a quiet room to meet a buyer "
                                "— what is available? For most, the answer is "
                                "improvisation."
                            ),
                        },
                        {
                            "type": "heading",
                            "id": "what-the-hub-includes",
                            "level": 2,
                            "text": "What the hub includes",
                        },
                        {
                            "type": "paragraph",
                            "text": (
                                "The Safari Strives Hub brings those missing "
                                "pieces into one place. Founders' lounge with "
                                "reliable internet. A media room for photos, short "
                                "videos, and buyer-facing content. Production and "
                                "packaging tools that no single small business "
                                "could justify buying alone."
                            ),
                        },
                        {
                            "type": "quote",
                            "text": "The hub is not an office. It is part of the intervention.",
                        },
                        {
                            "type": "heading",
                            "id": "hub-capabilities",
                            "level": 3,
                            "text": "Capabilities under one roof:",
                        },
                        {
                            "type": "list",
                            "items": [
                                "Founders' lounge with stable internet and shared desktops",
                                "Media room for product photography and short-form video",
                                "Printers, sealers, scales, and heat press for packaging",
                                "Quiet space for buyer meetings and mentor sessions",
                            ],
                        },
                        {
                            "type": "heading",
                            "id": "built-into-the-accelerator",
                            "level": 2,
                            "text": "Built into the accelerator",
                        },
                        {
                            "type": "paragraph",
                            "text": (
                                "We designed the hub as an extension of the "
                                "accelerator. Founders do not just receive advice "
                                "here; they produce work here. Labels get "
                                "printed. Lookbooks get shot. Records get kept on "
                                "shared desktops with stable power and "
                                "connectivity."
                            ),
                        },
                        {
                            "type": "heading",
                            "id": "why-it-matters",
                            "level": 2,
                            "text": "Why it matters",
                        },
                        {
                            "type": "paragraph",
                            "text": (
                                "The next generation of scalable Rwandan "
                                "enterprises needs more than guidance. It needs "
                                "space, tools, visibility, and structure — under "
                                "one roof."
                            ),
                        },
                    ],
                },
                {
                    "id": "cohort-one",
                    "title": "Meet the First Cohort: Four Ventures, One Support Cycle",
                    "excerpt": (
                        "Four operating ventures. One four-month support cycle. "
                        "Capacity first, capital last as a grant when ventures "
                        "are ready to grow."
                    ),
                    "date": "May 15, 2026",
                    "category": "Ventures",
                    "author": "Safari Strives Team",
                    "readTime": "6 min read",
                    "image": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
                    "imageAlt": "First cohort venture founders",
                    "sections": [
                        {
                            "type": "paragraph",
                            "text": (
                                "The first Safari Strives cohort is not a "
                                "classroom. It is four operating ventures — "
                                "cosmetics, decor, farming, fashion — each with "
                                "real customers and real constraints. The "
                                "accelerator wraps structure around businesses "
                                "that already exist."
                            ),
                        },
                        {
                            "type": "heading",
                            "id": "the-support-cycle",
                            "level": 2,
                            "text": "The support cycle",
                        },
                        {
                            "type": "paragraph",
                            "text": (
                                "Over four months, each founder works through a "
                                "support cycle: clarify the offer, improve "
                                "presentation, tighten records, and build buyer "
                                "relationships that repeat. Milestone-based grants "
                                "arrive when there is evidence — not when there is "
                                "a slide deck."
                            ),
                        },
                        {
                            "type": "quote",
                            "text": (
                                "Capacity first. Capital last — as a grant when "
                                "ventures are ready to grow."
                            ),
                        },
                        {
                            "type": "heading",
                            "id": "escaping-the-commodity-trap",
                            "level": 2,
                            "text": "Escaping the commodity trap",
                        },
                        {
                            "type": "paragraph",
                            "text": (
                                "What unites the cohort is not sector. It is the "
                                "commodity trap: businesses that work hard but "
                                "look interchangeable on the shelf. Our job is to "
                                "help each venture make its value visible — "
                                "through packaging, photography, pricing "
                                "discipline, and brand clarity."
                            ),
                        },
                        {
                            "type": "heading",
                            "id": "growing-carefully",
                            "level": 2,
                            "text": "Growing carefully",
                        },
                        {
                            "type": "paragraph",
                            "text": (
                                "This is the beginning of a portfolio we intend to "
                                "grow carefully. Fewer ventures, deeper support, "
                                "measurable progress."
                            ),
                        },
                    ],
                },
                {
                    "id": "packaging-lessons",
                    "title": "What Loose Eggs Taught Us About Packaging",
                    "excerpt": (
                        "At the Green Enterprise Lab, selling eggs loose meant "
                        "buyers compared price and nothing else. Packaging "
                        "changed the conversation."
                    ),
                    "date": "April 30, 2026",
                    "category": "Green Lab",
                    "author": "Safari Strives Team",
                    "readTime": "5 min read",
                    "image": "https://images.unsplash.com/photo-1580918577344-fe0a66733a2a?w=800&q=80",
                    "imageAlt": "Packaged farm products on a shelf",
                    "sections": [
                        {
                            "type": "paragraph",
                            "text": (
                                "The Green Enterprise Lab runs a real poultry "
                                "operation — not a simulation. For months, eggs "
                                "went out loose: no brand, no count guarantee, no "
                                "story. Buyers haggled on price because there was "
                                "nothing else to evaluate."
                            ),
                        },
                        {
                            "type": "heading",
                            "id": "packaging-changes-the-conversation",
                            "level": 2,
                            "text": "Packaging changes the conversation",
                        },
                        {
                            "type": "paragraph",
                            "text": (
                                "We started packaging. Standard counts, clean "
                                "cartons, labels with the farm name and collection "
                                "date. The cost added a few francs per unit. The "
                                "effect was larger: shops could display the "
                                "product. Buyers could remember the name. Repeat "
                                "orders became possible."
                            ),
                        },
                        {
                            "type": "quote",
                            "text": "When products look the same, customers only compare prices.",
                        },
                        {
                            "type": "heading",
                            "id": "lessons-for-the-portfolio",
                            "level": 2,
                            "text": "Lessons for the portfolio",
                        },
                        {
                            "type": "paragraph",
                            "text": (
                                "The same logic applies across the portfolio. "
                                "Manure processed into graded fertilizer instead "
                                "of sold raw. Feed milled in-house instead of "
                                "bought at market price without records. Every "
                                "step is a lesson founders can see and copy."
                            ),
                        },
                        {
                            "type": "heading",
                            "id": "demonstration-not-simulation",
                            "level": 2,
                            "text": "Demonstration, not simulation",
                        },
                        {
                            "type": "paragraph",
                            "text": (
                                "The lab funds the hub and accelerator, but its "
                                "deeper role is demonstration — proof that "
                                "disciplined operations and visible products "
                                "change how local markets respond."
                            ),
                        },
                    ],
                },
            ]
        },
    },
    {
        "key": "team-members",
        "label": "Team Members",
        "is_published": True,
        "payload": {
            "items": [
                {
                    "id": "elie-imani",
                    "name": "Elie Imani",
                    "role": "Executive Director & Co-Founder",
                    "location": "U.S. · Rwanda",
                    "bio": (
                        "Leads Safari Strives strategy and strengthens the model "
                        "through graduate research in African Studies at Yale "
                        "University."
                    ),
                    "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
                    "imageAlt": "Elie Imani portrait",
                },
                {
                    "id": "martin-sheehan",
                    "name": "Martin Sheehan",
                    "role": "Quality Director",
                    "location": "United States",
                    "bio": (
                        "Oversees program quality, standards, and the consistency "
                        "of Safari Strives' field operations."
                    ),
                    "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
                    "imageAlt": "Martin Sheehan portrait",
                },
                {
                    "id": "rafael-peres",
                    "name": "Rafael Peres",
                    "role": "Economic Strategy & Co-founder",
                    "location": "United States",
                    "bio": (
                        "Shapes economic strategy and the long-term financial "
                        "model behind Safari Strives' enterprises."
                    ),
                    "image": "https://images.unsplash.com/photo-1519085360753-af0111f7cbe7?w=800&q=80",
                    "imageAlt": "Rafael Peres portrait",
                },
                {
                    "id": "manshimwe-josue",
                    "name": "Manshimwe Josue",
                    "role": "Operations Director",
                    "location": "Rubavu, Rwanda",
                    "bio": (
                        "Manages day-to-day operations on the ground and "
                        "coordinates the Rwanda team's delivery."
                    ),
                    "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
                    "imageAlt": "Manshimwe Josue portrait",
                },
                {
                    "id": "carolina-alfaro",
                    "name": "Carolina Alfaro",
                    "role": "Quality Director",
                    "location": "United States",
                    "bio": (
                        "Supports quality assurance across programs, "
                        "partnerships, and community-facing work."
                    ),
                    "image": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
                    "imageAlt": "Carolina Alfaro portrait",
                },
                {
                    "id": "ashraf-kamwithi",
                    "name": "Ashraf Kamwithi",
                    "role": "Brand & Strategy Director",
                    "location": "East Africa",
                    "bio": (
                        "Leads brand development and strategic communications "
                        "for Safari Strives' ventures and programs."
                    ),
                    "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
                    "imageAlt": "Ashraf Kamwithi portrait",
                },
                {
                    "id": "hakizimana-joel",
                    "name": "Hakizimana Joel",
                    "role": "Advisor",
                    "location": "Rubavu, Rwanda",
                    "bio": (
                        "Provides local advisory support and community insight "
                        "for Safari Strives' Rwanda operations."
                    ),
                    "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
                    "imageAlt": "Hakizimana Joel portrait",
                },
                {
                    "id": "emmanuel-agyekum",
                    "name": "Emmanuel Agyekum",
                    "role": "Tech Integration Director",
                    "location": "United States",
                    "bio": (
                        "Drives technology integration and systems that help "
                        "Safari Strives scale its impact reliably."
                    ),
                    "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
                    "imageAlt": "Emmanuel Agyekum portrait",
                },
            ]
        },
    },
    {
        "key": "partners",
        "label": "About Partners",
        "is_published": True,
        "payload": {
            "items": [
                {
                    "id": "church-brethren",
                    "name": "Church of the Brethren Rwanda",
                    "type": "Local partner",
                    "description": (
                        "Manages our work on the ground, verifies households, "
                        "identifies women entrepreneurs, and witnesses "
                        "distributions."
                    ),
                    "logo": "",
                },
                {
                    "id": "yale",
                    "name": "Yale University",
                    "type": "Academic partner",
                    "description": (
                        "Supports research, program design, and the bridge "
                        "between academic insight and field operations in "
                        "Rwanda."
                    ),
                    "highlight": "$45,000 in funding",
                    "logo": "",
                },
                {
                    "id": "student-network",
                    "name": "International Student Research Teams",
                    "type": "Program partner",
                    "description": (
                        "Student teams from Rwanda, Kenya, Tanzania, Portugal, "
                        "and the United States contribute research and "
                        "on-the-ground capacity."
                    ),
                    "logo": "",
                },
                {
                    "id": "north-central",
                    "name": "North Central College",
                    "type": "Academic partner",
                    "description": (
                        "Partners on student engagement, cross-cultural "
                        "learning, and capacity building for the Safari Strives "
                        "nonprofit model."
                    ),
                    "highlight": "$17,500 in funding",
                    "logo": "",
                },
                {
                    "id": "rubavu-institutions",
                    "name": "Rubavu Institutions",
                    "type": "Community partner",
                    "description": (
                        "Shops, schools, clinics, and municipal stakeholders who "
                        "connect founders to buyers, training pathways, and "
                        "community trust."
                    ),
                    "logo": "",
                },
                {
                    "id": "funder-allies",
                    "name": "Philanthropic Allies",
                    "type": "Funding partner",
                    "description": (
                        "Donors and grantmakers who believe communities deserve "
                        "reliable pathways to economic independence."
                    ),
                    "logo": "",
                },
            ]
        },
    },
]


def _upsert_page(db: Session, data: dict) -> CmsPage:
    page = db.scalars(select(CmsPage).where(CmsPage.slug == data["slug"])).first()
    if page is None:
        page = CmsPage(**data)
        db.add(page)
    else:
        for field, value in data.items():
            setattr(page, field, value)
    return page


def _upsert_collection(db: Session, data: dict) -> CmsCollection:
    collection = db.scalars(
        select(CmsCollection).where(CmsCollection.key == data["key"])
    ).first()
    if collection is None:
        collection = CmsCollection(**data)
        db.add(collection)
    else:
        for field, value in data.items():
            setattr(collection, field, value)
    return collection


def seed() -> None:
    db = SessionLocal()
    try:
        for data in CMS_PAGES:
            page = _upsert_page(db, dict(data))
            db.commit()
            db.refresh(page)
            print(f"Seeded cms_page '{page.slug}' (id={page.id})")

        for data in CMS_COLLECTIONS:
            collection = _upsert_collection(db, dict(data))
            db.commit()
            db.refresh(collection)
            print(f"Seeded cms_collection '{collection.key}' (id={collection.id})")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
