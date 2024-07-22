const data = [
  {
    "name": "Honey",
    "symbol": "Hn",
    "othernames": "",
    "category": "Raw",
    "cat": 1,
    "sweetnes": 0.97,
    "calories": 304,
    "gi": 58,
    "nutrients": "yes",
    "prebiotic": "yes",
    "metabolic": "yes",
    "tooth": "yes",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Has antioxidants, but may contain pesticides; dangerous for infants"
  },
  {
    "name": "Yacón syrup or powder",
    "symbol": "Yc",
    "othernames": "",
    "category": "Raw",
    "cat": 1,
    "sweetnes": 0.5,
    "calories": 133,
    "gi": 5,
    "nutrients": "small",
    "prebiotic": "yes",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "yes",
    "aftertaste": "no",
    "notes": "High in fiber; daily intake might cause weight loss"
  },
  {
    "name": "Stevia leaf powder",
    "symbol": "St",
    "othernames": "",
    "category": "Raw",
    "cat": 1,
    "sweetnes": 300,
    "calories": 0,
    "gi": 0,
    "nutrients": "no",
    "prebiotic": "yes",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "yes",
    "notes": "Not approved as a food additive, but can be bought as a supplement"
  },
  {
    "name": "Lucuma powder",
    "symbol": "Lu",
    "othernames": "",
    "category": "Raw",
    "cat": 1,
    "sweetnes": 0.5,
    "calories": 329,
    "gi": 25,
    "nutrients": "small",
    "prebiotic": "no",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Anti-inflammatory; sometimes processed with tree nuts/peanuts"
  },
  {
    "name": "Monk fruit",
    "symbol": "Mk",
    "othernames": "Lu han",
    "category": "Raw",
    "cat": 1,
    "sweetnes": 300,
    "calories": 0,
    "gi": 0,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Ancient Chinese sweetener; sometimes \"cut\" with dextrose"
  },
  {
    "name": "Maple syrup",
    "symbol": "Ms",
    "othernames": "",
    "category": "Cooked",
    "cat": 2,
    "sweetnes": 1,
    "calories": 260,
    "gi": 54,
    "nutrients": "small",
    "prebiotic": "no",
    "metabolic": "yes",
    "tooth": "yes",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Mostly sucrose; contains antioxidants, minerals and B vitamins"
  },
  {
    "name": "Sorghum syrup",
    "symbol": "Sg",
    "othernames": "",
    "category": "Cooked",
    "cat": 2,
    "sweetnes": 1.1,
    "calories": 290,
    "gi": 50,
    "nutrients": "small",
    "prebiotic": "no",
    "metabolic": "yes",
    "tooth": "no",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Mostly sucrose; contains antioxidants, minerals and B vitamins"
  },
  {
    "name": "Cane sugar molasses",
    "symbol": "Mo",
    "othernames": "",
    "category": "Cooked",
    "cat": 2,
    "sweetnes": 0.8,
    "calories": 290,
    "gi": 55,
    "nutrients": "small",
    "prebiotic": "no",
    "metabolic": "yes",
    "tooth": "no",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Mostly sucrose; contains antioxidants, minerals and B vitamins"
  },
  {
    "name": "Brown sugar",
    "symbol": "Br",
    "othernames": "Sugar in the raw",
    "category": "Partly Refined",
    "cat": 3,
    "sweetnes": 1,
    "calories": 380,
    "gi": 64,
    "nutrients": "yes",
    "prebiotic": "no",
    "metabolic": "yes",
    "tooth": "yes",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Trace amounts of nutrients; mostly sucrose"
  },
  {
    "name": "Glycyrrhizin",
    "symbol": "Li",
    "othernames": "Licorice",
    "category": "Other Refined",
    "cat": 4,
    "sweetnes": 50,
    "calories": 0,
    "gi": 0,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "yes",
    "notes": "Treats hepatitis in Japan; in excess, might cause high blood pressure"
  },
  {
    "name": "Rebaudioside",
    "symbol": "Re",
    "othernames": "Truvia, SweetLeaf",
    "category": "Other Refined",
    "cat": 4,
    "sweetnes": 480,
    "calories": 0,
    "gi": 0,
    "nutrients": "no",
    "prebiotic": "yes",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "yes",
    "notes": "Not adequately tested, says one group"
  },
  {
    "name": "Sucrose",
    "symbol": "Su",
    "othernames": "Table sugar",
    "category": "Refined Sugar",
    "cat": 5,
    "sweetnes": 1,
    "calories": 387,
    "gi": 65,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "yes",
    "tooth": "yes",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Linked to kidney disease, gout and fatty liver disease"
  },
  {
    "name": "High fructose corn syrup",
    "symbol": "Hf",
    "othernames": "",
    "category": "Refined Sugar",
    "cat": 5,
    "sweetnes": 1.2,
    "calories": 281,
    "gi": 60,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "yes",
    "tooth": "yes",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Stabilizes processed foods; has been linked to mercury contamination"
  },
  {
    "name": "Trehalose",
    "symbol": "Tr",
    "othernames": "",
    "category": "Refined Sugar",
    "cat": 5,
    "sweetnes": 0.45,
    "calories": 400,
    "gi": 70,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "yes",
    "tooth": "yes",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Natural preservative for foods; fuels insect metabolism"
  },
  {
    "name": "Fructose",
    "symbol": "Fr",
    "othernames": "Agave nectar",
    "category": "Refined Sugar",
    "cat": 5,
    "sweetnes": 1.7,
    "calories": 400,
    "gi": 19,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "yes",
    "tooth": "yes",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Boosts appetite; raises triglycerides and bad cholesterol"
  },
  {
    "name": "Inverted sugar",
    "symbol": "In",
    "othernames": "",
    "category": "Refined Sugar",
    "cat": 5,
    "sweetnes": 1.2,
    "calories": 387,
    "gi": 60,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "yes",
    "tooth": "yes",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Sucrose split into glucose and fructose by an acid"
  },
  {
    "name": "Galactose",
    "symbol": "Ga",
    "othernames": "",
    "category": "Refined Sugar",
    "cat": 5,
    "sweetnes": 0.3,
    "calories": 400,
    "gi": 20,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "no",
    "tooth": "yes",
    "heat": "no",
    "laxative": "yes",
    "aftertaste": "no",
    "notes": "Harmful to people unable to digest it"
  },
  {
    "name": "Glucose",
    "symbol": "Gl",
    "othernames": "Corn syrup, Karo syrup",
    "category": "Refined Sugar",
    "cat": 5,
    "sweetnes": 0.7,
    "calories": 400,
    "gi": 100,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "yes",
    "tooth": "yes",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Lowers appetite; quickly raises blood-sugar levels"
  },
  {
    "name": "Maltose",
    "symbol": "Ma",
    "othernames": "Brown rice syrup",
    "category": "Refined Sugar",
    "cat": 5,
    "sweetnes": 0.5,
    "calories": 400,
    "gi": 105,
    "nutrients": "small",
    "prebiotic": "no",
    "metabolic": "no",
    "tooth": "yes",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Syrup arsenic levels often higher than recommended"
  },
  {
    "name": "Lactose",
    "symbol": "Lc",
    "othernames": "Milk sugar",
    "category": "Refined Sugar",
    "cat": 5,
    "sweetnes": 0.2,
    "calories": 400,
    "gi": 46,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "no",
    "tooth": "yes",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Glucose bonded to galactose; some adults cannot digest it"
  },
  {
    "name": "Tagatose",
    "symbol": "Tg",
    "othernames": "Naturlose",
    "category": "Refined Sugar",
    "cat": 5,
    "sweetnes": 0.9,
    "calories": 150,
    "gi": 3,
    "nutrients": "no",
    "prebiotic": "yes",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "yes",
    "aftertaste": "no",
    "notes": "Lowers blood glucose levels in people with elevated blood sugar"
  },
  {
    "name": "Maltitol",
    "symbol": "Ml",
    "othernames": "SweetPearl",
    "category": "Sugar Alcohol",
    "cat": 6,
    "sweetnes": 0.8,
    "calories": 210,
    "gi": 35,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "yes",
    "aftertaste": "no",
    "notes": "Has less of a cooling effect than other sugar alcohols"
  },
  {
    "name": "Lactitol",
    "symbol": "Lt",
    "othernames": "NH4-Redox",
    "category": "Sugar Alcohol",
    "cat": 6,
    "sweetnes": 0.4,
    "calories": 200,
    "gi": 3,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "yes",
    "aftertaste": "no",
    "notes": "Derived from whey"
  },
  {
    "name": "Glycerol",
    "symbol": "Gy",
    "othernames": "Glycerin",
    "category": "Sugar Alcohol",
    "cat": 6,
    "sweetnes": 0.6,
    "calories": 400,
    "gi": 0,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "yes",
    "aftertaste": "no",
    "notes": "Keeps foods moist; high doses cause nausea and dizziness"
  },
  {
    "name": "Xylitol",
    "symbol": "Xy",
    "othernames": "Xylosweet",
    "category": "Sugar Alcohol",
    "cat": 6,
    "sweetnes": 1,
    "calories": 240,
    "gi": 13,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "yes",
    "aftertaste": "no",
    "notes": "Good for teeth; as sweet as sugar"
  },
  {
    "name": "Sorbitol",
    "symbol": "Sb",
    "othernames": "",
    "category": "Sugar Alcohol",
    "cat": 6,
    "sweetnes": 0.6,
    "calories": 260,
    "gi": 9,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "yes",
    "aftertaste": "no",
    "notes": "Prolongs food shelf life; some people allergic; not for irritable bowels"
  },
  {
    "name": "Mannitol",
    "symbol": "Mn",
    "othernames": "",
    "category": "Sugar Alcohol",
    "cat": 6,
    "sweetnes": 0.6,
    "calories": 150,
    "gi": 2,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "yes",
    "aftertaste": "no",
    "notes": "Hard coating for pills; very large doses can damage kidneys, heart"
  },
  {
    "name": "Erythritol",
    "symbol": "Er",
    "othernames": "Zsweet",
    "category": "Sugar Alcohol",
    "cat": 6,
    "sweetnes": 0.7,
    "calories": 0,
    "gi": 1,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Good for teeth; large doses cause nausea"
  },
  {
    "name": "Saccharin",
    "symbol": "Sc",
    "othernames": "Sweet'n Low",
    "category": "Synthetic Sugar",
    "cat": 7,
    "sweetnes": 300,
    "calories": 0,
    "gi": 0,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "yes",
    "tooth": "no",
    "heat": "yes",
    "laxative": "no",
    "aftertaste": "yes",
    "notes": "Once banned for causing bladder cancer in rats"
  },
  {
    "name": "Sucralose",
    "symbol": "Sr",
    "othernames": "Splenda",
    "category": "Synthetic Sugar",
    "cat": 7,
    "sweetnes": 500,
    "calories": 0,
    "gi": 0,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "yes",
    "tooth": "no",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Keeps crystalline form even in high heat; persists in environment"
  },
  {
    "name": "Aspartame",
    "symbol": "As",
    "othernames": "Equal",
    "category": "Synthetic Sugar",
    "cat": 7,
    "sweetnes": 200,
    "calories": 4,
    "gi": 0,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "yes",
    "tooth": "no",
    "heat": "yes",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Generates formaldehyde in the body; can increase waist size"
  },
  {
    "name": "Advantame",
    "symbol": "Ad",
    "othernames": "",
    "category": "Synthetic Sugar",
    "cat": 7,
    "sweetnes": 20000,
    "calories": 0,
    "gi": 0,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Derived from aspartame; effects on brain have not been thoroughly tested"
  },
  {
    "name": "Neotame",
    "symbol": "Ne",
    "othernames": "",
    "category": "Synthetic Sugar",
    "cat": 7,
    "sweetnes": 8000,
    "calories": 0,
    "gi": 0,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "Flawed safety studies,\" says Center for Science in the Public Interest"
  },
  {
    "name": "Acesulfame potassium",
    "symbol": "Ac",
    "othernames": "Sunett",
    "category": "Synthetic Sugar",
    "cat": 7,
    "sweetnes": 200,
    "calories": 0,
    "gi": 0,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "no",
    "aftertaste": "no",
    "notes": "CSPI: \"Safety tests . . . were of mediocre quality."
  },
  {
    "name": "Isomalt",
    "symbol": "Is",
    "othernames": "",
    "category": "Synthetic Sugar Alcohol",
    "cat": 8,
    "sweetnes": 0.6,
    "calories": 200,
    "gi": 9,
    "nutrients": "no",
    "prebiotic": "no",
    "metabolic": "no",
    "tooth": "no",
    "heat": "no",
    "laxative": "yes",
    "aftertaste": "no",
    "notes": "Used to make edible decorations"
  }
]