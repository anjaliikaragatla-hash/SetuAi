// services/mockAI.js
// Bilingual mock AI response engine.
// TO MIGRATE TO REAL API: replace the `getMockResponse` function body
// with a fetch('/api/chat', { method:'POST', body: JSON.stringify({message, language}) })

export const schemes = {
  en: {
    farming: {
      type: "scheme_card",
      greeting: "Here are key government schemes for farmers:",
      cards: [
        {
          id: "pmkisan",
          schemeName: "PM-KISAN Samman Nidhi",
          description: "Direct income support scheme providing financial assistance to small and marginal farmers.",
          eligibility: "Small and marginal landholding farmer families with cultivable land.",
          benefits: "₹6,000 per year in 3 equal installments of ₹2,000 each.",
          documents: ["Aadhaar Card", "Bank Account Details", "Land Ownership Proof"],
          applyLink: "#",
          learnMoreLink: "#"
        },
        {
          id: "pmfby",
          schemeName: "PM Fasal Bima Yojana (PMFBY)",
          description: "Crop insurance scheme to provide financial support to farmers suffering crop loss due to unforeseen events.",
          eligibility: "All farmers growing notified crops in notified areas.",
          benefits: "Insurance coverage for crop loss at low premium rates of 1.5%–2%.",
          documents: ["Land Records (Khasra / Khatauni)", "Bank Passbook", "Sowing Certificate"],
          applyLink: "#",
          learnMoreLink: "#"
        }
      ],
      followUp: "Would you like me to check your eligibility or explain how to register?"
    },
    healthcare: {
      type: "scheme_card",
      greeting: "Here is the key healthcare support available for you:",
      cards: [
        {
          id: "ayushman",
          schemeName: "Ayushman Bharat (PM-JAY)",
          description: "World's largest health insurance scheme providing free secondary and tertiary hospitalization.",
          eligibility: "Families identified in SECC 2011 data. Rural poor and deprived households.",
          benefits: "Health cover of ₹5 Lakh per family per year. No premium for beneficiaries.",
          documents: ["Aadhaar Card", "Ration Card", "SECC inclusion proof"],
          applyLink: "#",
          learnMoreLink: "#"
        },
        {
          id: "janaushadhi",
          schemeName: "Jan Aushadhi Scheme",
          description: "Provides quality generic medicines at affordable prices through special Janaushadhi Kendras.",
          eligibility: "All citizens. No income or caste restriction.",
          benefits: "Medicines available at 50%–90% lower than market price.",
          documents: ["Doctor's Prescription"],
          applyLink: "#",
          learnMoreLink: "#"
        }
      ],
      followUp: "Would you like help finding your nearest Ayushman Bharat empanelled hospital?"
    },
    education: {
      type: "scheme_card",
      greeting: "Here are the scholarship and education schemes available:",
      cards: [
        {
          id: "sukanya",
          schemeName: "Sukanya Samriddhi Yojana",
          description: "A savings scheme for the girl child to secure education and marriage expenses.",
          eligibility: "Girl child below 10 years of age. Parents or guardians can open the account.",
          benefits: "High interest rate (currently 8.2% p.a.), tax-free maturity amount.",
          documents: ["Girl's Birth Certificate", "Aadhaar Card of Parent/Guardian", "Address Proof"],
          applyLink: "#",
          learnMoreLink: "#"
        },
        {
          id: "pragati",
          schemeName: "Pragati Scholarship Scheme",
          description: "Financial support to girl students for technical education.",
          eligibility: "Girl students admitted to degree/diploma programs. Family income below ₹8 lakh/year.",
          benefits: "₹50,000 per year scholarship + laptop/tuition fee reimbursement.",
          documents: ["Admission Letter", "Income Certificate", "Aadhaar Card", "Bank Account"],
          applyLink: "#",
          learnMoreLink: "#"
        }
      ],
      followUp: "Do you want me to explain the application process step by step?"
    },
    women: {
      type: "scheme_card",
      greeting: "Here are key government schemes for women's empowerment:",
      cards: [
        {
          id: "wcd",
          schemeName: "Beti Bachao Beti Padhao",
          description: "Campaign to address the issue of declining Child Sex Ratio and promote welfare of girl children.",
          eligibility: "All girl children. Special focus on gender-biased districts.",
          benefits: "Financial aid, awareness programs, girl child education support.",
          documents: ["Girl's Birth Certificate", "Aadhaar"],
          applyLink: "#",
          learnMoreLink: "#"
        },
        {
          id: "mudra_women",
          schemeName: "Mahila Samriddhi Yojana",
          description: "Microfinance loans for women entrepreneurs in rural and semi-urban areas.",
          eligibility: "Women above 18 years with a viable business plan.",
          benefits: "Loans up to ₹1 Lakh at subsidized interest rates.",
          documents: ["Aadhaar Card", "Business Plan", "Bank Account", "Address Proof"],
          applyLink: "#",
          learnMoreLink: "#"
        }
      ],
      followUp: "Would you like information on self-help groups in your area?"
    },
    senior: {
      type: "scheme_card",
      greeting: "Here are pension and senior citizen welfare schemes:",
      cards: [
        {
          id: "ignoaps",
          schemeName: "Indira Gandhi National Old Age Pension (IGNOAPS)",
          description: "Monthly pension for elderly people living below the poverty line.",
          eligibility: "Citizens above 60 years of age belonging to BPL households.",
          benefits: "₹200/month for 60–79 years; ₹500/month for 80+ years.",
          documents: ["Age Proof (Birth Certificate/Aadhaar)", "BPL Card", "Bank Account"],
          applyLink: "#",
          learnMoreLink: "#"
        },
        {
          id: "varistha",
          schemeName: "Varistha Pension Bima Yojana",
          description: "Pension scheme by LIC for senior citizens with guaranteed return.",
          eligibility: "Citizens aged 60 years and above.",
          benefits: "Guaranteed 9% p.a. return. Monthly/quarterly/yearly pension options.",
          documents: ["Age Proof", "Address Proof", "Bank Account Details"],
          applyLink: "#",
          learnMoreLink: "#"
        }
      ],
      followUp: "Would you like assistance in applying at your nearest CSC center?"
    },
    housing: {
      type: "scheme_card",
      greeting: "Here are housing and shelter schemes for eligible citizens:",
      cards: [
        {
          id: "pmay",
          schemeName: "Pradhan Mantri Awas Yojana (PMAY)",
          description: "Housing for All mission to provide affordable housing to urban and rural poor.",
          eligibility: "EWS/LIG/MIG income groups. No existing pucca house in family.",
          benefits: "Interest subsidy up to ₹2.67 Lakh on home loans. Direct financial assistance for rural beneficiaries.",
          documents: ["Aadhaar Card", "Income Certificate", "Bank Account", "Self-declaration of no pucca house"],
          applyLink: "#",
          learnMoreLink: "#"
        }
      ],
      followUp: "Would you like help checking your eligibility for PMAY?"
    },
    business: {
      type: "scheme_card",
      greeting: "Here are business loan and entrepreneurship schemes:",
      cards: [
        {
          id: "mudra",
          schemeName: "PM Mudra Yojana (PMMY)",
          description: "Micro-finance loan scheme for small and micro enterprises.",
          eligibility: "Non-farm income generating activities. No collateral required.",
          benefits: "Shishu: up to ₹50,000 | Kishore: ₹50K–5L | Tarun: ₹5L–10L",
          documents: ["Identity Proof", "Address Proof", "Business Plan / Quotation", "Bank Statements"],
          applyLink: "#",
          learnMoreLink: "#"
        },
        {
          id: "standup",
          schemeName: "Stand-Up India Scheme",
          description: "Facilitates bank loans for SC/ST and women entrepreneurs.",
          eligibility: "SC/ST and/or Women borrowers above 18 years. First-time entrepreneurs.",
          benefits: "Loans from ₹10 Lakh to ₹1 Crore for greenfield enterprises.",
          documents: ["Aadhaar", "PAN Card", "Business Plan", "Bank Account"],
          applyLink: "#",
          learnMoreLink: "#"
        }
      ],
      followUp: "Would you like help preparing the documents needed to apply?"
    },
    disability: {
      type: "scheme_card",
      greeting: "Here are key schemes for persons with disabilities:",
      cards: [
        {
          id: "adip",
          schemeName: "Assistance to Disabled Persons (ADIP)",
          description: "Provides aids and assistive devices to persons with disabilities.",
          eligibility: "Persons with 40%+ disability. Monthly income below ₹20,000.",
          benefits: "Free assistive devices: tricycles, crutches, hearing aids, Braille kits, etc.",
          documents: ["Disability Certificate", "Income Certificate", "Aadhaar Card"],
          applyLink: "#",
          learnMoreLink: "#"
        }
      ],
      followUp: "Do you need help locating the nearest disability assessment camp?"
    },
    default: {
      type: "text",
      message: "I can help you discover government schemes for farming, healthcare, education, women's welfare, pensions, housing, and business loans.\n\nTry asking:\n• \"What farming schemes are available?\"\n• \"How can I get free medical treatment?\"\n• \"Schemes for girl education\"\n• \"Pension for senior citizens\"\n\nWhat would you like to know about?"
    }
  },
  hi: {
    farming: {
      type: "scheme_card",
      greeting: "किसानों के लिए मुख्य सरकारी योजनाएं इस प्रकार हैं:",
      cards: [
        {
          id: "pmkisan",
          schemeName: "पीएम-किसान सम्मान निधि",
          description: "छोटे और सीमांत किसानों को वित्तीय सहायता प्रदान करने वाली प्रत्यक्ष आय सहायता योजना।",
          eligibility: "कृषि योग्य भूमि वाले छोटे और सीमांत किसान परिवार।",
          benefits: "प्रति वर्ष ₹6,000 की सहायता, तीन समान किस्तों में ₹2,000 प्रत्येक।",
          documents: ["आधार कार्ड", "बैंक खाता विवरण", "भूमि स्वामित्व प्रमाण"],
          applyLink: "#",
          learnMoreLink: "#"
        },
        {
          id: "pmfby",
          schemeName: "प्रधानमंत्री फसल बीमा योजना (PMFBY)",
          description: "अप्रत्याशित घटनाओं के कारण फसल नुकसान से पीड़ित किसानों को वित्तीय सहायता देने की बीमा योजना।",
          eligibility: "अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले सभी किसान।",
          benefits: "1.5%–2% की कम प्रीमियम दरों पर फसल हानि के लिए बीमा कवरेज।",
          documents: ["भूमि रिकॉर्ड (खसरा/खतौनी)", "बैंक पासबुक", "बुवाई प्रमाण पत्र"],
          applyLink: "#",
          learnMoreLink: "#"
        }
      ],
      followUp: "क्या आप अपनी पात्रता जांचना चाहते हैं या पंजीकरण प्रक्रिया जानना चाहते हैं?"
    },
    healthcare: {
      type: "scheme_card",
      greeting: "आपके लिए उपलब्ध मुख्य स्वास्थ्य सेवा सहायता इस प्रकार है:",
      cards: [
        {
          id: "ayushman",
          schemeName: "आयुष्मान भारत (PM-JAY)",
          description: "माध्यमिक और तृतीयक अस्पताल में भर्ती के लिए मुफ्त उपचार प्रदान करने वाली दुनिया की सबसे बड़ी स्वास्थ्य बीमा योजना।",
          eligibility: "SECC 2011 डेटा में पहचाने गए परिवार। ग्रामीण गरीब और वंचित घर।",
          benefits: "प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य कवर। लाभार्थियों के लिए कोई प्रीमियम नहीं।",
          documents: ["आधार कार्ड", "राशन कार्ड", "SECC समावेशन प्रमाण"],
          applyLink: "#",
          learnMoreLink: "#"
        },
        {
          id: "janaushadhi",
          schemeName: "जन औषधि योजना",
          description: "विशेष जनऔषधि केंद्रों के माध्यम से सस्ती कीमतों पर गुणवत्तापूर्ण जेनेरिक दवाएं प्रदान करती है।",
          eligibility: "सभी नागरिक। कोई आय या जाति प्रतिबंध नहीं।",
          benefits: "बाजार मूल्य से 50%–90% कम कीमत पर दवाएं उपलब्ध।",
          documents: ["डॉक्टर का पर्चा"],
          applyLink: "#",
          learnMoreLink: "#"
        }
      ],
      followUp: "क्या आप अपने नजदीकी आयुष्मान भारत पैनल अस्पताल को खोजने में मदद चाहते हैं?"
    },
    education: {
      type: "scheme_card",
      greeting: "उपलब्ध छात्रवृत्ति और शिक्षा योजनाएं इस प्रकार हैं:",
      cards: [
        {
          id: "sukanya",
          schemeName: "सुकन्या समृद्धि योजना",
          description: "बालिका की शिक्षा और विवाह के खर्चों को सुरक्षित करने के लिए बचत योजना।",
          eligibility: "10 वर्ष से कम आयु की बालिका। माता-पिता या अभिभावक खाता खोल सकते हैं।",
          benefits: "उच्च ब्याज दर (वर्तमान में 8.2% प्रति वर्ष), कर-मुक्त परिपक्वता राशि।",
          documents: ["बालिका का जन्म प्रमाण पत्र", "माता-पिता/अभिभावक का आधार कार्ड", "पता प्रमाण"],
          applyLink: "#",
          learnMoreLink: "#"
        },
        {
          id: "pragati",
          schemeName: "प्रगति छात्रवृत्ति योजना",
          description: "तकनीकी शिक्षा के लिए छात्राओं को वित्तीय सहायता।",
          eligibility: "डिग्री/डिप्लोमा कार्यक्रमों में प्रवेश लेने वाली छात्राएं। पारिवारिक आय ₹8 लाख/वर्ष से कम।",
          benefits: "₹50,000 प्रति वर्ष छात्रवृत्ति + लैपटॉप/ट्यूशन शुल्क प्रतिपूर्ति।",
          documents: ["प्रवेश पत्र", "आय प्रमाण पत्र", "आधार कार्ड", "बैंक खाता"],
          applyLink: "#",
          learnMoreLink: "#"
        }
      ],
      followUp: "क्या आप चाहते हैं कि मैं आवेदन प्रक्रिया को चरण दर चरण समझाऊं?"
    },
    women: {
      type: "scheme_card",
      greeting: "महिला सशक्तिकरण के लिए मुख्य सरकारी योजनाएं:",
      cards: [
        {
          id: "bbbp",
          schemeName: "बेटी बचाओ बेटी पढ़ाओ",
          description: "बाल लिंगानुपात में गिरावट को दूर करने और बालिकाओं के कल्याण को बढ़ावा देने का अभियान।",
          eligibility: "सभी बालिकाएं। लिंग-पक्षपाती जिलों पर विशेष ध्यान।",
          benefits: "वित्तीय सहायता, जागरूकता कार्यक्रम, बालिका शिक्षा सहायता।",
          documents: ["बालिका का जन्म प्रमाण पत्र", "आधार"],
          applyLink: "#",
          learnMoreLink: "#"
        },
        {
          id: "mahila_samridhi",
          schemeName: "महिला समृद्धि योजना",
          description: "ग्रामीण और अर्ध-शहरी क्षेत्रों में महिला उद्यमियों के लिए माइक्रोफाइनेंस ऋण।",
          eligibility: "18 वर्ष से अधिक की व्यवहार्य व्यवसाय योजना वाली महिलाएं।",
          benefits: "सब्सिडी वाली ब्याज दरों पर ₹1 लाख तक का ऋण।",
          documents: ["आधार कार्ड", "व्यापार योजना", "बैंक खाता", "पता प्रमाण"],
          applyLink: "#",
          learnMoreLink: "#"
        }
      ],
      followUp: "क्या आप अपने क्षेत्र के स्वयं सहायता समूहों के बारे में जानकारी चाहते हैं?"
    },
    senior: {
      type: "scheme_card",
      greeting: "पेंशन और वरिष्ठ नागरिक कल्याण योजनाएं:",
      cards: [
        {
          id: "ignoaps",
          schemeName: "इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन (IGNOAPS)",
          description: "गरीबी रेखा से नीचे जीवन यापन करने वाले बुजुर्गों के लिए मासिक पेंशन।",
          eligibility: "BPL परिवारों से संबंधित 60 वर्ष से अधिक आयु के नागरिक।",
          benefits: "60-79 वर्ष के लिए ₹200/माह; 80+ वर्ष के लिए ₹500/माह।",
          documents: ["आयु प्रमाण (जन्म प्रमाण पत्र/आधार)", "BPL कार्ड", "बैंक खाता"],
          applyLink: "#",
          learnMoreLink: "#"
        }
      ],
      followUp: "क्या आप नजदीकी CSC केंद्र में आवेदन करने में सहायता चाहते हैं?"
    },
    housing: {
      type: "scheme_card",
      greeting: "पात्र नागरिकों के लिए आवास और आश्रय योजनाएं:",
      cards: [
        {
          id: "pmay",
          schemeName: "प्रधानमंत्री आवास योजना (PMAY)",
          description: "शहरी और ग्रामीण गरीबों को सस्ती आवास प्रदान करने का 'सबके लिए आवास' मिशन।",
          eligibility: "EWS/LIG/MIG आय वर्ग। परिवार में कोई पक्का मकान नहीं।",
          benefits: "गृह ऋण पर ₹2.67 लाख तक की ब्याज सब्सिडी। ग्रामीण लाभार्थियों के लिए सीधी वित्तीय सहायता।",
          documents: ["आधार कार्ड", "आय प्रमाण पत्र", "बैंक खाता", "पक्का मकान न होने का स्व-घोषणा पत्र"],
          applyLink: "#",
          learnMoreLink: "#"
        }
      ],
      followUp: "क्या आप PMAY के लिए अपनी पात्रता जांचने में मदद चाहते हैं?"
    },
    business: {
      type: "scheme_card",
      greeting: "व्यापार ऋण और उद्यमिता योजनाएं:",
      cards: [
        {
          id: "mudra",
          schemeName: "पीएम मुद्रा योजना (PMMY)",
          description: "छोटे और सूक्ष्म उद्यमों के लिए माइक्रो-फाइनेंस ऋण योजना। कोई गारंटी नहीं।",
          eligibility: "गैर-कृषि आय सृजन गतिविधियां। कोई संपार्श्विक आवश्यक नहीं।",
          benefits: "शिशु: ₹50,000 तक | किशोर: ₹50K–5L | तरुण: ₹5L–10L",
          documents: ["पहचान प्रमाण", "पता प्रमाण", "व्यापार योजना / उद्धरण", "बैंक विवरण"],
          applyLink: "#",
          learnMoreLink: "#"
        }
      ],
      followUp: "क्या आप आवेदन के लिए आवश्यक दस्तावेज तैयार करने में मदद चाहते हैं?"
    },
    disability: {
      type: "scheme_card",
      greeting: "विकलांग व्यक्तियों के लिए मुख्य योजनाएं:",
      cards: [
        {
          id: "adip",
          schemeName: "विकलांग व्यक्तियों को सहायता (ADIP)",
          description: "विकलांग व्यक्तियों को सहायक उपकरण और साधन प्रदान करती है।",
          eligibility: "40%+ विकलांगता वाले व्यक्ति। मासिक आय ₹20,000 से कम।",
          benefits: "मुफ्त सहायक उपकरण: ट्राइसाइकिल, बैसाखी, श्रवण यंत्र, ब्रेल किट आदि।",
          documents: ["विकलांगता प्रमाण पत्र", "आय प्रमाण पत्र", "आधार कार्ड"],
          applyLink: "#",
          learnMoreLink: "#"
        }
      ],
      followUp: "क्या आप निकटतम विकलांगता मूल्यांकन शिविर का पता लगाने में सहायता चाहते हैं?"
    },
    default: {
      type: "text",
      message: "मैं आपको कृषि, स्वास्थ्य सेवा, शिक्षा, महिला कल्याण, पेंशन, आवास और व्यापार ऋण के लिए सरकारी योजनाएं खोजने में मदद कर सकता हूं।\n\nइस तरह पूछने का प्रयास करें:\n• \"किसानों के लिए कौन सी योजनाएं हैं?\"\n• \"मुफ्त इलाज कैसे मिलेगा?\"\n• \"लड़कियों की शिक्षा के लिए योजनाएं\"\n• \"वरिष्ठ नागरिकों के लिए पेंशन\"\n\nआप क्या जानना चाहते हैं?"
    }
  }
};

