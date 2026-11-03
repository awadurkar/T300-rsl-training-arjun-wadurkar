export type Product = {
  name: string;
  category: string;
  price: string;
  status: "In stock" | "Low stock" | "Out of stock";
  image: string;
  imageAlt: string;
};

export const products: Product[] = [
  {
    name: "Air Runner Sneakers",
    category: "Footwear",
    price: "$89.00",
    status: "In stock",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Red running sneaker",
  },
  {
    name: "Studio Headphones",
    category: "Audio",
    price: "$149.00",
    status: "In stock",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Wireless over-ear headphones",
  },
  {
    name: "Lounge Chair",
    category: "Furniture",
    price: "$329.00",
    status: "Low stock",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Modern lounge chair",
  },
  {
    name: "Everyday Watch",
    category: "Accessories",
    price: "$199.00",
    status: "In stock",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Minimal wristwatch",
  },
  {
    name: "Trail Backpack",
    category: "Outdoors",
    price: "$74.00",
    status: "Low stock",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Outdoor backpack",
  },
  {
    name: "Thermal Bottle",
    category: "Outdoors",
    price: "$32.00",
    status: "Out of stock",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Reusable water bottle",
  },
];
