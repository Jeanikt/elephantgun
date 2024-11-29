import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const image = formData.get("image") as File;

  // Upload image to Supabase Storage
  const { data: imageData, error: imageError } = await supabase.storage
    .from("product-images")
    .upload(`${Date.now()}-${image.name}`, image);

  if (imageError) {
    return NextResponse.json({ error: imageError.message }, { status: 500 });
  }

  const { data: publicUrlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(imageData.path);

  const image_url = publicUrlData.publicUrl;

  // Insert product data into the database
  const { data, error } = await supabase
    .from("products")
    .insert({ name, description, price, image_url })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ product: data[0] });
}