// Keyword matching map
const keywordMap = {
  farming: ["farm", "farmer", "kisan", "crop", "agriculture", "pmkisan", "fasal", "खेती", "किसान", "फसल", "कृषि"],
  healthcare: ["health", "hospital", "medical", "ayushman", "doctor", "medicine", "treatment", "swasthya", "स्वास्थ्य", "अस्पताल", "इलाज", "दवा", "आयुष्मान"],
  education: ["school", "study", "scholarship", "student", "education", "siksha", "college", "girls", "छात्र", "शिक्षा", "छात्रवृत्ति", "पढ़ाई"],
  women: ["women", "woman", "mahila", "girl", "beti", "female", "empowerment", "महिला", "बेटी", "स्त्री", "नारी"],
  senior: ["senior", "old age", "pension", "elderly", "budhapa", "retired", "60 years", "वृद्ध", "पेंशन", "बुढ़ापा", "वरिष्ठ"],
  housing: ["house", "home", "pmay", "awas", "shelter", "housing", "flat", "घर", "मकान", "आवास", "आवासीय"],
  business: ["business", "loan", "mudra", "entrepreneur", "startup", "vyapar", "व्यापार", "ऋण", "लोन", "उद्यम", "मुद्रा"],
  disability: ["disability", "disabled", "handicap", "viklang", "differently abled", "विकलांग", "दिव्यांग"]
};

