export type CollectionSlug =
  | "desembaracar"
  | "modelar"
  | "finalizar"
  | "bem-estar"
  | "pet-teezer"
  | "kits-e-promocoes"

export type Collection = {
  slug: CollectionSlug
  name: string
  description: string
  tags: string[]
  image: string
}

// Catálogo de coleções da Tangle Teezer, refletindo a organização oficial da marca no Brasil.
export const COLLECTIONS: Collection[] = [
  {
    slug: "desembaracar",
    name: "Desembaraçar",
    description: "Linha principal, segmentada por tipo de fio.",
    tags: ["Finos e frágeis", "Médios", "Grossos e volumosos", "Cacheados e crespos"],
    image: "/products/desembaracar/the-ultimate-detangler.png",
  },
  {
    slug: "modelar",
    name: "Modelar",
    description: "Escovas para o styling do dia a dia.",
    tags: ["Modelagem rápida", "Modelagem com volume"],
    image: "/products/modelar/easy-dry-go.png",
  },
  {
    slug: "finalizar",
    name: "Finalizar",
    description: "O passo final antes de sair de casa.",
    tags: [],
    image: "/products/finalizar/the-ultimate-styler.png",
  },
  {
    slug: "bem-estar",
    name: "Bem-Estar",
    description: "Escova de esfoliação para o couro cabeludo.",
    tags: [],
    image: "/products/bem-estar/scalp-exfoliator.jpg",
  },
  {
    slug: "pet-teezer",
    name: "Pet-Teezer",
    description: "Linha para desembaraçar e escovar o pelo de pets.",
    tags: ["Desembaraçar", "Rasquear"],
    image: "/products/pet-teezer/desembaracadora-detangling-grande.jpg",
  },
  {
    slug: "kits-e-promocoes",
    name: "Kits e Promoções",
    description: "Combos com desconto para presentear ou economizar.",
    tags: [],
    image: "/products/kits-e-promocoes/kit-dia-dos-pais-original-styler-e-mini.png",
  },
]

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug)
}

export type Product = {
  slug: string
  name: string
  collection: CollectionSlug
  description: string
  /** Preço final formatado, sem "R$" (ex: "128,00"). */
  price: string
  priceValue: number
  /** Preço "de", formatado sem "R$", quando há desconto. */
  oldPrice?: string
  /** Percentual do desconto, ex: "20". */
  discountPct?: string
  img: string
  /** Fotos adicionais (a página do produto mostra img + gallery juntas). */
  gallery?: string[]
  available: boolean
  bestSeller?: boolean
}

