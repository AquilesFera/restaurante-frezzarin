import saladaMediterranea from "@/assets/menu/salada-mediterranea-gnljag7-.jpg";
import frangoGrelhado from "@/assets/menu/frango-grelhado-Ct2CLrgb.jpg";
import tilapia from "@/assets/menu/tilapia-CvdP5W3f.jpg";
import legumesVapor from "@/assets/menu/legumes-vapor-C2qR_EPf.jpg";
import marmitaP from "@/assets/menu/marmita-p-Bqz_92MS.jpg";
import marmitaG from "@/assets/menu/marmita-g-CcKfycCa.jpg";
import wrapIntegral from "@/assets/menu/wrap-integral-DVNCgqDD.jpg";
import marmitaSemGluten from "@/assets/menu/marmita-sem-gluten-BpISkLGW.jpg";
import marmitaSemLactose from "@/assets/menu/marmita-sem-lactose-CteKkHLP.jpg";
import marmitaVegana from "@/assets/menu/marmita-vegana-AlxtTSl8.jpg";
import sucoDetox from "@/assets/menu/suco-detox-DuaxB8zW.jpg";
import vitaminaFrutas from "@/assets/menu/vitamina-frutas-Dtyov-Ui.jpg";

export type Categoria = "Fit por Quilo" | "Marmitas" | "Congelados" | "Bebidas";
export type Tag = "Vegano" | "Fit" | "Low Carb" | "Sem Glúten" | "Sem Lactose" | "Natural";
export type Proteina = "frango" | "peixe" | "carne" | "vegetariano" | "vegano" | "nenhuma";
export type Porte = "leve" | "media" | "reforcada";

export interface Prato {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  categoria: Categoria;
  tags: Tag[];
  ingredientes: string[];
  calorias: number;
  proteina_g: number;
  carbo_g: number;
  gordura_g: number;
  proteina: Proteina;
  porte: Porte;
  semGluten: boolean;
  semLactose: boolean;
  lowCarb: boolean;
}