const detectTopic = (message) => {
  const lower = message.toLowerCase();
  for (const [topic, keywords] of Object.entries(keywordMap)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return topic;
    }
  }
  return "default";
};

const getApiConfig = () => {
  const provider = localStorage.getItem("setuai_api_provider") || "mock";
  const url = localStorage.getItem("setuai_api_url") || "http://localhost:11434";
  const model = localStorage.getItem("setuai_api_model") || "";
  const key = localStorage.getItem("setuai_api_key") || "";

  let resolvedModel = model;
  if (!model) {
    if (provider === "ollama") resolvedModel = "llama3";
    else if (provider === "openrouter") resolvedModel = "meta-llama/llama-3-8b-instruct:free";
    else if (provider === "huggingface") resolvedModel = "Qwen/Qwen2.5-7B-Instruct";
  }

  return { provider, url, model: resolvedModel, key };
};

const systemPrompt = `You are SetuAI, an AI citizen assistant for Indian government schemes.
Answer the user's queries in a friendly, clear, and structured format. Use bullet points and bold text for key details.
Always respond in the active language of the query (if they write in Hindi/Devanagari, reply in Hindi. If they write in English, reply in English).`;

const callOllama = async (config, message) => {
  const response = await fetch(`${config.url}/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.5
    })
  });
  if (!response.ok) throw new Error(`Ollama error: ${response.statusText}`);
  const data = await response.json();
  return data.choices[0].message.content;
};

const callOpenRouter = async (config, message) => {
  if (!config.key) throw new Error("API Key is missing for OpenRouter");
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.key}`
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    })
  });
  if (!response.ok) throw new Error(`OpenRouter error: ${response.statusText}`);
  const data = await response.json();
  return data.choices[0].message.content;
};