export const PRODUCTS: Product[] = [
  // Desembaraçar
  {
    slug: "the-ultimate-detangler",
    name: "The Ultimate Detangler",
    collection: "desembaracar",
    description:
      "A escova mais completa da linha, com cabo emborrachado e duas fileiras de cerdas de alturas diferentes que desembaraçam por camadas. Indicada para todos os tipos de cabelo, pode ser usada seca ou molhada, inclusive no banho.",
    price: "128,00",
    priceValue: 128.0,
    oldPrice: "160,00",
    discountPct: "20",
    img: "/products/desembaracar/the-ultimate-detangler.png",
    available: true,
    bestSeller: true,
  },
  {
    slug: "the-ultimate-detangler-black",
    name: "The Ultimate Detangler Black",
    collection: "desembaracar",
    description:
      "A escova mais completa da linha, com duas fileiras de cerdas de alturas diferentes que desembaraçam por camadas, em um acabamento preto fosco elegante e discreto. Indicada para todos os tipos de cabelo, pode ser usada seca ou molhada, inclusive no banho.",
    price: "128,00",
    priceValue: 128.0,
    oldPrice: "160,00",
    discountPct: "20",
    img: "/products/desembaracar/tud-black-1.jpg",
    gallery: ["/products/desembaracar/tud-black-2.jpg", "/products/desembaracar/tud-black-3.jpg"],
    available: true,
  },
  {
    slug: "the-ultimate-detangler-millennial-pink",
    name: "The Ultimate Detangler Millennial Pink",
    collection: "desembaracar",
    description:
      "A escova mais completa da linha, com duas fileiras de cerdas de alturas diferentes que desembaraçam por camadas, na cor Millennial Pink, um tom rosa suave e moderno. Indicada para todos os tipos de cabelo, pode ser usada seca ou molhada, inclusive no banho.",
    price: "128,00",
    priceValue: 128.0,
    oldPrice: "160,00",
    discountPct: "20",
    img: "/products/desembaracar/tud-millennial-pink-1.jpg",
    gallery: [
      "/products/desembaracar/tud-millennial-pink-2.jpg",
      "/products/desembaracar/tud-millennial-pink-3.jpg",
    ],
    available: true,
  },
  {
    slug: "the-ultimate-detangler-fresh-purple",
    name: "The Ultimate Detangler Fresh Purple",
    collection: "desembaracar",
    description:
      "A escova mais completa da linha, com duas fileiras de cerdas de alturas diferentes que desembaraçam por camadas, na cor Fresh Purple, um roxo vibrante e cheio de personalidade. Indicada para todos os tipos de cabelo, pode ser usada seca ou molhada, inclusive no banho.",
    price: "128,00",
    priceValue: 128.0,
    oldPrice: "160,00",
    discountPct: "20",
    img: "/products/desembaracar/tud-fresh-purple-1.jpg",
    gallery: ["/products/desembaracar/tud-fresh-purple-2.jpg"],
    available: true,
  },
  {
    slug: "the-ultimate-detangler-mini",
    name: "The Ultimate Detangler Mini",
    collection: "desembaracar",
    description:
      "Versão compacta da Ultimate Detangler, ideal para bolsa e viagem, com a mesma tecnologia de duas fileiras de cerdas em tamanho reduzido.",
    price: "116,00",
    priceValue: 116.0,
    oldPrice: "145,00",
    discountPct: "20",
    img: "/products/desembaracar/the-ultimate-detangler-mini.jpg",
    available: true,
  },
  {
    slug: "ultimate-detangler-chrome-midnight-silver",
    name: "Ultimate Detangler Chrome Midnight Silver",
    collection: "desembaracar",
    description:
      "Edição especial da linha Chrome, com acabamento metalizado prata e a mesma tecnologia de duas fileiras de cerdas da Ultimate Detangler, em uma escova premium para presentear.",
    price: "253,00",
    priceValue: 253.0,
    img: "/products/desembaracar/chrome-midnight-silver-box.jpg",
    available: true,
  },
  {
    slug: "ultimate-detangler-chrome-neo-gold",
    name: "Ultimate Detangler Chrome Neo Gold",
    collection: "desembaracar",
    description:
      "Edição especial da linha Chrome, com acabamento dourado metalizado e a mesma tecnologia de duas fileiras de cerdas da Ultimate Detangler, para quem quer um toque de luxo na rotina.",
    price: "163,00",
    priceValue: 163.0,
    img: "/products/desembaracar/chrome-neo-gold.jpg",
    available: true,
  },
  {
    slug: "ultimate-detangler-chrome-mauve-copper",
    name: "Ultimate Detangler Chrome Mauve Copper",
    collection: "desembaracar",
    description:
      "Edição especial da linha Chrome, com acabamento metalizado mauve e a mesma tecnologia de duas fileiras de cerdas da Ultimate Detangler, a mais vendida da linha para quem quer um toque de luxo no dia a dia.",
    price: "202,40",
    priceValue: 202.4,
    oldPrice: "253,00",
    discountPct: "20",
    img: "/products/desembaracar/chrome-mauve-copper.jpg",
    gallery: [
      "/products/desembaracar/chrome-mauve-copper-hero.jpg",
      "/products/desembaracar/chrome-mauve-copper-box.jpg",
      "/products/desembaracar/chrome-mauve-copper-flatlay.jpg",
    ],
    available: true,
    bestSeller: true,
  },
  {
    slug: "the-original-mini",
    name: "The Original Mini",
    collection: "desembaracar",
    description:
      "Versão mini da escova clássica The Original, com duas fileiras de cerdas flexíveis que desembaraçam sem puxar, perfeita para crianças ou para levar na bolsa.",
    price: "68,00",
    priceValue: 68.0,
    oldPrice: "85,00",
    discountPct: "20",
    img: "/products/desembaracar/the-original-mini.jpg",
    available: true,
  },
  {
    slug: "the-original-mini-aqua",
    name: "The Original Mini Aqua",
    collection: "desembaracar",
    description:
      "Versão mini da escova clássica The Original, com duas fileiras de cerdas flexíveis que desembaraçam sem puxar, na cor Aqua, perfeita para crianças ou para levar na bolsa.",
    price: "68,00",
    priceValue: 68.0,
    oldPrice: "85,00",
    discountPct: "20",
    img: "/products/desembaracar/original-mini-aqua-1.jpg",
    gallery: ["/products/desembaracar/original-mini-aqua-2.jpg"],
    available: true,
  },
  {
    slug: "the-ultimate-detangler-naturally-curly",
    name: "The Ultimate Detangler Naturally Curly",
    collection: "desembaracar",
    description:
      "Desenvolvida para cabelos cacheados e crespos, com cerdas espaçadas que respeitam o formato natural do cacho sem abrir o fio.",
    price: "128,00",
    priceValue: 128.0,
    oldPrice: "160,00",
    discountPct: "20",
    img: "/products/desembaracar/the-ultimate-detangler-naturally-curly.png",
    available: true,
  },
  {
    slug: "escova-de-cabelo-desembaracadora-the-original",
    name: "Escova de cabelo desembaraçadora The Original",
    collection: "desembaracar",
    description:
      "A escova original que deu início à marca, com duas fileiras de cerdas flexíveis que desembaraçam sem puxar.",
    price: "100,00",
    priceValue: 100.0,
    oldPrice: "125,00",
    discountPct: "20",
    img: "/products/desembaracar/escova-de-cabelo-desembaracadora-the-original.jpg",
    available: true,
  },
  {
    slug: "the-original-panther-black",
    name: "The Original Panther Black",
    collection: "desembaracar",
    description:
      "A escova original que deu início à marca, na cor Panther Black, com duas fileiras de cerdas flexíveis que desembaraçam sem puxar.",
    price: "100,00",
    priceValue: 100.0,
    oldPrice: "125,00",
    discountPct: "20",
    img: "/products/desembaracar/original-panther-black-1.jpg",
    gallery: ["/products/desembaracar/original-panther-black-2.jpg"],
    available: true,
  },
  {
    slug: "mini-ultimate-detangler-devil-wears-prada",
    name: "Mini Ultimate Detangler (Devil Wears Prada)",
    collection: "desembaracar",
    description:
      "Edição de colecionador em parceria com O Diabo Veste Prada, em tamanho mini com estampa exclusiva.",
    price: "175,20",
    priceValue: 175.2,
    oldPrice: "219,00",
    discountPct: "20",
    img: "/products/desembaracar/mini-ultimate-detangler-devil-wears-prada.jpg",
    available: true,
  },
  {
    slug: "the-ultimate-detangler-o-diabo-veste-prada",
    name: "The Ultimate Detangler O Diabo Veste Prada",
    collection: "desembaracar",
    description:
      "Versão em tamanho padrão da coleção especial O Diabo Veste Prada, item de colecionador com a mesma tecnologia de sempre.",
    price: "187,20",
    priceValue: 187.2,
    oldPrice: "234,00",
    discountPct: "20",
    img: "/products/desembaracar/the-ultimate-detangler-diabo-veste-prada.png",
    available: true,
  },
  {
    slug: "plant-based",
    name: "Plant Based",
    collection: "desembaracar",
    description:
      "Versão sustentável feita com plástico de origem vegetal, com a mesma performance de desembaraço e menor impacto ambiental.",
    price: "124,00",
    priceValue: 124.0,
    oldPrice: "155,00",
    discountPct: "20",
    img: "/products/desembaracar/plant-based.jpg",
    available: true,
  },
  {
    slug: "the-ultimate-detangler-fine",
    name: "The Ultimate Detangler Fine",
    collection: "desembaracar",
    description:
      "Cerdas mais macias, pensada para fios finos e frágeis que precisam de um desembaraço ainda mais suave.",
    price: "160,00",
    priceValue: 160.0,
    img: "/products/desembaracar/the-ultimate-detangler-fine.png",
    available: true,
  },
  {
    slug: "ultimate-detangler-mini-black",
    name: "Ultimate Detangler Mini Black",
    collection: "desembaracar",
    description:
      "Versão mini em preto fosco, compacta para o dia a dia ou a bolsa de viagem, com a mesma tecnologia de duas fileiras de cerdas da Ultimate Detangler.",
    price: "117,00",
    priceValue: 117.0,
    img: "/products/desembaracar/mini-black.jpg",
    gallery: [
      "/products/desembaracar/tud-mini-black-1.jpg",
      "/products/desembaracar/tud-mini-black-2.jpg",
      "/products/desembaracar/tud-mini-black-3.jpg",
    ],
    available: true,
  },
  {
    slug: "ultimate-detangler-mini-runway-pink",
    name: "Ultimate Detangler Mini Runway Pink",
    collection: "desembaracar",
    description:
      "Versão mini na cor rosa Runway, com a mesma tecnologia de duas fileiras de cerdas da Ultimate Detangler, o mesmo desembaraço sem dor em formato de bolso.",
    price: "118,00",
    priceValue: 118.0,
    img: "/products/desembaracar/mini-runway-pink.jpg",
    available: true,
  },
  {
    slug: "the-ultimate-detangler-extra-gentle",
    name: "The Ultimate Detangler Extra Gentle",
    collection: "desembaracar",
    description: "Cerdas ultra macias para couro cabeludo sensível, ideal para escovação delicada todos os dias.",
    price: "121,00",
    priceValue: 121.0,
    img: "/products/desembaracar/extra-gentle.png",
    available: true,
  },
  {
    slug: "fine-fragile-wet-detangler-cinnamon",
    name: "Fine & Fragile Wet Detangler Cinnamon",
    collection: "desembaracar",
    description:
      "Desenvolvida para fios finos e frágeis, pensada para uso no banho ajudando a espalhar condicionador sem quebrar o fio.",
    price: "117,00",
    priceValue: 117.0,
    img: "/products/desembaracar/fine-fragile-cinnamon.jpg",
    available: true,
  },
  {
    slug: "mini-ultimate-detangler-swarovski",
    name: "Mini Ultimate Detangler + Swarovski",
    collection: "desembaracar",
    description: "Edição mini com cristais Swarovski aplicados no cabo, item de colecionador para presentear.",
    price: "203,40",
    priceValue: 203.4,
    img: "/products/desembaracar/swarovski-mini.jpg",
    available: true,
  },
  {
    slug: "the-ultimate-detangler-mini-digital-lavender",
    name: "The Ultimate Detangler Mini Digital Lavender",
    collection: "desembaracar",
    description:
      "Versão compacta da Ultimate Detangler, com a mesma tecnologia de duas fileiras de cerdas em tamanho reduzido, na cor Digital Lavender, um lilás suave e delicado.",
    price: "116,00",
    priceValue: 116.0,
    oldPrice: "145,00",
    discountPct: "20",
    img: "/products/desembaracar/tud-mini-digital-lavender-1.jpg",
    gallery: [
      "/products/desembaracar/tud-mini-digital-lavender-2.jpg",
      "/products/desembaracar/tud-mini-digital-lavender-3.jpg",
    ],
    available: true,
  },
  {
    slug: "the-ultimate-detangler-mini-lilac-swarovski",
    name: "The Ultimate Detangler Mini Lilac + Swarovski",
    collection: "desembaracar",
    description:
      "Edição mini na cor Lilac com pingente Swarovski aplicado no cabo, item de colecionador para presentear.",
    price: "167,20",
    priceValue: 167.2,
    oldPrice: "209,00",
    discountPct: "20",
    img: "/products/desembaracar/tud-mini-lilac-swarovski-1.jpg",
    gallery: [
      "/products/desembaracar/tud-mini-lilac-swarovski-2.jpg",
      "/products/desembaracar/tud-mini-lilac-swarovski-3.jpg",
    ],
    available: true,
  },
  {
    slug: "the-ultimate-detangler-mini-marshmallow-duo",
    name: "The Ultimate Detangler Mini Marshmallow Duo",
    collection: "desembaracar",
    description:
      "Versão compacta da Ultimate Detangler, com a mesma tecnologia de duas fileiras de cerdas em tamanho reduzido, na cor Marshmallow Duo, em dois tons suaves que lembram um marshmallow.",
    price: "116,00",
    priceValue: 116.0,
    oldPrice: "145,00",
    discountPct: "20",
    img: "/products/desembaracar/tud-mini-marshmallow-duo-1.jpg",
    gallery: ["/products/desembaracar/tud-mini-marshmallow-duo-2.jpg"],
    available: true,
  },

  // Modelar
  {
    slug: "easy-dry-go",
    name: "The Ultimate Blow-Dry",
    collection: "modelar",
    description:
      "Escova de secagem com dentes em formato de garrafa, que alisa e dá volume enquanto seca o cabelo, reduzindo o frizz.",
    price: "151,20",
    priceValue: 151.2,
    oldPrice: "189,00",
    discountPct: "20",
    img: "/products/modelar/easy-dry-go.png",
    available: true,
    bestSeller: true,
  },
  {
    slug: "round-tool-large",
    name: "Round Tool Large",
    collection: "modelar",
    description: "Escova redonda grande para escovação com volume, ideal para criar ondas e movimento nos fios.",
    price: "164,00",
    priceValue: 164.0,
    img: "/products/modelar/round-tool-large.jpg",
    available: true,
  },

  // Finalizar
  {
    slug: "back-combing",
    name: "The Ultimate Volumizer",
    collection: "finalizar",
    description:
      "Pente para a técnica de backcombing, cria altura e volume na raiz com o mínimo de dano ao fio.",
    price: "100,00",
    priceValue: 100.0,
    oldPrice: "125,00",
    discountPct: "20",
    img: "/products/finalizar/back-combing.jpg",
    available: true,
  },
  {
    slug: "the-ultimate-styler",
    name: "The Ultimate Styler",
    collection: "finalizar",
    description:
      "Escova de finalização com cerdas de javali e nylon, dá brilho e alinha os fios no último passo antes de sair de casa.",
    price: "167,20",
    priceValue: 167.2,
    oldPrice: "209,00",
    discountPct: "20",
    img: "/products/finalizar/the-ultimate-styler.png",
    available: true,
    bestSeller: true,
  },
  {
    slug: "the-ultimate-styler-pink",
    name: "The Ultimate Styler Pink",
    collection: "finalizar",
    description:
      "Escova de finalização com cerdas de javali e nylon, dá brilho e alinha os fios no último passo antes de sair de casa, em uma edição colorida na cor rosa.",
    price: "157,00",
    priceValue: 157.0,
    img: "/products/finalizar/styler-pink.jpg",
    available: true,
  },
  {
    slug: "hair-pick-comb",
    name: "Hair Pick Comb",
    collection: "finalizar",
    description:
      "Pente de dentes largos para dar forma e definição em cabelos cacheados e crespos, sem quebrar os fios.",
    price: "100,00",
    priceValue: 100.0,
    oldPrice: "125,00",
    discountPct: "20",
    img: "/products/finalizar/hair-pick-comb.jpg",
    available: true,
  },

  // Bem-Estar
  {
    slug: "scalp-exfoliator",
    name: "Scalp Exfoliator",
    collection: "bem-estar",
    description:
      "Escova de esfoliação para o couro cabeludo, remove oleosidade e resíduos e estimula a circulação antes do shampoo.",
    price: "92,00",
    priceValue: 92.0,
    oldPrice: "115,00",
    discountPct: "20",
    img: "/products/bem-estar/scalp-exfoliator.jpg",
    available: true,
  },

  // Pet-Teezer
  {
    slug: "rasqueadeira-de-shedding-grande",
    name: "Rasqueadeira de Shedding Grande",
    collection: "pet-teezer",
    description: "Remove a subpelagem solta de pets de porte grande, reduzindo a queda de pelos pela casa.",
    price: "100,00",
    priceValue: 100.0,
    oldPrice: "125,00",
    discountPct: "20",
    img: "/products/pet-teezer/rasqueadeira-de-shedding-grande.jpg",
    available: true,
  },
  {
    slug: "rasqueadeira-de-shedding-grande-purple-grey",
    name: "Rasqueadeira de Shedding Grande Purple Grey",
    collection: "pet-teezer",
    description:
      "Remove a subpelagem solta de pets de porte grande, reduzindo a queda de pelos pela casa, na cor Purple Grey.",
    price: "100,00",
    priceValue: 100.0,
    oldPrice: "125,00",
    discountPct: "20",
    img: "/products/pet-teezer/pet-teezer-deshedding-purple-grey-1.jpg",
    gallery: [
      "/products/pet-teezer/pet-teezer-deshedding-purple-grey-2.jpg",
      "/products/pet-teezer/pet-teezer-deshedding-purple-grey-3.jpg",
    ],
    available: true,
  },
  {
    slug: "desembaracadora-detangling-pequena",
    name: "Desembaraçadora Detangling Pequena",
    collection: "pet-teezer",
    description: "Desembaraça o pelo de pets pequenos sem puxar ou incomodar, ideal para escovações frequentes.",
    price: "88,00",
    priceValue: 88.0,
    oldPrice: "110,00",
    discountPct: "20",
    img: "/products/pet-teezer/desembaracadora-detangling-pequena.jpg",
    available: true,
  },
  {
    slug: "rasqueadeira-pet-pequena",
    name: "Rasqueadeira Pet Pequena",
    collection: "pet-teezer",
    description: "Remove pelos soltos de pets pequenos, reduzindo a queda de pelo e deixando a pelagem mais macia.",
    price: "88,00",
    priceValue: 88.0,
    oldPrice: "110,00",
    discountPct: "20",
    img: "/products/pet-teezer/rasqueadeira-pet-pequena.jpg",
    available: true,
  },
  {
    slug: "desembaracadora-detangling-grande",
    name: "Desembaraçadora Detangling Grande",
    collection: "pet-teezer",
    description: "Desembaraça a pelagem de pets de porte grande sem puxar, mesmo em nós mais resistentes.",
    price: "100,00",
    priceValue: 100.0,
    oldPrice: "125,00",
    discountPct: "20",
    img: "/products/pet-teezer/desembaracadora-detangling-grande.jpg",
    available: true,
    bestSeller: true,
  },
  {
    slug: "kit-millennial-pink-e-desembaracadora-pet",
    name: "Kit Millennial Pink e Desembaraçadora Pet",
    collection: "pet-teezer",
    description:
      "Combo com a Ultimate Detangler na cor Millennial Pink para você e a desembaraçadora para o pet.",
    price: "182,40",
    priceValue: 182.4,
    oldPrice: "228,00",
    discountPct: "20",
    img: "/products/pet-teezer/kit-tangle-teezer-millennial-pink-desembaracadora-pet.png",
    available: true,
  },

  // Kits e Promoções
  {
    slug: "kit-dia-dos-pais-original-styler-e-mini",
    name: "Kit Dia dos Pais: Original, Styler e Mini",
    collection: "kits-e-promocoes",
    description:
      "Combo com a Original, a Styler e a Mini, três escovas essenciais da linha, com desconto especial para presentear.",
    price: "306,56",
    priceValue: 306.56,
    oldPrice: "383,20",
    discountPct: "20",
    img: "/products/kits-e-promocoes/kit-dia-dos-pais-original-styler-e-mini.png",
    available: true,
  },
  {
    slug: "kit-tangle-teezer-black",
    name: "Kit Tangle Teezer Black",
    collection: "kits-e-promocoes",
    description: "Combo todo preto com as escovas essenciais da marca, para quem gosta de um visual discreto.",
    price: "226,00",
    priceValue: 226.0,
    img: "/products/kits-e-promocoes/kit-black.jpg",
    available: true,
  },
  {
    slug: "kit-cuidado-da-raiz-nioxin-tangle-teezer",
    name: "Kit Cuidado da Raiz (Nioxin + Tangle Teezer)",
    collection: "kits-e-promocoes",
    description:
      "Combo com produtos Nioxin para a raiz e uma escova Tangle Teezer, cuidado completo do couro cabeludo aos fios.",
    price: "162,00",
    priceValue: 162.0,
    img: "/products/kits-e-promocoes/kit-nioxin-raiz.png",
    available: true,
  },
  {
    slug: "kit-cuidado-e-nutricao-wella-professionals-tangle-teezer",
    name: "Kit Cuidado e Nutrição (Wella Professionals + Tangle Teezer)",
    collection: "kits-e-promocoes",
    description:
      "Combo com produtos Wella Professionals de nutrição para os fios e uma escova Tangle Teezer para o dia a dia, cuidado completo em um só combo.",
    price: "213,00",
    priceValue: 213.0,
    img: "/products/kits-e-promocoes/kit-wella-nutricao.png",
    available: true,
  },
  {
    slug: "kit-cronograma-capilar-wella-professionals-tangle-teezer",
    name: "Kit Cronograma Capilar (Wella Professionals + Tangle Teezer)",
    collection: "kits-e-promocoes",
    description: "Combo pensado para o cronograma capilar, com produtos Wella Professionals e uma escova Tangle Teezer.",
    price: "173,00",
    priceValue: 173.0,
    img: "/products/kits-e-promocoes/kit-wella-cronograma.png",
    available: true,
  },
]

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductsByCollection(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.collection === slug)
}