export const menu: Prato[] = [
  {
    id: "salada-mediterranea",
    nome: "Salada Mediterrânea",
    descricao: "Folhas verdes, tomate cereja, pepino, azeitona e molho de limão.",
    preco: "R$ 28/kg",
    imagem: saladaMediterranea,
    categoria: "Fit por Quilo",
    tags: ["Vegano", "Sem Glúten", "Sem Lactose"],
    ingredientes: ["Mix de folhas verdes", "Tomate cereja", "Pepino", "Azeitona preta", "Cebola roxa", "Azeite extravirgem", "Limão"],
    calorias: 180, proteina_g: 4, carbo_g: 12, gordura_g: 13,
    proteina: "vegano", porte: "leve",
    semGluten: true, semLactose: true, lowCarb: true,
  },
  {
    id: "frango-grelhado",
    nome: "Frango Grelhado",
    descricao: "Peito de frango grelhado, temperado com ervas finas e alho.",
    preco: "R$ 38/kg",
    imagem: frangoGrelhado,
    categoria: "Fit por Quilo",
    tags: ["Fit", "Sem Glúten", "Sem Lactose", "Low Carb"],
    ingredientes: ["Peito de frango", "Ervas finas", "Alho", "Azeite", "Sal marinho", "Pimenta do reino"],
    calorias: 230, proteina_g: 38, carbo_g: 2, gordura_g: 8,
    proteina: "frango", porte: "media",
    semGluten: true, semLactose: true, lowCarb: true,
  },
  {
    id: "tilapia",
    nome: "Filé de Tilápia",
    descricao: "Tilápia assada com limão siciliano e azeite extravirgem.",
    preco: "R$ 42/kg",
    imagem: tilapia,
    categoria: "Fit por Quilo",
    tags: ["Low Carb", "Sem Glúten", "Sem Lactose"],
    ingredientes: ["Filé de tilápia", "Limão siciliano", "Azeite extravirgem", "Salsinha", "Alho"],
    calorias: 195, proteina_g: 32, carbo_g: 1, gordura_g: 7,
    proteina: "peixe", porte: "media",
    semGluten: true, semLactose: true, lowCarb: true,
  },
  {
    id: "legumes-vapor",
    nome: "Legumes no Vapor",
    descricao: "Mix de brócolis, cenoura, abobrinha e couve-flor no vapor.",
    preco: "R$ 22/kg",
    imagem: legumesVapor,
    categoria: "Fit por Quilo",
    tags: ["Vegano", "Sem Glúten", "Sem Lactose", "Low Carb"],
    ingredientes: ["Brócolis", "Cenoura", "Abobrinha", "Couve-flor", "Azeite", "Sal"],
    calorias: 95, proteina_g: 4, carbo_g: 14, gordura_g: 3,
    proteina: "vegano", porte: "leve",
    semGluten: true, semLactose: true, lowCarb: true,
  },
  {
    id: "marmita-p",
    nome: "Marmita Fitness P",
    descricao: "Proteína + arroz integral + salada + legumes. 350g.",
    preco: "R$ 18,90",
    imagem: marmitaP,
    categoria: "Marmitas",
    tags: ["Fit", "Sem Lactose"],
    ingredientes: ["Frango grelhado", "Arroz integral", "Salada verde", "Legumes assados"],
    calorias: 420, proteina_g: 32, carbo_g: 48, gordura_g: 10,
    proteina: "frango", porte: "media",
    semGluten: true, semLactose: true, lowCarb: false,
  },
  {
    id: "marmita-g",
    nome: "Marmita Fitness G",
    descricao: "Proteína dupla + arroz + feijão + salada completa. 500g.",
    preco: "R$ 24,90",
    imagem: marmitaG,
    categoria: "Marmitas",
    tags: ["Fit", "Sem Lactose"],
    ingredientes: ["Frango", "Patinho", "Arroz integral", "Feijão preto", "Salada completa", "Legumes"],
    calorias: 680, proteina_g: 52, carbo_g: 72, gordura_g: 16,
    proteina: "carne", porte: "reforcada",
    semGluten: true, semLactose: true, lowCarb: false,
  },
  {
    id: "wrap-integral",
    nome: "Wrap Integral",
    descricao: "Tortilha integral, frango, cream cheese light e rúcula.",
    preco: "R$ 16,90",
    imagem: wrapIntegral,
    categoria: "Marmitas",
    tags: ["Low Carb"],
    ingredientes: ["Tortilha integral", "Frango desfiado", "Cream cheese light", "Rúcula", "Tomate"],
    calorias: 340, proteina_g: 24, carbo_g: 32, gordura_g: 12,
    proteina: "frango", porte: "leve",
    semGluten: false, semLactose: false, lowCarb: true,
  },
  {
    id: "marmita-sem-gluten",
    nome: "Marmita Sem Glúten",
    descricao: "Arroz, proteína e legumes. Sem glúten. Rende 2 porções.",
    preco: "R$ 32,90",
    imagem: marmitaSemGluten,
    categoria: "Congelados",
    tags: ["Sem Glúten", "Fit"],
    ingredientes: ["Arroz branco", "Frango grelhado", "Cenoura", "Brócolis", "Azeite"],
    calorias: 510, proteina_g: 38, carbo_g: 58, gordura_g: 12,
    proteina: "frango", porte: "media",
    semGluten: true, semLactose: false, lowCarb: false,
  },
  {
    id: "marmita-sem-lactose",
    nome: "Marmita Sem Lactose",
    descricao: "Frango, batata doce e brócolis. Sem lactose. 400g.",
    preco: "R$ 29,90",
    imagem: marmitaSemLactose,
    categoria: "Congelados",
    tags: ["Sem Lactose", "Fit"],
    ingredientes: ["Peito de frango", "Batata doce", "Brócolis", "Azeite", "Ervas"],
    calorias: 430, proteina_g: 36, carbo_g: 42, gordura_g: 9,
    proteina: "frango", porte: "media",
    semGluten: true, semLactose: true, lowCarb: false,
  },
  {
    id: "marmita-vegana",
    nome: "Marmita Vegana",
    descricao: "Grão-de-bico, couve refogada e quinoa. 100% vegetal.",
    preco: "R$ 27,90",
    imagem: marmitaVegana,
    categoria: "Congelados",
    tags: ["Vegano", "Sem Lactose"],
    ingredientes: ["Grão-de-bico", "Couve refogada", "Quinoa", "Cenoura", "Azeite", "Cúrcuma"],
    calorias: 460, proteina_g: 18, carbo_g: 62, gordura_g: 14,
    proteina: "vegano", porte: "media",
    semGluten: true, semLactose: true, lowCarb: false,
  },
  {
    id: "suco-detox",
    nome: "Suco Detox Verde",
    descricao: "Couve, maçã, gengibre, limão e hortelã. 300ml.",
    preco: "R$ 9,90",
    imagem: sucoDetox,
    categoria: "Bebidas",
    tags: ["Natural", "Vegano", "Sem Glúten", "Sem Lactose"],
    ingredientes: ["Couve", "Maçã verde", "Gengibre", "Limão", "Hortelã", "Água de coco"],
    calorias: 85, proteina_g: 2, carbo_g: 19, gordura_g: 0,
    proteina: "nenhuma", porte: "leve",
    semGluten: true, semLactose: true, lowCarb: false,
  },
  {
    id: "vitamina-frutas",
    nome: "Vitamina de Frutas",
    descricao: "Banana, mamão, aveia e mel. Sem adição de açúcar.",
    preco: "R$ 11,90",
    imagem: vitaminaFrutas,
    categoria: "Bebidas",
    tags: ["Natural"],
    ingredientes: ["Banana", "Mamão", "Aveia em flocos", "Mel", "Leite desnatado"],
    calorias: 220, proteina_g: 8, carbo_g: 42, gordura_g: 3,
    proteina: "nenhuma", porte: "leve",
    semGluten: false, semLactose: false, lowCarb: false,
  },
];

export const categorias: ("Todos" | Categoria)[] = ["Todos", "Fit por Quilo", "Marmitas", "Congelados", "Bebidas"];