const callHuggingFace = async (config, message) => {
  const headers = { "Content-Type": "application/json" };
  if (config.key) {
    headers["Authorization"] = `Bearer ${config.key}`;
  }
  const response = await fetch("https://api-inference.huggingface.co/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 1000
    })
  });
  if (!response.ok) throw new Error(`Hugging Face error: ${response.statusText}`);
  const data = await response.json();
  return data.choices[0].message.content;
};

const getLocalResponse = async (message, language) => {
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500));
  const lang = language === "hi" ? "hi" : "en";
  const topic = detectTopic(message);
  const response = schemes[lang][topic] || schemes[lang].default;

  const formattedResponse = { ...response };
  if (formattedResponse.type === "text" && formattedResponse.message) {
    formattedResponse.text = formattedResponse.message;
    delete formattedResponse.message;
  }

  return {
    ...formattedResponse,
    topic,
    id: `ai-${Date.now()}`
  };
};

export const getMockResponse = async (message, language = "en") => {
  const config = getApiConfig();

  if (config.provider === "mock") {
    return getLocalResponse(message, language);
  }

  try {
    let textResult = "";
    if (config.provider === "ollama") {
      textResult = await callOllama(config, message);
    } else if (config.provider === "openrouter") {
      textResult = await callOpenRouter(config, message);
    } else if (config.provider === "huggingface") {
      textResult = await callHuggingFace(config, message);
    }

    return {
      type: "text",
      text: textResult,
      topic: detectTopic(message),
      id: `ai-${Date.now()}`
    };
  } catch (err) {
    console.error("AI API Call failed, falling back to mock:", err);
    window.dispatchEvent(new CustomEvent("setuai_api_fallback"));
    return getLocalResponse(message, language);
  }
};

