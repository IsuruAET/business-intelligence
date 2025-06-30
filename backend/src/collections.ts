import { CollectionInfo } from "./queryGenerator";

// Define your MongoDB collections and their schemas
export const collections: CollectionInfo[] = [
  {
    name: "products",
    fields: [
      "_id",
      "name",
      "category",
      "price",
      "description",
      "inStock",
      "brand",
      "tags",
    ],
    sampleDocuments: [
      {
        _id: "1",
        name: "Laptop Pro",
        category: "electronics",
        price: 1299.99,
        description: "High-performance laptop for professionals",
        inStock: true,
        brand: "TechCorp",
        tags: ["laptop", "professional", "high-performance"],
      },
    ],
  },
  {
    name: "orders",
    fields: [
      "_id",
      "customerId",
      "products",
      "totalAmount",
      "status",
      "orderDate",
      "shippingAddress",
    ],
    sampleDocuments: [
      {
        _id: "1",
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
    ],
  },
  {
    name: "customers",
    fields: [
      "_id",
      "name",
      "email",
      "phone",
      "address",
      "joinDate",
      "preferences",
    ],
    sampleDocuments: [
      {
        _id: "cust123",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        address: "123 Main St, City, State",
        joinDate: "2023-01-01",
        preferences: ["electronics", "books"],
      },
    ],
  },
  {
    name: "support_tickets",
    fields: [
      "_id",
      "customerId",
      "subject",
      "description",
      "status",
      "priority",
      "createdAt",
      "assignedTo",
    ],
    sampleDocuments: [
      {
        _id: "ticket1",
        customerId: "cust123",
        subject: "Product return request",
        description: "Need to return laptop purchased last week",
        status: "open",
        priority: "medium",
        createdAt: "2024-01-20",
        assignedTo: "support1",
      },
    ],
  },
];

// You can add more collections as needed
export const getCollections = (): CollectionInfo[] => collections;
