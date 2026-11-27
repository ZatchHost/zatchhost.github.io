const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Ouvrir le menu");
      navigation.classList.remove("is-open");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

 // Trigger a dedicated entrance sequence once the page styles are ready.
 const landingItems = document.querySelectorAll(".hero-copy > *");
 landingItems.forEach((element, index) => {
   element.style.setProperty("--landing-delay", `${index * 110}ms`);
 });
 window.requestAnimationFrame(() => {
   document.body.classList.add("landing-ready");
 });

// Scroll reveals: use a progressive enhancement and avoid hiding content before setup.
const revealTargets = document.querySelectorAll([
  ".hero-copy > *", ".hero-visual > *", ".intro-grid > div", ".offer-card",
  ".section-heading", ".value-card", ".manifesto-orb",
  ".manifesto-copy > *", ".faq-grid > div", ".faq-list details"
].join(","));

if (revealTargets.length && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: "0px 0px 100px 0px" });

  // Set the enhancement class before targets are hidden, then register them.
  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${(index % 4) * 85}ms`);
  });
  document.body.classList.add("motion-ready");

  const initiallyVisible = [];

  revealTargets.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      initiallyVisible.push(element);
    } else {
      revealObserver.observe(element);
    }
  });

  // Let the hidden state render once, then reveal the landing content in a stagger.
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      initiallyVisible.forEach((element) => element.classList.add("is-visible"));
    });
  });

  // Safety net for observer failures or unusually long page-load delays.
  window.setTimeout(() => {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
    revealObserver.disconnect();
  }, 6000);
} else {
  // Keep content visible when observers are unsupported.
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}

const translations = {
  fr: {
    label: "Langue", skip: "Aller au contenu", nav: "Navigation principale",
    service: "Le service", values: "Nos engagements",
    offersNav: "Les offres", offersKicker: "OFFRES DISPONIBLES", offersTitle: "Un premier service, <span class="gradient-text">gratuit.</span>", offersIntro: "Des ressources simples pour donner vie a vos projets, sans frais.", offerBadge: "GRATUIT", offerCategory: "HEBERGEMENT DE BOT", offerTitle: "Bot Discord Python", offerDescription: "Hebergez votre bot Discord developpe en Python et laissez-le tourner sans avoir a garder votre propre machine allumee.", offerRam: "Memoire RAM", offerStorage: "Stockage", offerBandwidth: "Bande passante", offerUnlimited: "Illimitee", offerSpeed: "Debit reseau jusqu'a 100 Mbps", offerOrder: "Commander gratuitement", offerFootnote: "La commande se fait via un ticket sur notre serveur Discord. Notre equipe vous accompagnera pour la mise en place.", faq: "FAQ", navCta: "Découvrir ZatchHost",
    eyebrow: "L'hébergement pensé en France",
    heroTitle: "Vos projets méritent<br>un <span class=\"gradient-text\">meilleur terrain.</span>",
    heroLead: "Un hébergement accessible, une expérience claire et une équipe à taille humaine. Avec ZatchHost, concentrez-vous sur vos projets. On s'occupe du reste.",
    heroPrimary: "Découvrir le service", heroSecondary: "Pourquoi ZatchHost ?",
    heroNote: "Simple. Accessible. Sans superflu.", floatIdeas: "Vos idées", floatReady: "Prêtes à décoller",
    floatPace: "À votre rythme", floatSimple: "Une offre sans détour",
    bottomLeft: "FAIT POUR LES PROJETS QUI COMPTENT", bottomRight: "FRANCE <b>·</b> WEB <b>·</b> COMMUNAUTÉ",
    introKicker: "01 / L'ESPRIT ZATCHHOST",
    introTitle: "La performance ne devrait pas être un <span class=\"gradient-text\">luxe.</span>",
    intro1: "Monter un projet en ligne ne devrait pas rimer avec tarifs incompréhensibles ou parcours compliqué. ZatchHost veut rendre l'hébergement plus accessible, avec une approche directe et transparente.",
    intro2: "Que vous lanciez une idée, développiez un service ou réunissiez une communauté, vous devez pouvoir avancer avec une solution qui reste simple à comprendre.",
    valuesKicker: "02 / CE QUI NOUS GUIDE",
    valuesTitle: "Moins de friction.<br><span class=\"muted-heading\">Plus de possibilités.</span>",
    valuesAside: "Un service d'hébergement doit vous aider à avancer, pas ajouter une couche de complexité.",
    card1Title: "Des prix accessibles", card1Text: "Une approche orientée budget maîtrisé. L'essentiel doit rester accessible, que votre projet débute ou grandisse.",
    card2Title: "La simplicité avant tout", card2Text: "Des informations claires et une expérience pensée pour vous laisser vous concentrer sur l'essentiel.",
    card3Title: "Une identité française", card3Text: "Un service imaginé en France, avec la volonté de construire une relation directe et de proximité.",
    manifestoKicker: "03 / DONNEZ VIE À VOS IDÉES",
    manifestoTitle: "Le prochain projet<br>qui compte, c'est <span class=\"gradient-text\">le vôtre.</span>",
    manifestoText: "ZatchHost construit une autre façon d'aborder l'hébergement : plus lisible, plus accessible et tournée vers les personnes qui font vivre leurs projets.",
    manifestoButton: "En savoir plus", faqKicker: "04 / QUESTIONS FRÉQUENTES",
    faqTitle: "Quelques réponses<br><span class=\"muted-heading\">pour commencer.</span>",
    faqIntro: "L'essentiel sur ZatchHost et sa vision de l'hébergement.",
    q1: "Qu'est-ce que ZatchHost ?", a1: "ZatchHost est un service français d'hébergement qui souhaite proposer des solutions accessibles et une expérience simple, sans complexité inutile.",
    q2: "À qui s'adresse ZatchHost ?", a2: "À celles et ceux qui souhaitent héberger un projet en ligne et qui recherchent une approche claire, accessible et facile à comprendre.",
    q3: "Où est basé ZatchHost ?", a3: "ZatchHost est un service français. Les informations précises sur l'infrastructure et la localisation des serveurs seront communiquées dans la documentation des offres.",
    q4: "Comment connaître les offres et les tarifs ?", a4: "Les offres, leurs caractéristiques et leurs tarifs devront être présentés ici dès leur publication. Chaque formule devra détailler clairement ce qui est inclus.",
    footer: "L'hébergement accessible, simplement.", backTop: "Retour en haut", origin: "Imaginé en France",
    title: "ZatchHost — Hébergement accessible, simplement",
    description: "ZatchHost, l'hébergement accessible pensé en France. Découvrez une approche simple, transparente et humaine pour donner vie à vos projets en ligne.",
    ogTitle: "ZatchHost — L'hébergement, simplement.",
    ogDescription: "Un hébergement accessible, une approche transparente et un service pensé en France."
  },
  en: {
    label: "Language", skip: "Skip to content", nav: "Main navigation",
    service: "The service", values: "Our values",
    offersNav: "Offers", offersKicker: "AVAILABLE OFFERS", offersTitle: "A first service, <span class="gradient-text">free.</span>", offersIntro: "Simple resources to bring your projects to life, at no cost.", offerBadge: "FREE", offerCategory: "BOT HOSTING", offerTitle: "Python Discord Bot", offerDescription: "Host your Python-powered Discord bot and keep it running without leaving your own computer on.", offerRam: "RAM", offerStorage: "Storage", offerBandwidth: "Bandwidth", offerUnlimited: "Unlimited", offerSpeed: "Network speed up to 100 Mbps", offerOrder: "Order for free", offerFootnote: "Place your order by opening a ticket on our Discord server. Our team will help you get set up.", faq: "FAQ", navCta: "Discover ZatchHost",
    eyebrow: "Hosting designed in France",
    heroTitle: "Your projects deserve<br>a <span class=\"gradient-text\">better home.</span>",
    heroLead: "Affordable hosting, a clear experience and a human-sized team. With ZatchHost, focus on your projects. We'll take care of the rest.",
    heroPrimary: "Discover the service", heroSecondary: "Why ZatchHost?",
    heroNote: "Simple. Affordable. No unnecessary extras.", floatIdeas: "Your ideas", floatReady: "Ready to take off",
    floatPace: "At your pace", floatSimple: "Straightforward plans",
    bottomLeft: "MADE FOR PROJECTS THAT MATTER", bottomRight: "FRANCE <b>·</b> WEB <b>·</b> COMMUNITY",
    introKicker: "01 / THE ZATCHHOST MINDSET",
    introTitle: "Performance shouldn't be a <span class=\"gradient-text\">luxury.</span>",
    intro1: "Launching an online project shouldn't mean confusing prices or a complicated journey. ZatchHost aims to make hosting more accessible through a straightforward and transparent approach.",
    intro2: "Whether you're launching an idea, building a service or bringing a community together, you deserve a solution that's easy to understand.",
    valuesKicker: "02 / WHAT GUIDES US",
    valuesTitle: "Less friction.<br><span class=\"muted-heading\">More possibilities.</span>",
    valuesAside: "Hosting should help you move forward, not add another layer of complexity.",
    card1Title: "Accessible pricing", card1Text: "A budget-conscious approach. The essentials should remain accessible as your project starts and grows.",
    card2Title: "Simplicity first", card2Text: "Clear information and an experience designed to help you focus on what matters.",
    card3Title: "A French identity", card3Text: "A service imagined in France, built around direct communication and a sense of proximity.",
    manifestoKicker: "03 / BRING YOUR IDEAS TO LIFE",
    manifestoTitle: "The next project<br>that matters is <span class=\"gradient-text\">yours.</span>",
    manifestoText: "ZatchHost is building a different approach to hosting: clearer, more accessible and focused on the people behind each project.",
    manifestoButton: "Learn more", faqKicker: "04 / FREQUENTLY ASKED QUESTIONS",
    faqTitle: "A few answers<br><span class=\"muted-heading\">to get started.</span>",
    faqIntro: "The essentials about ZatchHost and its approach to hosting.",
    q1: "What is ZatchHost?", a1: "ZatchHost is a French hosting service aiming to offer accessible solutions and a simple experience, without unnecessary complexity.",
    q2: "Who is ZatchHost for?", a2: "For anyone who wants to host an online project and is looking for an approach that's clear, accessible and easy to understand.",
    q3: "Where is ZatchHost based?", a3: "ZatchHost is a French service. Exact infrastructure and server-location details will be provided in the offer documentation.",
    q4: "Where can I find plans and pricing?", a4: "Plans, features and prices will be published here when available. Each plan will clearly explain what's included.",
    footer: "Accessible hosting, made simple.", backTop: "Back to top", origin: "Imagined in France",
    title: "ZatchHost — Accessible hosting, made simple",
    description: "ZatchHost offers accessible hosting with a simple, transparent and people-first approach to bringing your online projects to life.",
    ogTitle: "ZatchHost — Hosting, made simple.",
    ogDescription: "Accessible hosting, a transparent approach and a service designed in France."
  },
  es: {
    label: "Idioma", skip: "Saltar al contenido", nav: "Navegación principal",
    service: "El servicio", values: "Nuestros valores",
    offersNav: "Ofertas", offersKicker: "OFERTAS DISPONIBLES", offersTitle: "Un primer servicio, <span class="gradient-text">gratis.</span>", offersIntro: "Recursos sencillos para dar vida a tus proyectos, sin coste.", offerBadge: "GRATIS", offerCategory: "ALOJAMIENTO DE BOTS", offerTitle: "Bot de Discord en Python", offerDescription: "Aloja tu bot de Discord desarrollado en Python y mantenlo funcionando sin dejar tu propio ordenador encendido.", offerRam: "Memoria RAM", offerStorage: "Almacenamiento", offerBandwidth: "Ancho de banda", offerUnlimited: "Ilimitado", offerSpeed: "Velocidad de red hasta 100 Mbps", offerOrder: "Solicitar gratis", offerFootnote: "Realiza tu pedido abriendo un ticket en nuestro servidor de Discord. Nuestro equipo te ayudara con la configuracion.", faq: "Preguntas frecuentes", navCta: "Descubrir ZatchHost",
    eyebrow: "Alojamiento diseñado en Francia",
    heroTitle: "Tus proyectos merecen<br>un <span class=\"gradient-text\">mejor lugar.</span>",
    heroLead: "Alojamiento accesible, una experiencia clara y un equipo cercano. Con ZatchHost, concéntrate en tus proyectos. Nosotros nos ocupamos del resto.",
    heroPrimary: "Descubrir el servicio", heroSecondary: "¿Por qué ZatchHost?",
    heroNote: "Sencillo. Accesible. Sin extras innecesarios.", floatIdeas: "Tus ideas", floatReady: "Listas para despegar",
    floatPace: "A tu ritmo", floatSimple: "Planes sin complicaciones",
    bottomLeft: "HECHO PARA PROYECTOS QUE IMPORTAN", bottomRight: "FRANCIA <b>·</b> WEB <b>·</b> COMUNIDAD",
    introKicker: "01 / EL ESPÍRITU ZATCHHOST",
    introTitle: "El rendimiento no debería ser un <span class=\"gradient-text\">lujo.</span>",
    intro1: "Poner en marcha un proyecto en línea no debería implicar precios confusos ni procesos complicados. ZatchHost quiere hacer el alojamiento más accesible con un enfoque directo y transparente.",
    intro2: "Tanto si lanzas una idea, desarrollas un servicio o reúnes una comunidad, mereces una solución fácil de entender.",
    valuesKicker: "02 / LO QUE NOS GUÍA",
    valuesTitle: "Menos obstáculos.<br><span class=\"muted-heading\">Más posibilidades.</span>",
    valuesAside: "Un servicio de alojamiento debe ayudarte a avanzar, no añadir más complejidad.",
    card1Title: "Precios accesibles", card1Text: "Un enfoque pensado para cuidar el presupuesto. Lo esencial debe seguir siendo accesible mientras tu proyecto crece.",
    card2Title: "La sencillez ante todo", card2Text: "Información clara y una experiencia pensada para que te centres en lo importante.",
    card3Title: "Identidad francesa", card3Text: "Un servicio concebido en Francia, con una comunicación directa y cercana.",
    manifestoKicker: "03 / DA VIDA A TUS IDEAS",
    manifestoTitle: "El próximo proyecto<br>importante es <span class=\"gradient-text\">el tuyo.</span>",
    manifestoText: "ZatchHost propone otra forma de entender el alojamiento: más clara, más accesible y centrada en las personas que hacen realidad sus proyectos.",
    manifestoButton: "Más información", faqKicker: "04 / PREGUNTAS FRECUENTES",
    faqTitle: "Algunas respuestas<br><span class=\"muted-heading\">para empezar.</span>",
    faqIntro: "Lo esencial sobre ZatchHost y su visión del alojamiento.",
    q1: "¿Qué es ZatchHost?", a1: "ZatchHost es un servicio francés de alojamiento que quiere ofrecer soluciones accesibles y una experiencia sencilla, sin complejidad innecesaria.",
    q2: "¿Para quién es ZatchHost?", a2: "Para quienes quieren alojar un proyecto en línea y buscan un enfoque claro, accesible y fácil de entender.",
    q3: "¿Dónde está ZatchHost?", a3: "ZatchHost es un servicio francés. Los detalles exactos de la infraestructura y la ubicación de los servidores se comunicarán en la documentación de las ofertas.",
    q4: "¿Dónde puedo consultar los planes y precios?", a4: "Los planes, sus características y sus precios se publicarán aquí cuando estén disponibles. Cada opción detallará claramente lo que incluye.",
    footer: "Alojamiento accesible, sin complicaciones.", backTop: "Volver arriba", origin: "Creado en Francia",
    title: "ZatchHost — Alojamiento accesible y sencillo",
    description: "ZatchHost ofrece alojamiento accesible con un enfoque sencillo, transparente y cercano para tus proyectos en línea.",
    ogTitle: "ZatchHost — Alojamiento, sin complicaciones.",
    ogDescription: "Alojamiento accesible, transparencia y un servicio diseñado en Francia."
  },
  ja: {
    label: "言語", skip: "本文へスキップ", nav: "メインナビゲーション",
    service: "サービス", values: "私たちの理念",
    offersNav: "オファー", offersKicker: "利用可能なオファー", offersTitle: "最初のサービスは<span class="gradient-text">無料。</span>", offersIntro: "プロジェクトを始めるためのシンプルなリソースを無料で提供します。", offerBadge: "無料", offerCategory: "ボットホスティング", offerTitle: "Python Discord Bot", offerDescription: "Pythonで開発したDiscordボットをホストし、自分のPCを起動したままにせず実行できます。", offerRam: "RAM", offerStorage: "ストレージ", offerBandwidth: "帯域幅", offerUnlimited: "無制限", offerSpeed: "ネットワーク速度 最大100 Mbps", offerOrder: "無料で申し込む", offerFootnote: "Discordサーバーでチケットを作成してお申し込みください。設定はチームがサポートします。", faq: "よくある質問", navCta: "ZatchHostについて",
    eyebrow: "フランスで考案されたホスティング",
    heroTitle: "あなたのプロジェクトに<br><span class=\"gradient-text\">ふさわしい場所を。</span>",
    heroLead: "手頃なホスティング、わかりやすいサービス、そして身近なチーム。ZatchHostと一緒に、プロジェクトに集中してください。あとは私たちにお任せください。",
    heroPrimary: "サービスを見る", heroSecondary: "ZatchHostを選ぶ理由",
    heroNote: "シンプル。手頃。余計なものはなし。", floatIdeas: "あなたのアイデア", floatReady: "さあ、始めよう",
    floatPace: "あなたのペースで", floatSimple: "わかりやすいプラン",
    bottomLeft: "大切なプロジェクトのために", bottomRight: "フランス <b>·</b> ウェブ <b>·</b> コミュニティ",
    introKicker: "01 / ZATCHHOSTの考え方",
    introTitle: "高いパフォーマンスは<span class=\"gradient-text\">贅沢</span>であってはならない。",
    intro1: "オンラインプロジェクトの立ち上げに、わかりにくい料金や複雑な手続きは必要ありません。ZatchHostは、率直で透明性のある方法でホスティングをより身近にします。",
    intro2: "アイデアを形にするときも、サービスを開発するときも、コミュニティを作るときも、わかりやすいソリューションが必要です。",
    valuesKicker: "02 / 私たちが大切にすること",
    valuesTitle: "手間を減らし、<br><span class=\"muted-heading\">可能性を広げる。</span>",
    valuesAside: "ホスティングサービスは、複雑さを増やすのではなく、前進を支えるべきです。",
    card1Title: "手頃な価格", card1Text: "予算を大切にするアプローチ。プロジェクトの開始時も成長後も、必要なものを手頃な価格で。",
    card2Title: "何よりもシンプルに", card2Text: "大切なことに集中できるよう、情報を明確にし、使いやすさを重視します。",
    card3Title: "フランス発のサービス", card3Text: "フランスで構想されたサービス。直接的で身近なコミュニケーションを大切にします。",
    manifestoKicker: "03 / アイデアを形に",
    manifestoTitle: "次に大切なプロジェクトは<br><span class=\"gradient-text\">あなたのもの。</span>",
    manifestoText: "ZatchHostは、より明快で、より手頃で、プロジェクトを支える人々を中心にした新しいホスティングを目指しています。",
    manifestoButton: "詳しく見る", faqKicker: "04 / よくある質問",
    faqTitle: "まず知っておきたい<br><span class=\"muted-heading\">いくつかのこと。</span>",
    faqIntro: "ZatchHostとホスティングに対する考え方をご紹介します。",
    q1: "ZatchHostとは何ですか？", a1: "ZatchHostは、不要な複雑さをなくし、手頃なソリューションとシンプルな体験を提供することを目指すフランスのホスティングサービスです。",
    q2: "どのような人に向いていますか？", a2: "オンラインプロジェクトをホストしたい方や、明快で手頃なサービスをお探しの方に向いています。",
    q3: "ZatchHostはどこを拠点としていますか？", a3: "ZatchHostはフランスのサービスです。インフラやサーバー所在地の詳細は、各プランの案内でお知らせします。",
    q4: "プランや料金はどこで確認できますか？", a4: "プラン、機能、料金は公開時にこちらに掲載します。各プランの内容を明確に説明します。",
    footer: "シンプルで手頃なホスティング。", backTop: "トップへ戻る", origin: "フランスで構想",
    title: "ZatchHost — シンプルで手頃なホスティング",
    description: "ZatchHostは、オンラインプロジェクトのためにシンプルで透明性のある手頃なホスティングを提供します。",
    ogTitle: "ZatchHost — シンプルなホスティング。",
    ogDescription: "手頃なホスティング、透明性のあるアプローチ、フランスで構想されたサービス。"
  },
  de: {
    label: "Sprache", skip: "Zum Inhalt springen", nav: "Hauptnavigation",
    service: "Der Service", values: "Unsere Werte",
    offersNav: "Angebote", offersKicker: "VERFUGBARE ANGEBOTE", offersTitle: "Ein erster Service, <span class="gradient-text">kostenlos.</span>", offersIntro: "Einfache Ressourcen fur deine Projekte - ohne Kosten.", offerBadge: "KOSTENLOS", offerCategory: "BOT-HOSTING", offerTitle: "Python-Discord-Bot", offerDescription: "Hoste deinen mit Python entwickelten Discord-Bot und lass ihn laufen, ohne deinen eigenen Computer eingeschaltet zu lassen.", offerRam: "Arbeitsspeicher", offerStorage: "Speicherplatz", offerBandwidth: "Bandbreite", offerUnlimited: "Unbegrenzt", offerSpeed: "Netzwerkgeschwindigkeit bis zu 100 Mbps", offerOrder: "Kostenlos bestellen", offerFootnote: "Erstelle zur Bestellung ein Ticket auf unserem Discord-Server. Unser Team hilft dir bei der Einrichtung.", faq: "FAQ", navCta: "ZatchHost entdecken",
    eyebrow: "Hosting aus Frankreich",
    heroTitle: "Deine Projekte verdienen<br>ein <span class=\"gradient-text\">besseres Zuhause.</span>",
    heroLead: "Bezahlbares Hosting, ein klares Angebot und ein persönliches Team. Konzentriere dich mit ZatchHost auf deine Projekte. Wir kümmern uns um den Rest.",
    heroPrimary: "Service entdecken", heroSecondary: "Warum ZatchHost?",
    heroNote: "Einfach. Bezahlbar. Ohne unnötigen Ballast.", floatIdeas: "Deine Ideen", floatReady: "Bereit durchzustarten",
    floatPace: "In deinem Tempo", floatSimple: "Klare Angebote",
    bottomLeft: "FÜR PROJEKTE, DIE WICHTIG SIND", bottomRight: "FRANKREICH <b>·</b> WEB <b>·</b> COMMUNITY",
    introKicker: "01 / DER ZATCHHOST-GEDANKE",
    introTitle: "Leistung sollte kein <span class=\"gradient-text\">Luxus</span> sein.",
    intro1: "Ein Online-Projekt sollte nicht mit unverständlichen Preisen oder komplizierten Abläufen verbunden sein. ZatchHost möchte Hosting mit einem direkten und transparenten Ansatz zugänglicher machen.",
    intro2: "Ob du eine Idee startest, einen Dienst entwickelst oder eine Community aufbaust: Du solltest eine Lösung nutzen können, die leicht verständlich ist.",
    valuesKicker: "02 / WAS UNS LEITET",
    valuesTitle: "Weniger Hürden.<br><span class=\"muted-heading\">Mehr Möglichkeiten.</span>",
    valuesAside: "Hosting sollte dich voranbringen und nicht noch komplizierter machen.",
    card1Title: "Faire, zugängliche Preise", card1Text: "Ein budgetbewusster Ansatz. Das Wesentliche soll zugänglich bleiben, wenn dein Projekt startet und wächst.",
    card2Title: "Einfachheit zuerst", card2Text: "Klare Informationen und eine Erfahrung, mit der du dich auf das Wesentliche konzentrieren kannst.",
    card3Title: "Eine französische Identität", card3Text: "Ein in Frankreich erdachter Service mit direkter Kommunikation und persönlichem Kontakt.",
    manifestoKicker: "03 / BRING DEINE IDEEN ZUM LEBEN",
    manifestoTitle: "Das nächste wichtige Projekt<br>ist <span class=\"gradient-text\">deins.</span>",
    manifestoText: "ZatchHost entwickelt einen anderen Hosting-Ansatz: verständlicher, zugänglicher und auf die Menschen hinter den Projekten ausgerichtet.",
    manifestoButton: "Mehr erfahren", faqKicker: "04 / HÄUFIGE FRAGEN",
    faqTitle: "Ein paar Antworten<br><span class=\"muted-heading\">für den Anfang.</span>",
    faqIntro: "Das Wichtigste über ZatchHost und unsere Hosting-Idee.",
    q1: "Was ist ZatchHost?", a1: "ZatchHost ist ein französischer Hosting-Service, der zugängliche Lösungen und eine einfache Nutzung ohne unnötige Komplexität anbieten möchte.",
    q2: "Für wen ist ZatchHost gedacht?", a2: "Für alle, die ein Online-Projekt hosten möchten und einen klaren, zugänglichen und verständlichen Ansatz suchen.",
    q3: "Wo hat ZatchHost seinen Sitz?", a3: "ZatchHost ist ein französischer Service. Genaue Angaben zur Infrastruktur und zum Serverstandort werden in der Angebotsdokumentation veröffentlicht.",
    q4: "Wo finde ich Angebote und Preise?", a4: "Angebote, Funktionen und Preise werden hier veröffentlicht, sobald sie verfügbar sind. Jeder Tarif erklärt klar, was enthalten ist.",
    footer: "Zugängliches Hosting. Ganz einfach.", backTop: "Nach oben", origin: "In Frankreich erdacht",
    title: "ZatchHost — Zugängliches Hosting, ganz einfach",
    description: "ZatchHost bietet zugängliches Hosting mit einem einfachen, transparenten und persönlichen Ansatz für deine Online-Projekte.",
    ogTitle: "ZatchHost — Hosting, ganz einfach.",
    ogDescription: "Zugängliches Hosting, Transparenz und ein in Frankreich entwickelter Service."
  }
};

const languageSelect = document.querySelector("#language-select");
const languageMeta = {
  fr: "fr_FR", en: "en_US", es: "es_ES", ja: "ja_JP", de: "de_DE"
};

function setLanguage(language) {
  const t = translations[language] || translations.fr;
  document.documentElement.lang = language;

  const textMap = {
    ".language-picker label": t.label,
    ".skip-link": t.skip,
    ".navigation": null,
    ".navigation a[href='#service']": t.service,
    ".navigation a[href='#offres']": t.offersNav,
    ".offers .section-kicker": t.offersKicker,
    ".offers h2": t.offersTitle,
    ".offers-intro": t.offersIntro,
    ".offer-category": t.offerCategory,
    ".offer-badge": t.offerBadge,
    ".offer-card h3": t.offerTitle,
    ".offer-description": t.offerDescription,
    ".offer-specs > div:nth-child(1) span": t.offerRam,
    ".offer-specs > div:nth-child(2) span": t.offerStorage,
    ".offer-specs > div:nth-child(3) span": t.offerBandwidth,
    ".offer-specs > div:nth-child(3) strong": t.offerUnlimited,
    ".offer-specs > div:nth-child(3) small": t.offerSpeed,
    ".offer-button": t.offerOrder,
    ".offer-footnote": t.offerFootnote,
    ".navigation a[href='#engagements']": t.values,
    ".navigation a[href='#faq']": t.faq,
    ".nav-cta [data-never]": null,
    ".eyebrow": t.eyebrow,
    "h1": t.heroTitle,
    ".hero-lead": t.heroLead,
    ".hero-actions .button-primary": t.heroPrimary,
    ".hero-actions .text-link": t.heroSecondary,
    ".hero-note": t.heroNote,
    ".hero-visual": null,
    ".float-card-top b": t.floatIdeas,
    ".float-card-top small": t.floatReady,
    ".float-card-bottom b": t.floatPace,
    ".float-card-bottom small": t.floatSimple,
    ".hero-bottom span:first-child": t.bottomLeft,
    ".hero-bottom span:last-child": t.bottomRight,
    ".intro .section-kicker": t.introKicker,
    ".intro h2": t.introTitle,
    ".intro-text p:first-child": t.intro1,
    ".intro-text p:last-child": t.intro2,
    ".values .section-kicker": t.valuesKicker,
    ".section-heading h2": t.valuesTitle,
    ".heading-aside": t.valuesAside,
    ".value-card:nth-child(1) h3": t.card1Title,
    ".value-card:nth-child(1) p": t.card1Text,
    ".value-card:nth-child(2) h3": t.card2Title,
    ".value-card:nth-child(2) p": t.card2Text,
    ".value-card:nth-child(3) h3": t.card3Title,
    ".value-card:nth-child(3) p": t.card3Text,
    ".manifesto-copy .section-kicker": t.manifestoKicker,
    ".manifesto-copy h2": t.manifestoTitle,
    ".manifesto-copy > p:not(.section-kicker)": t.manifestoText,
    ".manifesto-copy .button": t.manifestoButton,
    ".faq .section-kicker": t.faqKicker,
    ".faq-grid h2": t.faqTitle,
    ".faq-intro": t.faqIntro,
    ".faq-list details:nth-child(1) summary": t.q1,
    ".faq-list details:nth-child(1) p": t.a1,
    ".faq-list details:nth-child(2) summary": t.q2,
    ".faq-list details:nth-child(2) p": t.a2,
    ".faq-list details:nth-child(3) summary": t.q3,
    ".faq-list details:nth-child(3) p": t.a3,
    ".faq-list details:nth-child(4) summary": t.q4,
    ".faq-list details:nth-child(4) p": t.a4,
    ".footer-main > p": t.footer,
    ".back-top": t.backTop,
    ".footer-bottom > span:last-child": t.origin
  };

  Object.entries(textMap).forEach(([selector, value]) => {
    if (value === null) return;
    const element = document.querySelector(selector);
    if (!element) return;
    if (selector.includes("summary")) {
      const icon = element.querySelector(".faq-toggle-icon") || element.querySelector("span:last-child");
      element.innerHTML = "";
      const label = document.createElement("span");
      label.className = "summary-label";
      label.textContent = value;
      element.append(label);
      if (icon) {
        icon.classList.add("faq-toggle-icon");
        icon.setAttribute("aria-hidden", "true");
        element.append(icon);
      } else {
        const plus = document.createElement("span");
        plus.className = "faq-toggle-icon";
        plus.setAttribute("aria-hidden", "true");
        plus.textContent = "+";
        element.append(plus);
      }
    } else if (selector === ".footer-bottom > span:last-child") {
      const icon = element.querySelector(".footer-heart");
      element.textContent = value + " ";
      if (icon) element.append(icon);
    } else {
      element.innerHTML = value;
    }
  });

  const navCta = document.querySelector(".nav-cta");
  if (navCta) {
    const icon = navCta.querySelector("span[aria-hidden='true']");
    navCta.textContent = t.navCta + " ";
    if (icon) navCta.append(icon);
  }

  document.title = t.title;
  document.querySelector("#meta-description")?.setAttribute("content", t.description);
  document.querySelector("#og-title")?.setAttribute("content", t.ogTitle);
  document.querySelector("#og-description")?.setAttribute("content", t.ogDescription);
  document.querySelector('meta[property="og:locale"]')?.setAttribute("content", languageMeta[language] || "fr_FR");
  if (languageSelect) languageSelect.value = language;
  try { localStorage.setItem("zatchhost-language", language); } catch (_) { /* Storage may be disabled. */ }
}

if (languageSelect) {
  let preferredLanguage = "fr";
  try {
    const savedLanguage = localStorage.getItem("zatchhost-language");
    if (savedLanguage && translations[savedLanguage]) preferredLanguage = savedLanguage;
    else {
      const browserLanguage = (navigator.language || "fr").slice(0, 2).toLowerCase();
      if (translations[browserLanguage]) preferredLanguage = browserLanguage;
    }
  } catch (_) {
    const browserLanguage = (navigator.language || "fr").slice(0, 2).toLowerCase();
    if (translations[browserLanguage]) preferredLanguage = browserLanguage;
  }
  languageSelect.addEventListener("change", () => setLanguage(languageSelect.value));
  setLanguage(preferredLanguage);
}