export const getSuggestionChips = (language, userType) => {
  const chips = {
    en: [
      { id: "farmers", label: "🚜 Schemes for Farmers", query: "What farming schemes are available?" },
      { id: "scholarships", label: "🎓 Scholarships", query: "What scholarships are available for students?" },
      { id: "healthcare", label: "🏥 Healthcare Benefits", query: "How can I get free medical treatment?" },
      { id: "pension", label: "👴 Pension Schemes", query: "What pension schemes are available for senior citizens?" },
      { id: "business", label: "💼 Business Loans", query: "What business loan schemes are available?" },
      { id: "women", label: "👩 Women Empowerment", query: "What government schemes are available for women?" },
      { id: "housing", label: "🏠 Housing Schemes", query: "How can I get a house under PMAY?" },
      { id: "disability", label: "♿ Disability Benefits", query: "What benefits are available for disabled persons?" }
    ],
    hi: [
      { id: "farmers", label: "🚜 किसानों के लिए योजनाएं", query: "खेती के लिए कौन सी सरकारी योजनाएं हैं?" },
      { id: "scholarships", label: "🎓 छात्रवृत्ति", query: "छात्रों के लिए कौन सी छात्रवृत्तियां उपलब्ध हैं?" },
      { id: "healthcare", label: "🏥 स्वास्थ्य लाभ", query: "मुझे मुफ्त इलाज कैसे मिल सकता है?" },
      { id: "pension", label: "👴 पेंशन योजनाएं", query: "वरिष्ठ नागरिकों के लिए कौन सी पेंशन योजनाएं हैं?" },
      { id: "business", label: "💼 व्यापार ऋण", query: "व्यापार के लिए कौन सी ऋण योजनाएं हैं?" },
      { id: "women", label: "👩 महिला सशक्तिकरण", query: "महिलाओं के लिए कौन सी सरकारी योजनाएं हैं?" },
      { id: "housing", label: "🏠 आवास योजनाएं", query: "PMAY के तहत मुझे मकान कैसे मिल सकता है?" },
      { id: "disability", label: "♿ दिव्यांग लाभ", query: "विकलांग व्यक्तियों के लिए कौन से लाभ उपलब्ध हैं?" }
    ]
  };

  // Prioritize chips based on user type
  const langChips = chips[language === "hi" ? "hi" : "en"];
  const priorityMap = { farmer: "farmers", student: "scholarships", woman: "women", senior: "pension", general: "healthcare" };
  const priority = priorityMap[userType];
  if (priority) {
    const idx = langChips.findIndex((c) => c.id === priority);
    if (idx > 0) {
      const [chip] = langChips.splice(idx, 1);
      langChips.unshift(chip);
    }
  }
  return langChips;
};
