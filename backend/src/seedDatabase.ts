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
  ],
  orders: [
    {
      customerId: "cust123",
      products: ["1", "2"],
      totalAmount: 1329.98,
      status: "completed",
      orderDate: "2024-01-15",
      shippingAddress: "123 Main St, City, State",
    },
    {
      customerId: "cust456",
      products: ["3"],
      totalAmount: 199.99,
      status: "pending",
      orderDate: "2024-01-20",
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

    // Insert sample data
    for (const [collectionName, documents] of Object.entries(sampleData)) {
      if (Array.isArray(documents) && documents.length > 0) {
        await db.collection(collectionName).insertMany(documents);
        console.log(
          `Inserted ${documents.length} documents into ${collectionName}`
        );
      }
    }

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
