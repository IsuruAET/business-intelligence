import { connectToDatabase, getDatabase } from "./database";

const sampleData = {
  products: [
    {
      name: "Laptop Pro",
      category: "electronics",
      price: 1299.99,
      description: "High-performance laptop for professionals",
      inStock: true,
      brand: "TechCorp",
      tags: ["laptop", "professional", "high-performance"],
    },
    {
      name: "Wireless Mouse",
      category: "electronics",
      price: 29.99,
      description: "Ergonomic wireless mouse with precision tracking",
      inStock: true,
      brand: "TechCorp",
      tags: ["mouse", "wireless", "ergonomic"],
    },
    {
      name: "Office Chair",
      category: "furniture",
      price: 199.99,
      description: "Comfortable office chair with lumbar support",
      inStock: false,
      brand: "ComfortCo",
      tags: ["chair", "office", "ergonomic"],
    },
    {
      name: "Gaming Monitor",
      category: "electronics",
      price: 399.99,
      description: "27-inch 4K gaming monitor with 144Hz refresh rate",
      inStock: true,
      brand: "GameTech",
      tags: ["monitor", "gaming", "4k"],
    },
    {
      name: "Desk Lamp",
      category: "furniture",
      price: 49.99,
      description: "LED desk lamp with adjustable brightness",
      inStock: true,
      brand: "LightCo",
      tags: ["lamp", "led", "adjustable"],
    },
    {
      name: "Mechanical Keyboard",
      category: "electronics",
      price: 149.99,
      description: "RGB mechanical keyboard with blue switches",
      inStock: true,
      brand: "KeyTech",
      tags: ["keyboard", "mechanical", "rgb"],
    },
  ],
  customers: [
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      address: "123 Main St, City, State",
      joinDate: "2023-01-01",
      preferences: ["electronics", "books"],
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1234567891",
      address: "456 Oak Ave, City, State",
      joinDate: "2023-02-15",
      preferences: ["furniture", "home-decor"],
    },
    {
      name: "Bob Wilson",
      email: "bob@example.com",
      phone: "+1234567892",
      address: "789 Pine Rd, City, State",
      joinDate: "2023-03-10",
      preferences: ["electronics", "gaming"],
    },
  ],
  orders: [
    {
      customerId: "cust123",
      products: [
        { productId: "prod1", quantity: 1, price: 1299.99 },
        { productId: "prod2", quantity: 2, price: 29.99 },
      ],
      totalAmount: 1359.97,
      status: "completed",
      orderDate: "2024-01-15",
      shippingAddress: "123 Main St, City, State",
    },
    {
      customerId: "cust456",
      products: [{ productId: "prod3", quantity: 1, price: 199.99 }],
      totalAmount: 199.99,
      status: "completed",
      orderDate: "2024-01-20",
      shippingAddress: "456 Oak Ave, City, State",
    },
    {
      customerId: "cust789",
      products: [
        { productId: "prod4", quantity: 1, price: 399.99 },
        { productId: "prod6", quantity: 1, price: 149.99 },
      ],
      totalAmount: 549.98,
      status: "completed",
      orderDate: "2024-01-25",
      shippingAddress: "789 Pine Rd, City, State",
    },
    {
      customerId: "cust123",
      products: [
        { productId: "prod5", quantity: 1, price: 49.99 },
        { productId: "prod2", quantity: 1, price: 29.99 },
      ],
      totalAmount: 79.98,
      status: "completed",
      orderDate: "2024-02-01",
      shippingAddress: "123 Main St, City, State",
    },
    {
      customerId: "cust456",
      products: [
        { productId: "prod3", quantity: 2, price: 199.99 },
        { productId: "prod5", quantity: 1, price: 49.99 },
      ],
      totalAmount: 449.97,
      status: "completed",
      orderDate: "2024-02-05",
      shippingAddress: "456 Oak Ave, City, State",
    },
  ],
  support_tickets: [
    {
      customerId: "cust123",
      subject: "Product return request",
      description: "Need to return laptop purchased last week",
      status: "open",
      priority: "medium",
      createdAt: "2024-01-20",
      assignedTo: "support1",
    },
    {
      customerId: "cust456",
      subject: "Order status inquiry",
      description: "When will my office chair be shipped?",
      status: "in_progress",
      priority: "low",
      createdAt: "2024-01-21",
      assignedTo: "support2",
    },
  ],
};

export const seedDatabase = async (): Promise<void> => {
  try {
    await connectToDatabase();
    const db = getDatabase();

    // Clear existing data
    for (const collectionName of Object.keys(sampleData)) {
      await db.collection(collectionName).deleteMany({});
    }

    // Insert products first and store their ObjectIds
    const productsResult = await db
      .collection("products")
      .insertMany(sampleData.products);
    const productIds = Object.values(productsResult.insertedIds);

    // Create a mapping from product index to ObjectId
    const productIdMap = {
      prod1: productIds[0],
      prod2: productIds[1],
      prod3: productIds[2],
      prod4: productIds[3],
      prod5: productIds[4],
      prod6: productIds[5],
    };

    // Update orders with proper ObjectId references
    const ordersWithObjectIds = sampleData.orders.map((order) => ({
      ...order,
      products: order.products.map((product) => ({
        ...product,
        productId: productIdMap[product.productId as keyof typeof productIdMap],
      })),
    }));

    // Insert other collections
    await db.collection("orders").insertMany(ordersWithObjectIds);
    await db.collection("customers").insertMany(sampleData.customers);
    await db
      .collection("support_tickets")
      .insertMany(sampleData.support_tickets);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("Seeding completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}