export const FEATURED_PRODUCT_SLUG = "the-ultimate-detangler"

// Order bump: para cada coleção, qual outra coleção completa melhor a rotina
// capilar de quem já tem esse tipo de produto no carrinho. Ex: quem desembaraça
// também se beneficia de cuidar do couro cabeludo; quem estiliza, de finalizar.
const COMPLEMENTARY_COLLECTION: Record<CollectionSlug, CollectionSlug> = {
  desembaracar: "bem-estar",
  modelar: "finalizar",
  finalizar: "bem-estar",
  "bem-estar": "desembaracar",
  "pet-teezer": "pet-teezer",
  "kits-e-promocoes": "bem-estar",
}

/**
 * Sugere um produto estratégico para adicionar ao pedido, com base nas
 * coleções já presentes no carrinho — nunca repete um produto que já está
 * no carrinho. Retorna undefined se não houver nenhuma sugestão disponível
 * (ex: o cliente já tem todos os candidatos no carrinho).
 */
export function getOrderBumpProduct(cartProductSlugs: string[]): Product | undefined {
  const inCart = new Set(cartProductSlugs)
  const cartProducts = cartProductSlugs.map((slug) => getProduct(slug)).filter((p): p is Product => !!p)

  const candidateCollections: CollectionSlug[] = []
  for (const product of cartProducts) {
    const complement = COMPLEMENTARY_COLLECTION[product.collection]
    if (!candidateCollections.includes(complement)) candidateCollections.push(complement)
  }

  for (const collectionSlug of candidateCollections) {
    const pick = getProductsByCollection(collectionSlug).find((p) => p.available && !inCart.has(p.slug))
    if (pick) return pick
  }

  // Sem coleção complementar disponível (ex: carrinho vazio ou tudo já
  // presente) — sugere o mais vendido da loja que ainda não está no carrinho.
  return PRODUCTS.find((p) => p.bestSeller && p.available && !inCart.has(p.slug))
}
