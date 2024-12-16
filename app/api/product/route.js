import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {

  // Replace the uri string with your connection string.
  const uri = "mongodb+srv://mongodb:GXRGI5yEc2GDCtsw@cluster0.p4kgg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri);
  try {
    const database = client.db('stock');
    const inventory = database.collection('inventory');
    const query = {};
    const products = await inventory.find(query).toArray();
    console.log(products);
    return NextResponse.json({ success: true, products })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

}

export async function POST(request) {
  // Replace the uri string with your connection string.
  let body = await request.json()
  const uri = "mongodb+srv://mongodb:GXRGI5yEc2GDCtsw@cluster0.p4kgg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri);
  try {
    const database = client.db('stock');
    const inventory = database.collection('inventory');
    console.log(body)
    const product = await inventory.insertOne(body)
    return NextResponse.json({ product, ok: true })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}