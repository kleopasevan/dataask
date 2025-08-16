import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting seed...")

  // Create roles
  const viewerRole = await prisma.role.upsert({
    where: { name: "VIEWER" },
    update: {},
    create: {
      name: "VIEWER",
      description: "Can view data and dashboards",
    },
  })

  const analystRole = await prisma.role.upsert({
    where: { name: "ANALYST" },
    update: {},
    create: {
      name: "ANALYST",
      description: "Can create queries and dashboards",
    },
  })

  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: {
      name: "ADMIN",
      description: "Full access to workspace",
    },
  })

  // Create demo admin user
  const hashedPassword = await bcrypt.hash(process.env.DEMO_ADMIN_PASSWORD || "admin123", 12)
  const adminUser = await prisma.user.upsert({
    where: { email: process.env.DEMO_ADMIN_EMAIL || "admin@dataask.com" },
    update: {},
    create: {
      email: process.env.DEMO_ADMIN_EMAIL || "admin@dataask.com",
      name: "Demo Admin",
      password: hashedPassword,
      region: "US",
      segment: "enterprise",
    },
  })

  // Create organization and workspace
  const org = await prisma.organization.upsert({
    where: { slug: "demo-org" },
    update: {},
    create: {
      name: "Demo Organization",
      slug: "demo-org",
    },
  })

  const workspace = await prisma.workspace.upsert({
    where: { organizationId_slug: { organizationId: org.id, slug: "demo-workspace" } },
    update: {},
    create: {
      name: "Demo Workspace",
      slug: "demo-workspace",
      organizationId: org.id,
    },
  })

  // Create membership
  await prisma.membership.upsert({
    where: { userId_workspaceId: { userId: adminUser.id, workspaceId: workspace.id } },
    update: {},
    create: {
      userId: adminUser.id,
      workspaceId: workspace.id,
      roleId: adminRole.id,
    },
  })

  // Seed demo data
  console.log("🏪 Creating customers...")
  const regions = ["North America", "Europe", "Asia Pacific", "Latin America"]
  const segments = ["enterprise", "mid-market", "small-business"]

  const customers = []
  for (let i = 0; i < 1000; i++) {
    customers.push({
      email: `customer${i}@example.com`,
      name: `Customer ${i}`,
      region: regions[Math.floor(Math.random() * regions.length)],
      segment: segments[Math.floor(Math.random() * segments.length)],
    })
  }

  await prisma.customer.createMany({
    data: customers,
    skipDuplicates: true,
  })

  console.log("📦 Creating products...")
  const categories = ["Electronics", "Clothing", "Books", "Home & Garden", "Sports"]
  const products = []

  for (let i = 0; i < 100; i++) {
    products.push({
      name: `Product ${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      price: Math.floor(Math.random() * 500) + 10,
      description: `Description for product ${i}`,
    })
  }

  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  })

  console.log("🛒 Creating orders...")
  const allCustomers = await prisma.customer.findMany()
  const allProducts = await prisma.product.findMany()
  const channels = ["Online", "Mobile App", "In-Store", "Phone"]
  const statuses = ["completed", "pending", "cancelled", "refunded"]

  // Create orders over the last year
  const orders = []
  const orderItems = []

  for (let i = 0; i < 10000; i++) {
    const customer = allCustomers[Math.floor(Math.random() * allCustomers.length)]
    const orderDate = new Date()
    orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 365))

    const itemCount = Math.floor(Math.random() * 5) + 1
    let total = 0
    const orderId = `order-${i}`

    for (let j = 0; j < itemCount; j++) {
      const product = allProducts[Math.floor(Math.random() * allProducts.length)]
      const quantity = Math.floor(Math.random() * 3) + 1
      const price = product.price
      total += quantity * price

      orderItems.push({
        id: `item-${i}-${j}`,
        orderId,
        productId: product.id,
        quantity,
        price,
      })
    }

    orders.push({
      id: orderId,
      customerId: customer.id,
      channel: channels[Math.floor(Math.random() * channels.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      total,
      createdAt: orderDate,
      updatedAt: orderDate,
    })
  }

  // Insert in batches to avoid memory issues
  const batchSize = 1000
  for (let i = 0; i < orders.length; i += batchSize) {
    const batch = orders.slice(i, i + batchSize)
    await prisma.order.createMany({
      data: batch,
      skipDuplicates: true,
    })
  }

  for (let i = 0; i < orderItems.length; i += batchSize) {
    const batch = orderItems.slice(i, i + batchSize)
    await prisma.orderItem.createMany({
      data: batch,
      skipDuplicates: true,
    })
  }

  console.log("✅ Seed completed!")
  console.log(`Created:`)
  console.log(`- ${customers.length} customers`)
  console.log(`- ${products.length} products`)
  console.log(`- ${orders.length} orders`)
  console.log(`- ${orderItems.length} order items`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
